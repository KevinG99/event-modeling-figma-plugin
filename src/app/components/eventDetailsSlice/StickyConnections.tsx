import React from 'react';
import { ConnectedStickiesInfo, StickyNoteData } from '../../types';

function StickyNodeOverview (connectedStickiesInfo: ConnectedStickiesInfo)  {
  const renderStickyNoteData = (stickyNoteData: StickyNoteData[]) => {
    return stickyNoteData.map((data, index) => (
      <div key={index} style={{ marginBottom: '10px' }}>
        <h4>{data.name}</h4>
        <ul>
          {data.properties.map((prop, propIndex) => (
            <li key={propIndex}>{prop.name}: {prop.type} {prop.defaultValue ? `(Default: ${prop.defaultValue})` : ''}</li>
          ))}
        </ul>
      </div>
    ));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
