import React from 'react';
import { serializeStickyNoteData } from '../../methods/serialization-deserialization_StickyNote';
import { StickyNoteData } from '../../types';


function StickyNotePreview({ name, properties }: StickyNoteData) {
  const serializedData = name ? serializeStickyNoteData({ name, properties }) : '';

  return (
    <div>
      <h3>Preview</h3>
      <textarea
        readOnly
        value={serializedData}
        rows={5}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default StickyNotePreview;
