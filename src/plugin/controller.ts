import { ActionTypes } from '../app/types';
import { dispatch, handleEvent } from '../app/methods/codeMessageHandler';
import handleCreateEventStickyNote from '../app/components/eventCreationSlice/createEvent';
import handleCreateCommandStickyNote from '../app/components/commandCreationSlice/commandCreation';
import handleCreateBulkEvents from '../app/components/bulkDataSlice/bulkEvents';
import handleCreateViewStickyNote from '../app/components/createViewSlice/viewCreation';
import { deserializeStickyNoteData } from '../app/methods/serialization-deserialization_StickyNote';
import { determineStickyType } from '../app/methods/stickyHelper';
import handleUpdateStickyNote from '../app/components/stickyDetailsSlice/updateSticky';
import { categorizeAndListConnectedStickies } from '../app/methods/connectorHelpers';

figma.showUI(__html__);

figma.ui.resize(300, 600);


figma.on('selectionchange', handleSelectionChange);
function handleSelectionChange() {
  const selectedNodes = figma.currentPage.selection;
  const allStickies = figma.currentPage.findAll(node => node.type === 'STICKY') as StickyNode[];
  const allConnectors = figma.currentPage.findAll(node => node.type === 'CONNECTOR') as ConnectorNode[];
  if (selectedNodes.length === 1 && selectedNodes[0].type === 'STICKY') {
    const stickyNode = selectedNodes[0];
    const stickyType = determineStickyType(stickyNode);
    const stickyNoteData = deserializeStickyNoteData(stickyNode.text.characters)
    const connectedStickiesInfo = categorizeAndListConnectedStickies(stickyNode, allStickies, allConnectors);
    dispatch(ActionTypes.StickyNoteSelected, { type: stickyType, id: stickyNode.id, data: stickyNoteData, connectedStickies: connectedStickiesInfo})
  } else if (selectedNodes.length === 1 && selectedNodes[0].type === 'SECTION') {
    dispatch(ActionTypes.SectionSelected, selectedNodes[0]);
  } else {
    dispatch(ActionTypes.NothingSelected, { allStickies: allStickies, allConnectors: allConnectors });
  }
  dispatch(ActionTypes.VerifyEventModel, { allStickies: allStickies, allConnectors: allConnectors });
}



handleEvent(ActionTypes.CreateEventStickyNote, handleCreateEventStickyNote);
handleEvent(ActionTypes.CreateCommandStickyNote, handleCreateCommandStickyNote);
handleEvent(ActionTypes.CreateBulkEvents, handleCreateBulkEvents);
handleEvent(ActionTypes.CreateViewStickyNote, handleCreateViewStickyNote);
handleEvent(ActionTypes.UpdateStickyNote, handleUpdateStickyNote);



