import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import VerifyEventModel from './components/modelVerifiactionSlice/VerifyEventModel';
import { ActionTypes, StickyDetails, StickyType } from './types';
import EventDetails from './components/eventDetailsSlice/EventDetails';
import CommandDetails from './components/commandDetailsSlice/CommandDetails';
import ViewDetails from './components/viewDetailsSlice/ViewDetails';
import SectionDetails from './components/sectionDetailsSlice/SectionDetails';
import { handleEvent } from './methods/uiMessageHandler';


let reactPageRoot;

document.addEventListener('DOMContentLoaded', function () {
  reactPageRoot = createRoot(document.getElementById('react-page'));
  reactPageRoot.render(
    <>
      <VerifyEventModel />
      <App />
    </>,
  );
});

handleEvent(ActionTypes.StickyNoteSelected, (data : StickyDetails) => {
  switch (data.type) {
    case StickyType.Event:
      reactPageRoot.render(<EventDetails {...data} />);
      break;
    case StickyType.Command:
      reactPageRoot.render(<CommandDetails />);
      break;
    case StickyType.View:
      reactPageRoot.render(<ViewDetails />);
      break;
  }
});

handleEvent(ActionTypes.NothingSelected, (data) => {
  reactPageRoot.render(
    <>
      <VerifyEventModel {...data} />
      <App />
    </>,
  );
});

handleEvent(ActionTypes.SectionSelected, () => {
  reactPageRoot.render(<SectionDetails />);
});