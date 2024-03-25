import { GREEN_COLOR } from '../../methods/defaults';
import { connectStickyNotes, moveStickyToSection } from '../../methods/sliceAndSections';
import { StickyNoteData } from '../../types';
import { serializeStickyNoteData } from '../../methods/serialization-deserialization_StickyNote';

export default handleCreateViewStickyNote;

function handleCreateViewStickyNote(msg: StickyNoteData) {
  const selectedSceneNodes = figma.currentPage.selection;
  createViewStickyNote(msg).then((sticky) => {
    moveStickyToSection(sticky);
    selectedSceneNodes.forEach((node) => {
      connectStickyNotes(node, sticky);
    });
  });
}

export async function createViewStickyNote(msg : StickyNoteData) {
  const sticky = figma.createSticky();
  await figma.loadFontAsync(sticky.text.fontName as FontName);
  sticky.fills = [{ type: 'SOLID', color: GREEN_COLOR }];
  sticky.text.fontSize = 16;
  sticky.text.characters = serializeStickyNoteData(msg);
  return sticky;
}