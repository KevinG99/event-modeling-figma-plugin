import { determineStickyType } from '../../methods/stickyHelper';
import { serializeStickyNoteData } from '../../methods/serialization-deserialization_StickyNote';
import { StickyNoteData, StickyType } from '../../types';

async function handleUpdateEventStickyNote({ stickyNoteData }: { stickyNoteData: StickyNoteData }) {
  console.log('Updating event sticky note');
  const allStickyNodesWithSameName = figma.currentPage.findAll(
    (node) => node.type === 'STICKY' && node.text.characters.startsWith(stickyNoteData.name) && determineStickyType(node) === StickyType.Event
  );

  for (const node of allStickyNodesWithSameName) {
    const stickyNode = node as StickyNode;
    await figma.loadFontAsync(stickyNode.text.fontName as FontName);
    stickyNode.text.characters = serializeStickyNoteData(stickyNoteData)
  }
}

export default handleUpdateEventStickyNote;