import React from 'react';
import { createRoot } from 'react-dom/client';
import EventCreator from './components/EventCreator';
import BulkEventCreator from './components/BulkEventCreator';

document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('react-page');
  const root = createRoot(container);
  root.render(<Main />)
  ;
});

const Main = () => {
  return (
    <div>
      <BulkEventCreator />
      <EventCreator />
    </div>
  );
}
