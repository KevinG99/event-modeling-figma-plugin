import { ActionTypes, StickyType } from '../app/types';
import { dispatch, handleEvent } from '../app/methods/codeMessageHandler';
import handleUpdateEventStickyNote from '../app/components/eventDetailsSlice/updateEvents';
import handleCreateEventStickyNote from '../app/components/eventCreationSlice/createEvent';
import handleCreateCommandStickyNote from '../app/components/commandCreationSlice/commandCreation';
import handleCreateBulkEvents from '../app/components/bulkDataSlice/bulkEvents';
import { BLUE_COLOR, COLOR_TOLERANCE, GREEN_COLOR, ORANGE_COLOR } from './defaults';
import handleCreateViewStickyNote from '../app/components/createViewSlice/viewCreation';

figma.showUI(__html__);

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
    dispatch(ActionTypes.StickyNoteSelected, { type: StickyType.Event, characters, stickyNode })
  } else if (isColorMatch(stickyNode.fills[0].color, BLUE_COLOR)) {
    dispatch(ActionTypes.StickyNoteSelected, { type: StickyType.Command, characters, stickyNode });
  } else if (isColorMatch(stickyNode.fills[0].color, GREEN_COLOR)) {
    dispatch(ActionTypes.StickyNoteSelected, { type: StickyType.View, characters, stickyNode });
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
handleEvent(ActionTypes.UpdateEventStickyNote, handleUpdateEventStickyNote);
handleEvent(ActionTypes.CreateViewStickyNote, handleCreateViewStickyNote);



