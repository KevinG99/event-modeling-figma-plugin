import React, { useState } from 'react';
import { dispatch } from '../../methods/uiMessageHandler';
import { ActionTypes } from '../../types';

const BulkEventCreator = () => {
  const [eventText, setEventText] = useState('');

  const handleEventTextChange = (e) => {
    setEventText(e.target.value);
  };

  const publishEvents = () => {
    // Split the eventText by line breaks to get individual events
    const eventNames = eventText.split('\n').filter(Boolean);

    // For each eventName, send a message to the Figma API
    // Here we are not sending properties for simplicity
    // You would modify this to include any other necessary data
    dispatch(ActionTypes.CreateBulkEvents, { eventNames });

    // Clear the textarea after publishing
    setEventText('');
  };

  return (
    <div>
      <h2>Bulk Event Creator</h2>
      <textarea
        value={eventText}
        onChange={handleEventTextChange}
        placeholder="Enter event names, separated by a new line."
        rows={10}
      />
      <button onClick={publishEvents} disabled={!eventText.trim()}>
        Create Events
      </button>
    </div>
  );
};

export default BulkEventCreator;
