import React, { useState, useEffect } from 'react';
import { serializeStickyNoteData } from '../../methods/serialization-deserialization_StickyNote';

function StickyNotePreview({ name, properties, onSerializedDataChange }) {
  // Manage the raw input as local state
  const [inputValue, setInputValue] = useState('');
  // Use the serialized data for the initial value or updates
  const serializedData = name ? serializeStickyNoteData({ name, properties }) : '';

  useEffect(() => {
    setInputValue(serializedData);
  }, [serializedData]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleBlur = () => {
    // Trigger serialization and update on parent component when the textarea is defocused
    onSerializedDataChange(inputValue);
  };

  return (
    <div>
      <h3>Preview</h3>
      <textarea
        readOnly={!onSerializedDataChange}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        rows={5}
        style={{ width: '100%' }}
      />
    </div>
  );
}

export default StickyNotePreview;
