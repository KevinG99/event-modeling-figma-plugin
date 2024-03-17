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
    const msg = event.data.pluginMessage;
    if (msg) {
      renderComponent(msg, root);
      console.log(msg);
    }
  };
  root.render(
    <>
      <VerifyEventModel />
      <App />
    </>,
  );
});


function renderComponent(msg, root) {
  switch (msg.type) {
    case ActionTypes.StickyNoteSelected:
      switch (msg.stickyType) {
        case StickyType.Event:
          root.render(<EventDetails />);
          break;
        case StickyType.Command:
          root.render(<CommandDetails />);
          break;
        case StickyType.View:
          root.render(<ViewDetails />);
          break;
        default:
          break;
      }
      break;
    case ActionTypes.NothingSelected:
      root.render(
        <>
          <VerifyEventModel {...msg} />
          <App />
        </>,
      );
      break;
    case ActionTypes.SectionSelected:
      root.render(<SectionDetails />);
      break;
    default:
      break;
  }
}