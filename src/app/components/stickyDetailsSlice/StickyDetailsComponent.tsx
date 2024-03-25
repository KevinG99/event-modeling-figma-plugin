import React, { useEffect, useState } from 'react';
import { deserializeStickyNoteData } from '../../methods/serialization-deserialization_StickyNote';
import { ActionTypes, StickyDetails, StickyNoteData, StickyType } from '../../types';
import StickyNotePreview from '../eventCreationSlice/StickyNotePreview';
import { dispatch } from '../../methods/uiMessageHandler';
import StickyNodeOverview from './StickyConnections';

function StickyDetailsComponent({ type, connectedStickies, data, id }: StickyDetails & { type: StickyType }) {
  const initialStickyNoteData: StickyNoteData = { name: '', properties: [] };
  const [stickyNoteData, setStickyNoteData] = useState(initialStickyNoteData);

  const handleStickyNoteChange = (serializedData: string) => {
    const newData = deserializeStickyNoteData(serializedData);
    setStickyNoteData(newData);
  };

  useEffect(() => {
    setStickyNoteData(data);
  }, []);

  const updateStickyNote = () => {
    dispatch(ActionTypes.UpdateStickyNote, { stickyNoteData: stickyNoteData, id: id, type: type});
  };

  const title =
    type === StickyType.Event
      ? 'Event Details'
      : type === StickyType.Command
        ? 'Command Details'
        : 'View Details';

  return (
    <div>
      <h3>{title}</h3>
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

export default StickyDetailsComponent;