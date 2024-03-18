import React, { useState, useEffect } from 'react';
import { dispatch } from '../../methods/uiMessageHandler'; // Assuming this is for dispatching actions
import { ActionTypes } from '../../types'; // Assuming this holds action types

interface EventProperty {
  name: string;
  type: string;
}


function EventDetails({ characters }: { characters: string }): JSX.Element {
  const [eventName, setEventName] = useState('');
  const [propertiesText, setPropertiesText] = useState('');
  const [editMode, setEditMode] = useState(true); // Edit mode by default

  useEffect(() => {
    const lines = characters.split('\n');
    setEventName(lines[0]);
    setPropertiesText(lines.slice(2).join('\n'));
  }, [characters]);

  const handleEventNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(event.target.value);
  };

  const handlePropertiesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPropertiesText(event.target.value);
  };

  const parseProperties = (text: string): EventProperty[] => {
    return text.split('\n').map((line) => {
      const parts = line.split(': ');
      return { name: parts[0], type: parts[1] };
    });
  };

  const handleUpdate = () => {
    dispatch(ActionTypes.UpdateEventStickyNote, {oldContent: characters,  newContent: `${eventName}\n---------\n${propertiesText}` });
  };

  const removeProperty = (index: number) => {
    const newProperties = [...parseProperties(propertiesText)];
    newProperties.splice(index, 1);
    setPropertiesText(newProperties.map((prop) => `${prop.name}: ${prop.type}`).join('\n'));
  };

  return (
    <div className="event-edit-panel">
      <div>
        <label htmlFor="eventName">Event Name:</label>
        <input type="text" id="eventName" value={eventName} onChange={handleEventNameChange} />
      </div>
      <div>
        <label htmlFor="properties">Properties:</label>
        <textarea id="properties" value={propertiesText} onChange={handlePropertiesChange} rows={5} />
        <button onClick={() => setEditMode(!editMode)}>
          {editMode ? 'Normal Mode' : 'Expert Mode'}
        </button>
      </div>
      {editMode && (
        <div>
          <ul>
            {parseProperties(propertiesText).map((prop, index) => (
              <li key={index}>
                {prop.name}: {prop.type}
                <button onClick={() => removeProperty(index)}>Remove</button>
              </li>
            ))}
          </ul>
          <input type="text" placeholder="Add new property" />
        </div>
      )}
      <button onClick={handleUpdate}>Update Event</button>
    </div>
  );
}

export default EventDetails;
