import React, { useState } from 'react';
import PropertyForm from './PropertyForm';
import { dispatch } from '../../methods/uiMessageHandler';
import { ActionTypes } from '../../types';
import StickyNotePreview from './StickyNotePreview';

function EventCreator() {
  const [eventName, setEventName] = useState('');
  const [properties, setProperties] = useState([]);

  const addProperty = (property) => {
    setProperties([...properties, property]);
  };

  const clearEverything = () => {
    setEventName('');
    setProperties([]);
  };

  const onCreate = () => {
    dispatch(ActionTypes.CreateEventStickyNote, { name: eventName, properties });
    clearEverything();
  };


  return (
    <div>
      <h2>Event Creator</h2>
      <input
        id="event-name"
        type="text"
        placeholder="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <PropertyForm addProperty={addProperty} />
      <StickyNotePreview name={eventName} properties={properties} />
      <button onClick={onCreate}>Create</button>
      <button onClick={clearEverything}>Cancel</button>
    </div>
  );
}

export default EventCreator;
