import React from 'react';

interface EventProperty {
  name: string;
  type: string;
  defaultValue?: string;
}

interface PropertyListProps {
  propertiesText: string;
  setPropertiesText: (text: string) => void;
}

function PropertyList({ propertiesText, setPropertiesText }: PropertyListProps) {
  const parseProperties = (text: string): EventProperty[] => {
    return text.split('\n').map((line) => {
      const parts = line.split(': ');
      return { name: parts[0], type: parts[1] };
    });
  };

  const removeProperty = (index: number) => {
    const newProperties = [...parseProperties(propertiesText)];
    newProperties.splice(index, 1);
    setPropertiesText(newProperties.map((prop) => `${prop.name}: ${prop.type}`).join('\n'));
  };

  return (
    <ul>
      {parseProperties(propertiesText).map((prop, index) => (
        <li key={index}>
          {prop.name}: {prop.type}
          <button type="button" onClick={() => removeProperty(index)}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};

export default PropertyList;