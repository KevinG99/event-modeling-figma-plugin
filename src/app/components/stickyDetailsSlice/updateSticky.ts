import { serializeStickyNoteData } from '../../methods/serialization-deserialization_StickyNote';
import { StickyNoteData, StickyType } from '../../types';
import { determineStickyType } from '../../methods/stickyHelper';

async function handleUpdateStickyNote({ stickyNoteData, type }: { stickyNoteData: StickyNoteData, type: StickyType }) {
  console.log(`Updating ${type} sticky note`);
  const allStickyNodesWithSameName = figma.currentPage.findAll(
    (node) => node.type === 'STICKY' && node.text.characters.startsWith(stickyNoteData.name) && determineStickyType(node) === type
  );

  for (const node of allStickyNodesWithSameName) {
    const stickyNode = node as StickyNode;
    await figma.loadFontAsync(stickyNode.text.fontName as FontName);
    stickyNode.text.characters = serializeStickyNoteData(stickyNoteData)
  }
}

export default handleUpdateStickyNote;