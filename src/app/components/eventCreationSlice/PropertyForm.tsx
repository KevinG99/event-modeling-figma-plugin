import React, { useState } from 'react';

function PropertyForm({ addProperty }) {
  const [propertyName, setPropertyName] = useState('');
  const [propertyType, setPropertyType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!propertyName || !propertyType) return;
    addProperty({ name: propertyName, type: propertyType });
    setPropertyName('');
    setPropertyType('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Property Name"
        value={propertyName}
        onChange={(e) => setPropertyName(e.target.value)}
      />
      <input type="text" placeholder="Type" value={propertyType} onChange={(e) => setPropertyType(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}

export default PropertyForm;
