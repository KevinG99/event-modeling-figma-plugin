import { ActionTypes, ConnectedStickiesInfo } from '../app/types';
import { dispatch, handleEvent } from '../app/methods/codeMessageHandler';
import handleUpdateEventStickyNote from '../app/components/eventDetailsSlice/updateEvents';
import handleCreateEventStickyNote from '../app/components/eventCreationSlice/createEvent';
import handleCreateCommandStickyNote from '../app/components/commandCreationSlice/commandCreation';
import handleCreateBulkEvents from '../app/components/bulkDataSlice/bulkEvents';
import handleCreateViewStickyNote from '../app/components/createViewSlice/viewCreation';
import { deserializeStickyNoteData } from '../app/methods/serialization-deserialization_StickyNote';
import { determineStickyType } from '../app/methods/helpers';

figma.showUI(__html__);

figma.ui.resize(300, 600);


figma.on('selectionchange', handleSelectionChange);
function handleSelectionChange() {
  const nodes = figma.currentPage.selection;
  const allStickies = figma.currentPage.findAll(node => node.type === 'STICKY') as StickyNode[];
  const allConnectors = figma.currentPage.findAll(node => node.type === 'CONNECTOR') as ConnectorNode[];
  if (nodes.length === 1 && nodes[0].type === 'STICKY') {
    const stickyNode = nodes[0];
    const stickyType = determineStickyType(stickyNode);
    const stickyNoteData = deserializeStickyNoteData(stickyNode.text.characters)
    const connectedStickiesInfo = categorizeAndListConnectedStickies(stickyNode, allStickies, allConnectors);
    dispatch(ActionTypes.StickyNoteSelected, { type: stickyType, id: stickyNode.id, data: stickyNoteData, connectedStickies: connectedStickiesInfo})
  } else if (nodes.length === 1 && nodes[0].type === 'SECTION') {
    dispatch(ActionTypes.SectionSelected, nodes[0]);
  } else {
    dispatch(ActionTypes.NothingSelected, { allElements: allStickies });
  }
}
function categorizeAndListConnectedStickies(selectedStickyNode: StickyNode, allStickies: StickyNode[], allConnectors: any[]) : ConnectedStickiesInfo {

  const connectedStickiesInfo = {
    event: [],
    command: [],
    view: [],
  };
  // Filter connectors to find those related to the selected sticky note

  const relatedConnectors = allConnectors.filter(connector =>
    connector.connectorStart.endpointNodeId === selectedStickyNode.id ||
    connector.connectorEnd.endpointNodeId === selectedStickyNode.id,
  );
  relatedConnectors.forEach(connector => {
    // Determine the ID of the connected sticky note

    const connectedNodeId = connector.connectorStart.endpointNodeId === selectedStickyNode.id
      ? connector.connectorEnd.endpointNodeId
      : connector.connectorStart.endpointNodeId;
    // Find the connected sticky note
    const connectedSticky = allStickies.find(sticky =>
      sticky.id === connectedNodeId,
    );
    if (connectedSticky) {
      // Categorize the connected sticky note based on its color
      const category = determineStickyType(connectedSticky);
      if (category) {
        // Deserialize the sticky note's properties
        const deserializedData = deserializeStickyNoteData(connectedSticky.name);
        // Add the sticky note's deserialized data to the appropriate category
        connectedStickiesInfo[category].push(deserializedData);
      }
    }

  });
  return connectedStickiesInfo;
}


handleEvent(ActionTypes.CreateEventStickyNote, handleCreateEventStickyNote);
handleEvent(ActionTypes.CreateCommandStickyNote, handleCreateCommandStickyNote);
handleEvent(ActionTypes.CreateBulkEvents, handleCreateBulkEvents);
handleEvent(ActionTypes.UpdateEventStickyNote, handleUpdateEventStickyNote);
handleEvent(ActionTypes.CreateViewStickyNote, handleCreateViewStickyNote);



