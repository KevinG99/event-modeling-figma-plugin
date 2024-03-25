import { isEventSticky } from '../../methods/helpers';
import { serializeStickyNoteData } from '../../methods/serialization-deserialization_StickyNote';
import { StickyNoteData } from '../../types';

async function handleUpdateEventStickyNote({ stickyNoteData }: { stickyNoteData: StickyNoteData }) {
  console.log('Updating event sticky note');
  const allStickyNodesWithSameName = figma.currentPage.findAll(
    (node) => node.type === 'STICKY' && node.text.characters.startsWith(stickyNoteData.name) && isEventSticky(node)
  );

  for (const node of allStickyNodesWithSameName) {
    const stickyNode = node as StickyNode;
    await figma.loadFontAsync(stickyNode.text.fontName as FontName);
    stickyNode.text.characters = serializeStickyNoteData(stickyNoteData)
  }
}

export default handleUpdateEventStickyNote;