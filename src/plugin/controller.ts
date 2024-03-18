import {
  createCommandSection,
  createEventStickyNote,
  getOrangeStickies,
  isColorMatch,
  moveStickyToSection,
} from '../app/methods/helper';
import {
  EventMessage,
  ActionTypes,
  BulkEventMessage,
  StickyType,
} from '../app/types';
import { dispatch, handleEvent } from '../app/methods/codeMessageHandler';

figma.showUI(__html__);

export const ORANGE_COLOR = { r: 1, g: 0.647, b: 0 };
export const BLUE_COLOR = { r: 0.529, g: 0.808, b: 0.922 };
export const GREEN_COLOR = { r: 0.529, g: 0.922, b: 0.808 };
export const COLOR_TOLERANCE = 0.01;

figma.ui.resize(300, 600);

// Introduce a function to calculate the next available position
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

function handleStickyNoteSelection(stickyNode: StickyNode) {
  let characters = stickyNode.text.characters;
  if (isColorMatch(stickyNode.fills[0].color, ORANGE_COLOR)) {
    figma.ui.postMessage({ type: ActionTypes.StickyNoteSelected, stickyType: StickyType.Event, characters, stickyNode });
  } else if (isColorMatch(stickyNode.fills[0].color, BLUE_COLOR)) {
    figma.ui.postMessage({ type: ActionTypes.StickyNoteSelected, stickyType: StickyType.Command, stickyNode });
  } else if (isColorMatch(stickyNode.fills[0].color, GREEN_COLOR)) {
    figma.ui.postMessage({ type: ActionTypes.StickyNoteSelected, stickyType: StickyType.View, stickyNode });
  }
}

function handleSelectionChange() {
  const nodes = figma.currentPage.selection;
  const allElements = figma.currentPage.children;
  if (nodes.length === 1 && nodes[0].type === 'STICKY') {
    const stickyNode = nodes[0];
    handleStickyNoteSelection(stickyNode);
  } else if (nodes.length === 1 && nodes[0].type === 'SECTION') {
    dispatch(ActionTypes.SectionSelected, nodes[0]);
  } else {
    dispatch(ActionTypes.NothingSelected, { allElements });
  }
}

figma.on('selectionchange', handleSelectionChange);


handleEvent(ActionTypes.CreateEventStickyNote, handleCreateEventStickyNote);
handleEvent(ActionTypes.CreateCommandStickyNote, handleCreateCommandStickyNote);
handleEvent(ActionTypes.CreateBulkEvents, handleCreateBulkEvents);

function handleCreateEventStickyNote(msg: EventMessage) {
  createEventStickyNote(msg).then((sticky) => {
    const sectionNode = moveStickyToSection(sticky);
    figma.viewport.scrollAndZoomIntoView([sectionNode]);
  });
}

function handleCreateCommandStickyNote() {
  getOrangeStickies().then((stickies) => {
    stickies.forEach((sticky) => createCommandSection(sticky));
  });
}

function handleCreateBulkEvents(msg: BulkEventMessage) {
  const existingNodes = [];

  const promises = msg.eventNames.map(eventName =>
    createEventStickyNote({ type: ActionTypes.CreateEventStickyNote, eventName, properties: [] })
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