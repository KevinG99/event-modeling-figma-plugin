import React from 'react';
import { serializeStickyNoteData } from '../../methods/serialization-deserialization_StickyNote';


function StickyNotePreview({ name, properties, onSerializedDataChange }) {
  const serializedData = name ? serializeStickyNoteData({ name, properties }) : '';

  const handleChange = (event) => {
    onSerializedDataChange(event.target.value);
  };

  return (
    <div>
      <h3>Preview</h3>
      <textarea
        readOnly={!onSerializedDataChange}
        value={serializedData}
        onChange={handleChange}
        rows={5}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default StickyNotePreview;
