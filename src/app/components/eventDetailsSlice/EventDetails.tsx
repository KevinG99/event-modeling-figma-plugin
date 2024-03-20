import React, { useState, useEffect } from 'react';
import { dispatch } from '../../methods/uiMessageHandler';
import { ActionTypes } from '../../types';
import { STICKY_SEPARATOR } from '../../../plugin/defaults';
import PropertyList from './PropertyList';
import PropertyForm from '../eventCreationSlice/PropertyForm';


function EventDetails({ characters }: { characters: string }): JSX.Element {
  const [eventName, setEventName] = useState('');
  const [propertiesText, setPropertiesText] = useState('');
  const [isExpertMode, setIsExpertMode] = useState(false);
  const [properties, setProperties] = useState([]);

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

  const handleUpdate = () => {
    dispatch(ActionTypes.UpdateEventStickyNote, {
      oldContent: characters,
      newContent: `${eventName}${STICKY_SEPARATOR}${propertiesText}`,
    });
  };

  const addNewProperty = (property) => {
    const { name, type, defaultValue } = property;
    const newProperty = { name, type, defaultValue: defaultValue || undefined };
    setProperties([...properties, newProperty]);

    const newPropertiesText = [...properties, newProperty]
      .map((prop) => {
        const { name, type, defaultValue } = prop;
        return `${name}: ${type}${defaultValue ? `=${defaultValue}` : ''}`;
      })
      .join('\n');

    setPropertiesText(newPropertiesText);
  };

  return (
    <div className="event-edit-panel">
      <div>
        <label htmlFor="eventName">Event Name:</label>
        <input type="text" id="eventName" value={eventName} onChange={handleEventNameChange} />
      </div>
      <div>
        <label htmlFor="isExpertMode">
          <input
            type="checkbox"
            id="isExpertMode"
            checked={isExpertMode}
            onChange={(event) => setIsExpertMode(event.target.checked)}
          />
          Expert Mode
        </label>
      </div>
      {!isExpertMode && (
        <>
          <PropertyList propertiesText={propertiesText} setPropertiesText={setPropertiesText} />
          <PropertyForm addProperty={addNewProperty} />
        </>
      )}
      {isExpertMode && (
        <div>
          <label htmlFor="properties">Properties:</label>
          <textarea id="properties" value={propertiesText} onChange={handlePropertiesChange} rows={5} />
        </div>
      )}
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default EventDetails;