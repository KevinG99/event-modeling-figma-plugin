import { isCommandStickyNote } from './helpers';

function createSliceName(name: string): string {
  return `slice: ${name}`;
}

export function connectStickyNotes(sticky1: SceneNode, sticky2: SceneNode) {
  const connector = figma.createConnector();
  connector.connectorStart = { endpointNodeId: sticky1.id, magnet: 'AUTO' };
  connector.connectorEnd = { endpointNodeId: sticky2.id, magnet: 'AUTO' };
  connector.strokeWeight = 2;
  return connector;
}


export function moveStickyToSection(sceneNode: SceneNode, section?: SectionNode) {
  if (!section) {
    section = figma.createSection();
    section.resizeWithoutConstraints(sceneNode.width + 100, sceneNode.height + 100); // Starting size, adjust as needed
    console.log(sceneNode.name);
    section.name = createSliceName(sceneNode.name);
    section.x = figma.viewport.center.x
    section.y = figma.viewport.center.y
  }

  const padding = 50; // Space between stickies
  const gridWidth = sceneNode.width + padding;
  const gridHeight = sceneNode.height + padding;

  const isBlue = isCommandStickyNote(sceneNode as StickyNode);

  let nextX = padding;
  let nextY = padding;

  if (isBlue) {
    // Place blue sticky at the top
    // We need to shift other stickies down
    section.children.forEach((child) => {
      child.y += gridHeight;
    });
    // Since we've potentially moved every other sticky down, we need to ensure the section is tall enough
    section.resizeWithoutConstraints(section.width, section.height + gridHeight);
  } else {
    // Find the next grid position for non-blue stickies
    if (section.children.length > 0) {
      const lastChild = section.children[section.children.length - 1];
      nextX = lastChild.x + gridWidth;
      nextY = lastChild.y;

      // Check if we need to move to the next row
      if (nextX + sceneNode.width > section.width) {
        nextX = padding;
        nextY += gridHeight;
      }
    }
  }

  // Check if the section needs to be expanded for non-blue stickies
  const newSectionWidth = Math.max(section.width, nextX + sceneNode.width + padding);
  const newSectionHeight = Math.max(section.height, nextY + sceneNode.height + padding);

  if (!isBlue && (section.width < newSectionWidth || section.height < newSectionHeight)) {
    section.resizeWithoutConstraints(newSectionWidth, newSectionHeight);
  }
  sceneNode.x = nextX;
  sceneNode.y = isBlue ? padding : nextY; // If blue, place at the top with padding

  section.appendChild(sceneNode);
  return section;
}

