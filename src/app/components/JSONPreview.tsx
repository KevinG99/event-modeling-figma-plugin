import React from 'react';

function JSONPreview({ eventName, properties }) {
  return (
    <div>
      <h3>Event Preview</h3>
      <pre>{JSON.stringify({ name: eventName, properties }, null, 2)}</pre>
    </div>
  );
}

export default JSONPreview;
