import {
  ActionTypes,
  StickyType,
} from '../app/types';
import { dispatch, handleEvent } from '../app/methods/codeMessageHandler';
import handleCreateEventStickyNote from '../app/components/EventCreationSlice/createEvent';
import handleCreateCommandStickyNote from '../app/components/CommandCreationSlice/commandCreation';
import handleCreateBulkEvents from '../app/components/BulkDataSlice/bulkEvents';

figma.showUI(__html__);

export const ORANGE_COLOR = { r: 1, g: 0.647, b: 0 };
export const BLUE_COLOR = { r: 0.529, g: 0.808, b: 0.922 };
export const GREEN_COLOR = { r: 0.529, g: 0.922, b: 0.808 };
export const COLOR_TOLERANCE = 0.01;

figma.ui.resize(300, 600);

export function isColorMatch(color1: RGB, color2: RGB): boolean {
  return (
    Math.abs(color1.r - color2.r) <= COLOR_TOLERANCE &&
    Math.abs(color1.g - color2.g) <= COLOR_TOLERANCE &&
    Math.abs(color1.b - color2.b) <= COLOR_TOLERANCE
  );
}

function handleStickyNoteSelection(stickyNode: StickyNode) {
  let characters = stickyNode.text.characters;
  if (isColorMatch(stickyNode.fills[0].color, ORANGE_COLOR)) {
    dispatch(ActionTypes.StickyNoteSelected, { stickyType: StickyType.Event, characters, stickyNode })
  } else if (isColorMatch(stickyNode.fills[0].color, BLUE_COLOR)) {
    dispatch(ActionTypes.StickyNoteSelected, { stickyType: StickyType.Command, characters, stickyNode });
  } else if (isColorMatch(stickyNode.fills[0].color, GREEN_COLOR)) {
    dispatch(ActionTypes.StickyNoteSelected, { stickyType: StickyType.View, characters, stickyNode });
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



