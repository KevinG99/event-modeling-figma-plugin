import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { ActionTypes, StickyType } from './types';
import EventDetails from './components/EventDetails';
import CommandDetails from './components/CommandDetails';
import ViewDetails from './components/ViewDetails';
import SectionDetails from './components/SectionDetails';
import VerifyEventModel from './components/VerifyEventModel';

document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('react-page');
  const root = createRoot(container);
  window.onmessage = (event) => {
    let msg = event.data.pluginMessage;
    if (msg) {
      if (msg.type === ActionTypes.StickyNoteSelected) {
        if (msg.stickyType === StickyType.Event) {
          root.render(<EventDetails />);
        } else if (msg.stickyType === StickyType.Command) {
          root.render(<CommandDetails />);
        } else if (msg.stickyType === StickyType.View) {
          root.render(<ViewDetails />);
        }
      } else if (msg.type === ActionTypes.NothingSelected) {
        root.render(<App />);
      } else if (msg.type === ActionTypes.SectionSelected) {
        root.render(<SectionDetails />);
      }
      if (msg.type === ActionTypes.VerifyEventModel) {
        console.log('Verifying event model.');
        root.render(<><VerifyEventModel {...msg} /><App /></>);
      }
    }
  };
  root.render(<App />);
});

