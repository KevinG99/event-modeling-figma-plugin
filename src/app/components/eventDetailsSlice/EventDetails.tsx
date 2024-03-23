import React, { useEffect, useState } from 'react';
import { deserializeStickyNoteData } from '../../methods/serialization-deserialization_StickyNote';
import { StickyDetails, ActionTypes, StickyNoteData } from '../../types';
import StickyNotePreview from '../eventCreationSlice/StickyNotePreview';
import { dispatch } from '../../methods/uiMessageHandler';
function EventDetails({ characters }: StickyDetails) {
  const initialStickyNoteData: StickyNoteData = {'name': '', 'properties': []};
  const [stickyNoteData, setStickyNoteData] = useState(initialStickyNoteData);

  const handleStickyNoteChange = (serializedData: string) => {
    const newData = deserializeStickyNoteData(serializedData);
    setStickyNoteData(newData);
  };
  useEffect(() => {
    const data = deserializeStickyNoteData(characters);
    setStickyNoteData(data);
  }, []);

  const updateStickyNote = () => {
    dispatch(ActionTypes.UpdateEventStickyNote, stickyNoteData);
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
    </div>
  );
}

export default EventDetails;