import React, { useState } from 'react';
import BulkEventCreator from './BulkEventCreator';
import EventCreator from './EventCreator';
import EventDetails from './EventDetails';
import { ActionTypes } from '../types';
import { dispatch } from '../methods/uiMessageHandler';

function App(msg) {
  const [activeComponent, setActiveComponent] = useState(null);
  const renderComponent = () => {
    switch (activeComponent) {
      case 'BulkEventCreator':
        return <BulkEventCreator />;
      case 'EventCreator':
        return <EventCreator />;
      case 'EventDetails':
        return <EventDetails {...msg} />;
      default:
        return <div>Select a component from the menu</div>;
    }
  };
  const onCreateCommands = () => {
    dispatch(ActionTypes.CreateCommandStickyNote)
  };

  return (
    <div>
      <nav>
        <button onClick={() => setActiveComponent('BulkEventCreator')}>
          Bulk Event Creator
        </button>
        <button onClick={() => setActiveComponent('EventCreator')}>
          Event Creator
        </button>
        <button onClick={onCreateCommands}>Create Commands</button>

      </nav>
      {renderComponent()}
    </div>
  );
}

export default App;