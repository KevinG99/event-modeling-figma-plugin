import { ConnectedStickiesInfo } from '../types';
import { determineStickyType } from './stickyHelper';
import { deserializeStickyNoteData } from './serialization-deserialization_StickyNote';

export function categorizeAndListConnectedStickies(selectedStickyNode: StickyNode, allStickies: StickyNode[], allConnectors: any[]) : ConnectedStickiesInfo {

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