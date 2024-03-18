import { handleEvent } from '../../methods/uiMessageHandler';
import { ActionTypes } from '../../types';

handleEvent(ActionTypes.UpdateEventStickyNote, ({ stickyNode, newContent }) => {
  const stickyName = stickyNode.name;
  const allStickyNodes = figma.currentPage.findAll((node) => node.type === 'STICKY' && node.name === stickyName);

  for (const node of allStickyNodes) {
    let stickyNode = node as StickyNode
    stickyNode.text.characters = newContent;
  }
});
