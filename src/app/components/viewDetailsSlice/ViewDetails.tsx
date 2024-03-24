import React, { useEffect, useState } from 'react';
import StickyNotePreview from '../eventCreationSlice/StickyNotePreview';
import { ActionTypes, StickyDetails, StickyNoteData } from '../../types';
import { deserializeStickyNoteData } from '../../methods/serialization-deserialization_StickyNote';
import { dispatch } from '../../methods/uiMessageHandler';
import StickyNodeOverview from '../eventDetailsSlice/StickyConnections';

function ViewDetails({data, connectedStickies }: StickyDetails) {
  const initialStickyNoteData: StickyNoteData = {'name': '', 'properties': []};
  const [stickyNoteData, setStickyNoteData] = useState(initialStickyNoteData);

  const handleStickyNoteChange = (serializedData: string) => {
    const newData = deserializeStickyNoteData(serializedData);
    setStickyNoteData(newData);
  };
  useEffect(() => {
    setStickyNoteData(data);
  }, []);

  const updateStickyNote = () => {
    dispatch(ActionTypes.UpdateEventStickyNote, stickyNoteData);
  };

  return (
    <div>
      <h3>View Details</h3>
      <StickyNotePreview
        name={stickyNoteData.name}
        properties={stickyNoteData.properties}
        onSerializedDataChange={handleStickyNoteChange}
      />
      <button onClick={updateStickyNote}>Edit</button>
      <StickyNodeOverview event={connectedStickies.event} command={connectedStickies.command} view={connectedStickies.view} />
    </div>
  );
}

export default ViewDetails;