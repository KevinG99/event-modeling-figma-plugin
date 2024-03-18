import { getOrangeStickies } from '../../methods/helpers';
import { BLUE_COLOR } from '../../../plugin/controller';
import { connectStickyNotes, moveStickyToSection } from '../../methods/sliceAndSections';

export default handleCreateCommandStickyNote;

function convertToCommandName(eventName: string): string {
  return `${eventName}Command`;
}

function handleCreateCommandStickyNote() {
  getOrangeStickies().then((stickies) => {
    stickies.forEach((sticky) => createCommandSection(sticky));
  });
}

export async function createCommandStickyNote(eventName: string) {
  const sticky = figma.createSticky();
  await figma.loadFontAsync(sticky.text.fontName as FontName);
  sticky.fills = [{ type: 'SOLID', color: BLUE_COLOR }];
  sticky.text.fontSize = 16;
  sticky.text.characters = convertToCommandName(eventName);
  return sticky;
}

export async function createCommandSection(eventSticky: SceneNode) {
  if (eventSticky.attachedConnectors.length > 0) {
    console.log('Connectors already exist for this sticky note.');
    return;
  }

  const eventName = (eventSticky as StickyNode).text.characters;
  const commandSticky = await createCommandStickyNote(eventName);
  connectStickyNotes(commandSticky, eventSticky);
  moveStickyToSection(commandSticky, eventSticky.parent as SectionNode);
}