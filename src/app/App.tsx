import React, { useState } from 'react';
import BulkEventCreator from './components/bulkDataSlice/BulkEventCreator';
import EventCreator from './components/eventCreationSlice/EventCreator';
import EventDetails from './components/eventDetailsSlice/EventDetails';
import CommandCreator from './components/commandCreationSlice/CommandCreator';

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

  return (
    <div>
      <nav>
        <button onClick={() => setActiveComponent('BulkEventCreator')}>
          Bulk Event Creator
        </button>
        <button onClick={() => setActiveComponent('EventCreator')}>
          Event Creator
        </button>
        <CommandCreator />

      </nav>
      {renderComponent()}
    </div>
  );
}

export default App;