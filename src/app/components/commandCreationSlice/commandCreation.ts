import { getOrangeStickies } from '../../methods/helpers';
import { connectStickyNotes, moveStickyToSection } from '../../methods/sliceAndSections';
import { BLUE_COLOR, STICKY_SEPARATOR } from '../../../plugin/defaults';

export default handleCreateCommandStickyNote;

function convertToCommandInput(eventNodeChars: string): string {
  const [eventName, properties] = eventNodeChars.split(STICKY_SEPARATOR);
  const propertiesArray = properties.split('\n');
  const filteredProperties = propertiesArray.filter((property) => !property.includes('='));
  return `${eventName}Command${STICKY_SEPARATOR}${filteredProperties.join('\n')}`;
}

function handleCreateCommandStickyNote() {
  getOrangeStickies().then((stickies) => {
    stickies.forEach((sticky) => createCommandSection(sticky));
  });
}

export async function createCommandStickyNote(eventNodeChars: string) {
  const sticky = figma.createSticky();
  await figma.loadFontAsync(sticky.text.fontName as FontName);
  sticky.fills = [{ type: 'SOLID', color: BLUE_COLOR }];
  sticky.text.fontSize = 16;
  sticky.text.characters = convertToCommandInput(eventNodeChars);
  return sticky;
}

export async function createCommandSection(eventSticky: SceneNode) {
  if (eventSticky.attachedConnectors.length > 0) {
    console.log('Connectors already exist for this sticky note.');
    return;
  }

  const eventNoteChars = (eventSticky as StickyNode).text.characters;
  const commandSticky = await createCommandStickyNote(eventNoteChars);
  connectStickyNotes(commandSticky, eventSticky);
  moveStickyToSection(commandSticky, eventSticky.parent as SectionNode);
}