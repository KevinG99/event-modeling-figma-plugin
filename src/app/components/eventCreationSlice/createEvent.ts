import { StickyNoteData } from '../../types';
import { moveStickyToSection } from '../../methods/sliceAndSections';
import { ORANGE_COLOR } from '../../methods/defaults';
import { serializeStickyNoteData } from '../../methods/serialization-deserialization_StickyNote';

export default handleCreateEventStickyNote;

function handleCreateEventStickyNote(msg: StickyNoteData) {
  createEventStickyNote(msg).then((sticky) => {
    const sectionNode = moveStickyToSection(sticky);
    figma.viewport.scrollAndZoomIntoView([sectionNode]);
  });
}

export async function createEventStickyNote(msg: StickyNoteData) {
  const sticky = figma.createSticky();
  await figma.loadFontAsync(sticky.text.fontName as FontName);
  sticky.fills = [{ type: 'SOLID', color: ORANGE_COLOR }];
  sticky.text.fontSize = 16;

  sticky.text.characters = serializeStickyNoteData(msg);
  return sticky;
}