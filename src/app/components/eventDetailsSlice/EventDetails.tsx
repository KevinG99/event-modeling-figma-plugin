import React, { useEffect, useState } from 'react';
import { deserializeStickyNoteData } from '../../methods/serialization-deserialization_StickyNote';
import { StickyDetails, ActionTypes, StickyNoteData } from '../../types';
import StickyNotePreview from '../eventCreationSlice/StickyNotePreview';
import { dispatch } from '../../methods/uiMessageHandler';
import StickyNodeOverview from './StickyConnections';
function EventDetails({ connectedStickies, data, id }: StickyDetails) {
  const initialStickyNoteData: StickyNoteData = {name: '', properties: []};
  const [stickyNoteData, setStickyNoteData] = useState(initialStickyNoteData);

  const handleStickyNoteChange = (serializedData: string) => {
    const newData = deserializeStickyNoteData(serializedData);
    setStickyNoteData(newData);
  };
  useEffect(() => {
    setStickyNoteData(data);
  }, []);

  const updateStickyNote = () => {
    dispatch(ActionTypes.UpdateEventStickyNote, { stickyNoteData: stickyNoteData, id: id });
  };

  return (
    <div>
      <h3>Event Details</h3>
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

export default EventDetails;