import React from 'react';
import { ConnectedStickiesInfo, StickyNoteData } from '../../types';

function StickyNodeOverview(connectedStickiesInfo: ConnectedStickiesInfo) {
  const renderStickyNoteData = (stickyNoteData: StickyNoteData[]) => {
    return stickyNoteData.map((data, index) => (
      <div key={index} style={{ marginBottom: '5px' }}>
        <ul>
          <li>{data.name}</li>
        </ul>
      </div>
    ));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <section>
        <h3>Events</h3>
        {renderStickyNoteData(connectedStickiesInfo.event)}
      </section>
      <section>
        <h3>Commands</h3>
        {renderStickyNoteData(connectedStickiesInfo.command)}
      </section>
      <section>
        <h3>Views</h3>
        {renderStickyNoteData(connectedStickiesInfo.view)}
      </section>
    </div>
  );
};

export default StickyNodeOverview;
