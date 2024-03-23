import React, { useEffect, useState } from 'react';
import StickyNotePreview from '../eventCreationSlice/StickyNotePreview';
import { ActionTypes, StickyDetails, StickyNoteData } from '../../types';
import { deserializeStickyNoteData } from '../../methods/serialization-deserialization_StickyNote';
import { dispatch } from '../../methods/uiMessageHandler';

function ViewDetails({ characters }: StickyDetails) {
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
      <h3>View Details</h3>
      <StickyNotePreview
        name={stickyNoteData.name}
        properties={stickyNoteData.properties}
        onSerializedDataChange={handleStickyNoteChange}
      />
      <button onClick={updateStickyNote}>Edit</button>
    </div>
  );
}

export default ViewDetails;