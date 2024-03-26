import { getOrangeStickies } from '../../methods/stickyHelper';
import { connectStickyNotes, moveStickyToSection } from '../../methods/sliceAndSections';
import { BLUE_COLOR } from '../../methods/defaults';
import {
  deserializeStickyNoteData,
  serializeStickyNoteData,
} from '../../methods/serialization-deserialization_StickyNote';
import { categorizeAndListConnectedStickies } from '../../methods/connectorHelpers';

export default handleCreateCommandStickyNote;

function convertToCommandInput(eventNodeChars: string): string {
  const { name, properties } = deserializeStickyNoteData(eventNodeChars);
  let eventName = name;
  if (eventName.includes('Event')) {
    eventName = eventName.replace('Event', 'Command');
  }
  if (!eventName.includes('event')) {
    eventName = eventName.replace('event', 'Command');
  }
  if (!name.includes('Command')) {
    eventName = `${eventName}Command`;
  }
  const filteredProperties = properties.filter((property) => property.defaultValue !== '' && property.defaultValue !== undefined);
  return serializeStickyNoteData({ name: eventName, properties: filteredProperties });
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
  const allStickies = figma.currentPage.findAll(node => node.type === 'STICKY') as StickyNode[];
  const allConnectors = figma.currentPage.findAll(node => node.type === 'CONNECTOR') as ConnectorNode[];
  const { command } = categorizeAndListConnectedStickies(eventSticky as StickyNode, allStickies, allConnectors);
  if (command.length > 0) {
    console.log('Command sticky note already exists for this event.');
    return;
  }
  const eventNoteChars = (eventSticky as StickyNode).text.characters;
  const commandSticky = await createCommandStickyNote(eventNoteChars);
  connectStickyNotes(commandSticky, eventSticky);
  moveStickyToSection(commandSticky, eventSticky.parent as SectionNode);
}