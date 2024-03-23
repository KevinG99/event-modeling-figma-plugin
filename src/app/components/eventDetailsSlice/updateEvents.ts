import { isEventSticky } from '../../methods/helpers';
import { StickyNoteData } from '../../types';
import { serializeStickyNoteData } from '../../methods/serialization-deserialization_StickyNote';

async function handleUpdateEventStickyNote({ name, properties }: StickyNoteData) {
  console.log('Updating event sticky note');
  const allStickyNodesWithSameName = figma.currentPage.findAll(
    (node) => node.type === 'STICKY' && node.text.characters.startsWith(name) && isEventSticky(node)
  );

  for (const node of allStickyNodesWithSameName) {
    const stickyNode = node as StickyNode;
    await figma.loadFontAsync(stickyNode.text.fontName as FontName);
    stickyNode.text.characters = serializeStickyNoteData({name, properties})
  }
}

export default handleUpdateEventStickyNote;