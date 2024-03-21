import { BulkEventMessage } from '../../types';
import { moveStickyToSection } from '../../methods/sliceAndSections';
import { createEventStickyNote } from '../eventCreationSlice/createEvent';

export default handleCreateBulkEvents
function handleCreateBulkEvents(msg: BulkEventMessage) {
  const existingNodes = [];

  const promises = msg.eventNames.map(eventName =>
    createEventStickyNote({ name: eventName, properties: [] })
      .then(sticky => {
        const nextPos = getNextAvailablePosition(existingNodes);
        const sectionNode = moveStickyToSection(sticky);
        sectionNode.x = nextPos.x;
        existingNodes.push(sectionNode);
      })
  );

  Promise.all(promises).then(() => {
    figma.viewport.scrollAndZoomIntoView(existingNodes);
  });
}

function getNextAvailablePosition(nodes) {
  let maxX = 0;
  let maxY = 0;

  // Find the farthest position (max X and max Y) among existing nodes
  nodes.forEach(node => {
    if (node.x + node.width > maxX) {
      maxX = node.x + node.width;
    }
    if (node.y + node.height > maxY) {
      maxY = node.y + node.height;
    }
  });

  // Return the next position slightly offset from the max found
  return { x: maxX + 10, y: maxY + 10 };
}