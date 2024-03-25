import { isViewSticky } from '../../methods/helpers';
import { serializeStickyNoteData } from '../../methods/serialization-deserialization_StickyNote';
import { StickyNoteData } from '../../types';

async function handleUpdateViewStickyNote({stickyNoteData}: {stickyNoteData: StickyNoteData}) {
  console.log('Updating view sticky note');
  const allStickyNodesWithSameName = figma.currentPage.findAll(
    (node) => node.type === 'STICKY' && node.text.characters.startsWith(stickyNoteData.name) && isViewSticky(node)
  );

  for (const node of allStickyNodesWithSameName) {
    const stickyNode = node as StickyNode;
    await figma.loadFontAsync(stickyNode.text.fontName as FontName);
    stickyNode.text.characters = serializeStickyNoteData(stickyNoteData)
  }
}

export default handleUpdateViewStickyNote;