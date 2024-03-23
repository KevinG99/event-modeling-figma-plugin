import { isEventSticky } from '../../methods/helpers';

async function handleUpdateEventStickyNote({ oldContent, newContent }) {
  const eventName = oldContent.split('\n---------\n')[0];
  const allStickyNodesWithSameName = figma.currentPage.findAll(
    (node) => node.type === 'STICKY' && node.text.characters.startsWith(eventName) && isEventSticky(node)
  );

  for (const node of allStickyNodesWithSameName) {
    const stickyNode = node as StickyNode;
    await figma.loadFontAsync(stickyNode.text.fontName as FontName);
    stickyNode.text.characters = newContent
  }
}

export default handleUpdateEventStickyNote;