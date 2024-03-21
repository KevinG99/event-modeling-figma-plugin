import React from 'react';
import { serializeStickyNoteData } from '../../methods/serialization-deserialization_StickyNote';
import { StickyNoteData } from '../../types';



function StickyNotePreview({name, properties} : StickyNoteData) {
  // Assuming serializeStickyNoteData is a function that takes eventName and properties and returns a string
  const serializedData = serializeStickyNoteData({ name, properties });

  return (
    <div>
      <h3>Preview</h3>
      <textarea
        value={serializedData}
        readOnly
        rows={5}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default StickyNotePreview;
