import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ActionTypes, StickyDetails} from './types';
import SectionDetails from './components/sectionDetailsSlice/SectionDetails';
import { handleEvent } from './methods/uiMessageHandler';
import VerifyEventModel from './components/modelVerifiactionSlice/VerifyEventModel';
import StickyDetailsComponent from './components/stickyDetailsSlice/StickyDetailsComponent';


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
  reactPageRoot.render(<StickyDetailsComponent type={details.type} {...details} />);
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