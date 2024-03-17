import React, { useState } from 'react';
import PropertyForm from './PropertyForm';
import JSONPreview from './JSONPreview';
import { ActionTypes } from '../types';

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
    parent.postMessage({ pluginMessage: { type: ActionTypes.CreateEventStickyNote, eventName, properties } }, '*');
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
      <JSONPreview eventName={eventName} properties={properties} />
      <button onClick={onCreate}>Create</button>
      <button onClick={clearEverything}>Cancel</button>
    </div>
  );
}

export default EventCreator;
