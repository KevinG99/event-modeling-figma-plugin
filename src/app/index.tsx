import React from 'react';
import { createRoot } from 'react-dom/client';
import EventCreator from './components/EventCreator';

document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('react-page');
  const root = createRoot(container);
  root.render(<EventCreator />);
});
