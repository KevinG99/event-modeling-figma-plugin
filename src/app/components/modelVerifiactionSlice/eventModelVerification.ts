import { determineStickyType } from '../../methods/stickyHelper';
import { StickyType, StickyNoteData } from '../../types';
import { deserializeStickyNoteData } from '../../methods/serialization-deserialization_StickyNote';

//event must have properties from connected command or if it has default values it's  also okay -> success
//view must have properties from the connected events if it's not existing, then the view or event must have been wrong and the data can't be provided so it's not sucessful.
export function verifyEventModel(allStickies?: StickyNode[], allConnectors?: ConnectorNode[]) {
  // Initial verification status is true, assuming the model is correct until proven otherwise
  let verificationPassed = true;
  if (!allStickies || allStickies.length === 0) return true;
  if (!allConnectors || allConnectors.length === 0) return true;

  // Map all sticky notes by ID for quick access
  const stickiesById = allStickies.reduce((acc, sticky) => {
    acc[sticky.id] = sticky;
    return acc;
  }, {});

  // Map connections from each sticky note to its connected stickies
  const connections = allConnectors.reduce((acc, connector) => {
    const start = connector.connectorStart as ConnectorEndpointEndpointNodeIdAndMagnet
      | ConnectorEndpointPositionAndEndpointNodeId;
    const end = connector.connectorEnd as ConnectorEndpointEndpointNodeIdAndMagnet | ConnectorEndpointPositionAndEndpointNodeId;

    // Check if start and end are not falsy
    if (start && end) {
      const startId = start.endpointNodeId;
      const endId = end.endpointNodeId;
      if (!acc[startId]) acc[startId] = [];
      if (!acc[endId]) acc[endId] = [];
      acc[startId].push(stickiesById[endId]);
      acc[endId].push(stickiesById[startId]);
    }

    return acc;
  }, {});

  // Function to check if a sticky note's properties satisfy the verification conditions
  const checkStickyProperties = (sticky: StickyNode, connectedStickies: StickyNode[]) => {
    const stickyType = determineStickyType(sticky);
    const deserializedData: StickyNoteData = deserializeStickyNoteData(sticky.name);

    if (stickyType === StickyType.Event) {
      // Check if the event sticky has properties from connected commands or has default values
      const hasPropertiesFromConnectedCommands = connectedStickies.some(
        (connectedSticky) => {
          const connectedStickyData: StickyNoteData = deserializeStickyNoteData(connectedSticky.name);
          return (
            determineStickyType(connectedSticky) === StickyType.Command &&
            // Check if the event sticky has properties from the connected command
            deserializedData.properties.some(prop => connectedStickyData.properties.some(connectedProp => connectedProp.name === prop.name))
          );
        }
      );

      const hasDefaultValues = deserializedData.properties.some(prop => prop.defaultValue !== undefined);

      return hasPropertiesFromConnectedCommands || hasDefaultValues;
    } else if (stickyType === StickyType.View) {
      // Check if the view sticky has properties from connected events
      return connectedStickies.some(
        (connectedSticky) => {
          const connectedStickyData: StickyNoteData = deserializeStickyNoteData(connectedSticky.name);
          return (
            determineStickyType(connectedSticky) === StickyType.Event &&
            // Check if the view sticky has properties from the connected event
            deserializedData.properties.every(prop => connectedStickyData.properties.some(connectedProp => connectedProp.name === prop.name))
          );
        }
      );
    }

    // If the sticky type is neither Event nor View, return true by default
    return true;
  };

  // Verify each sticky note based on its connections and types
  Object.entries(connections).forEach(([stickyId, connectedStickies]: [string, StickyNode[]]) => {
    const sticky = stickiesById[stickyId];
    const stickyType = determineStickyType(sticky);

    switch (stickyType) {
      case StickyType.Event:
        // Verify event stickies according to the rules
        if (!checkStickyProperties(sticky, connectedStickies.filter(s => determineStickyType(s) === StickyType.Command))) {
          verificationPassed = false;
        }
        break;
      case StickyType.View:
        // Verify view stickies according to the rules
        if (!checkStickyProperties(sticky, connectedStickies.filter(s => determineStickyType(s) === StickyType.Event))) {
          verificationPassed = false;
        }
        break;
      // Add more cases as necessary for other sticky types
    }
  });

  return verificationPassed;
}