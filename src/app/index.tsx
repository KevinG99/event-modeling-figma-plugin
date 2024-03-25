import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ActionTypes, StickyDetails, StickyType } from './types';
import EventDetails from './components/eventDetailsSlice/EventDetails';
import CommandDetails from './components/commandDetailsSlice/CommandDetails';
import ViewDetails from './components/viewDetailsSlice/ViewDetails';
import SectionDetails from './components/sectionDetailsSlice/SectionDetails';
import { handleEvent } from './methods/uiMessageHandler';
import VerifyEventModel from './components/modelVerifiactionSlice/VerifyEventModel';


let reactPageRoot;
let allStickies
let allConnectors


document.addEventListener('DOMContentLoaded', function () {
  reactPageRoot = createRoot(document.getElementById('react-page'));
  reactPageRoot.render(
    <>
      <VerifyEventModel allConnectors={allConnectors} allStickies={allStickies}/>
      <App />
    </>,
  );
});

handleEvent(ActionTypes.StickyNoteSelected, (details : StickyDetails) => {
  switch (details.type) {
    case StickyType.Event:
      reactPageRoot.render(<EventDetails {...details} />);
      break;
    case StickyType.Command:
      reactPageRoot.render(<CommandDetails />);
      break;
    case StickyType.View:
      reactPageRoot.render(<ViewDetails {...details}/>);
      break;
  }
});



handleEvent(ActionTypes.NothingSelected, (data) => {
  reactPageRoot.render(
    <>
      <VerifyEventModel allConnectors={data.allConnectors} allStickies={data.allStickies}/>
      <App />
    </>,
  );
});

handleEvent(ActionTypes.SectionSelected, () => {
  reactPageRoot.render(<SectionDetails />);
});