import React, { useState } from 'react';
import BulkEventCreator from './BulkEventCreator';
import EventCreator from './EventCreator';
import EventDetails from './EventDetails';
import { ActionTypes } from '../types';

function App() {
  const [activeComponent, setActiveComponent] = useState(null);
  const renderComponent = () => {
    switch (activeComponent) {
      case 'BulkEventCreator':
        return <BulkEventCreator />;
      case 'EventCreator':
        return <EventCreator />;
      case 'EventDetails':
        return <EventDetails />;
      default:
        return <div>Select a component from the menu</div>;
    }
  };
  const onCreateCommands = () => {
    parent.postMessage({ pluginMessage: { type: ActionTypes.CreateCommandStickyNote } }, '*');
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