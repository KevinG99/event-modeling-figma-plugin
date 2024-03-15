import { EventMessage, ActionTypes, UIAction } from '../app/types';
figma.showUI(__html__);

const ORANGE_COLOR = { r: 1, g: 0.647, b: 0 };
const BLUE_COLOR = { r: 0.529, g: 0.808, b: 0.922 };
const COLOR_TOLERANCE = 0.01;
const CENTER_X = figma.viewport.center.x;

const CENTER_Y = figma.viewport.center.y;

figma.ui.resize(300, 600);

figma.ui.onmessage = async (msg: EventMessage | UIAction) => {
  if (msg.type === ActionTypes.CreateEventStickyNote) {
    await createEventStickyNote(<EventMessage>msg).then((sticky) => moveStickyToSection(sticky));
  } else if (msg.type === ActionTypes.CreateCommandStickyNote) {
    await getOrangeStickies().then((stickies) => {
      stickies.forEach((sticky) => createCommandSection(sticky));
    });
  }
};

function connectStickyNotes(sticky1: SceneNode, sticky2: SceneNode) {
  const connector = figma.createConnector();
  connector.connectorStart = { endpointNodeId: sticky1.id, magnet: 'AUTO' };
  connector.connectorEnd = { endpointNodeId: sticky2.id, magnet: 'AUTO' };
  connector.strokeWeight = 2;
  return connector;
}

async function createCommandStickyNote(eventName: string) {
  const sticky = figma.createSticky();
  await figma.loadFontAsync(sticky.text.fontName as FontName);
  sticky.fills = [{ type: 'SOLID', color: BLUE_COLOR }];
  sticky.text.fontSize = 16;
  sticky.text.characters = convertToCommandName(eventName);
  return sticky;
}

async function createEventStickyNote(msg: EventMessage) {
  console.log(msg);
  const sticky = figma.createSticky();
  await figma.loadFontAsync(sticky.text.fontName as FontName);
  sticky.fills = [{ type: 'SOLID', color: ORANGE_COLOR }];
  sticky.text.fontSize = 16;

  let content = `${msg.eventName}\n---------\n`;
  msg.properties.forEach((property) => {
    content += `${property.name}: ${property.type}\n`;
  });

  sticky.text.characters = content;
  return sticky;
}

function isColorMatch(color1: RGB, color2: RGB): boolean {
  return (
    Math.abs(color1.r - color2.r) <= COLOR_TOLERANCE &&
    Math.abs(color1.g - color2.g) <= COLOR_TOLERANCE &&
    Math.abs(color1.b - color2.b) <= COLOR_TOLERANCE
  );
}

async function createCommandSection(eventSticky: SceneNode) {
  if (eventSticky.attachedConnectors.length > 0) {
    console.log('Connectors already exist for this sticky note.');
    return;
  }

  const eventName = (eventSticky as StickyNode).text.characters;
  const commandSticky = await createCommandStickyNote(eventName);
  connectStickyNotes(commandSticky, eventSticky);
  moveStickyToSection(commandSticky, eventSticky.parent as SectionNode);
}

function moveStickyToSection(sceneNode: SceneNode, section?: SectionNode) {
  if (!section) {
    section = figma.createSection();
    section.resizeWithoutConstraints(sceneNode.width + 100, sceneNode.height + 100); // Starting size, adjust as needed
    section.x = CENTER_X;
    section.y = CENTER_Y;
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
}

async function getOrangeStickies() {
  return figma.root.findAll(
    (node) =>
      node.type === 'STICKY' &&
      Array.isArray(node.fills) &&
      node.fills.length > 0 &&
      isColorMatch((node.fills as SolidPaint[])[0].color, ORANGE_COLOR)
  ) as SceneNode[];
}

function convertToCommandName(eventName: string): string {
  return `${eventName}Command`;
}

function isCommandStickyNote(sticky: StickyNode): boolean {
  return (
    Array.isArray(sticky.fills) &&
    sticky.fills.length > 0 &&
    isColorMatch((sticky.fills as SolidPaint[])[0].color, BLUE_COLOR)
  );
}
