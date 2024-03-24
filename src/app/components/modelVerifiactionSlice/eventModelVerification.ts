import { determineStickyType } from '../../methods/helpers';
import { StickyType } from '../../types';
import { deserializeStickyNoteData } from '../../methods/serialization-deserialization_StickyNote';


//event must have properties from connected command or if it has default values it's  also okay -> success
//view must have properties from the connected events if it's not existing, then the view or event must have been wrong and the data can't be provided so it's not sucessful.
export function verifyEventModel(allStickies: StickyNode[], allConnectors: ConnectorNode[]) {
  // Initial verification status is true, assuming the model is correct until proven otherwise
  let verificationPassed = true;

  // Map all sticky notes by ID for quick access
  const stickiesById = allStickies.reduce((acc, sticky) => {
    acc[sticky.id] = sticky;
    //deserialize the sticky note's properties
    const deserializedData = deserializeStickyNoteData(sticky.name);
    sticky.data = deserializedData;
    sticky.type = determineStickyType(sticky);
    return acc;
  }, {});

  // Map connections from each sticky note to its connected stickies
  const connections = allConnectors.reduce((acc, connector) => {
    const start = connector.connectorStart as ConnectorEndpointEndpointNodeIdAndMagnet
      | ConnectorEndpointPositionAndEndpointNodeId;
    const end = connector.connectorEnd as ConnectorEndpointEndpointNodeIdAndMagnet
    const startId = start.endpointNodeId;
    const endId = end.endpointNodeId;
    if (!acc[startId]) acc[startId] = [];
    if (!acc[endId]) acc[endId] = [];
    acc[startId].push(stickiesById[endId]);
    acc[endId].push(stickiesById[startId]);
    return acc;
  }, {});

  // Function to check if a sticky note's properties satisfy the verification conditions
  const checkStickyProperties = (sticky, connectedStickies) => {
    console.log('Checking sticky properties', JSON.stringify(sticky), JSON.stringify(connectedStickies);
    // Implement the logic based on your application's specific rules and structure
    // This is a placeholder for the verification logic
    return true;
  };

  // Verify each sticky note based on its connections and types
  Object.entries(connections).forEach(([stickyId, connectedStickies]) => {
    const sticky = stickiesById[stickyId];
    const stickyType = determineStickyType(sticky);

    switch (stickyType) {
      case StickyType.Event:
        // Verify event stickies according to the rules
        if (!checkStickyProperties(sticky, connectedStickies.filter(s => determineStickyType(s) === 'command'))) {
          verificationPassed = false;
        }
        break;
      case StickyType.View:
        // Verify view stickies according to the rules
        if (!checkStickyProperties(sticky, connectedStickies.filter(s => determineStickyType(s) === 'event'))) {
          verificationPassed = false;
        }
        break;
      // Add more cases as necessary for other sticky types
    }
  });

  return verificationPassed;
}
