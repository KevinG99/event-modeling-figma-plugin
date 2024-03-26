import React, { useState, useEffect } from 'react';
import { serializeStickyNoteData } from '../../methods/serialization-deserialization_StickyNote';
import { STICKY_SEPARATOR } from '../../methods/defaults';

function StickyNotePreview({ name, properties, onSerializedDataChange }) {
  // Assume STICKY_SEPARATOR is defined outside this component
  const [inputValue, setInputValue] = useState('');
  const serializedData = name ? serializeStickyNoteData({ name, properties }) : '';

  useEffect(() => {
    setInputValue(serializedData);
  }, [serializedData]);

  const handleChange = (event) => {
    let value = event.target.value;
    const lines = value.split('\n');
    const lastLine = lines[lines.length - 1];

    // Check if the last character entered is a newline and the last line does not end with the STICKY_SEPARATOR
    if (value.endsWith('\n') && !value.includes(STICKY_SEPARATOR.trim())) {
      // Add STICKY_SEPARATOR to the last line
      lines[lines.length - 1] = lastLine + STICKY_SEPARATOR;
      value = lines
    }

    setInputValue(value);
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
