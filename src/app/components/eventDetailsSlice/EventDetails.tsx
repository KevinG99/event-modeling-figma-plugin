import React, { useState, useEffect } from 'react';
import { dispatch } from '../../methods/uiMessageHandler';
import { ActionTypes } from '../../types';
import { STICKY_SEPARATOR } from '../../../plugin/defaults';
import PropertyForm from '../eventCreationSlice/PropertyForm';

interface EventProperty {
  name: string;
  type: string;
  defaultValue?: string;
}

function EventDetails({ characters }: { characters: string }): JSX.Element {
  const [eventName, setEventName] = useState('');
  const [propertiesText, setPropertiesText] = useState('');
  const [isExpertMode, setIsExpertMode] = useState(false); // Use state for checkbox
  const [newPropertyName, setNewPropertyName] = useState('');
  const [newPropertyType, setNewPropertyType] = useState('');

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
    dispatch(ActionTypes.UpdateEventStickyNote, {
      oldContent: characters,
      newContent: `${eventName}${STICKY_SEPARATOR}${propertiesText}`,
    });
  };

  const removeProperty = (index: number) => {
    const newProperties = [...parseProperties(propertiesText)];
    newProperties.splice(index, 1);
    setPropertiesText(newProperties.map((prop) => `${prop.name}: ${prop.type}`).join('\n'));
  };


  const addNewProperty = () => {
    if (!newPropertyName || !newPropertyType) return;
    const newProperties = [...parseProperties(propertiesText)];
    newProperties.push({ name: newPropertyName, type: newPropertyType });
    setPropertiesText(newProperties.map((prop) => `${prop.name}: ${prop.type}`).join('\n'));
    setNewPropertyName('');
    setNewPropertyType('');
  };

  return (
    <div className="event-edit-panel">
      <div>
        <label htmlFor="eventName">Event Name:</label>
        <input type="text" id="eventName" value={eventName} onChange={handleEventNameChange} />
      </div>
      <div>
        <label htmlFor="isExpertMode">
          <input type="checkbox" id="isExpertMode" checked={isExpertMode}
                 onChange={(event) => setIsExpertMode(event.target.checked)} />
          Expert Mode
        </label>
      </div>
      {isExpertMode && (
        <div>
          <label htmlFor="properties">Properties:</label>
          <textarea id="properties" value={propertiesText} onChange={handlePropertiesChange} rows={5} />
        </div>
      )}
      {!isExpertMode && (
        <>
          <PropertyForm addProperty={addNewProperty} />
          <ul>
            {parseProperties(propertiesText).map((prop, index) => (
              <li key={index}>
                {prop.name}: {prop.type}
                <button type="button" onClick={() => removeProperty(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </>
      )}
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default EventDetails;
