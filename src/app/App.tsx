import React, { useState } from 'react';
import BulkEventCreator from './components/bulkDataSlice/BulkEventCreator';
import EventCreator from './components/eventCreationSlice/EventCreator';
import CommandCreator from './components/commandCreationSlice/CommandCreator';
import ViewCreator from './components/createViewSlice/ViewCreator';

function App() {
  const [isBulkCreation, setIsBulkCreation] = useState(false);
  const handleToggle = () => setIsBulkCreation(!isBulkCreation);

  return (
    <div>
      <nav>
        <div>
          <label>
            Bulk Event Creation
            <input
              type="checkbox"
              checked={isBulkCreation}
              onChange={handleToggle}
            />
          </label>
        </div>
        {isBulkCreation ? <BulkEventCreator /> : <EventCreator />}
        <CommandCreator />
        <ViewCreator />

      </nav>
    </div>
  );
}

export default App;