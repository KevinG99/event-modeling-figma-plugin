import React from 'react';
import { parseProperties } from './utils';

interface EventProperty {
  name: string;
  type: string;
  defaultValue?: string;
}

interface PropertyListProps {
  propertiesText: string;
  setPropertiesText: (text: string) => void;
  properties: EventProperty[];
  setProperties: (properties: EventProperty[]) => void;
}

function PropertyList({ propertiesText, setPropertiesText, properties, setProperties }: PropertyListProps) {

  const removeProperty = (index: number) => {
    const newProperties = parseProperties(propertiesText).filter((_, i) => i !== index);
    const newPropertiesText = newProperties
      .map(({ name, type, defaultValue }) => `${name}: ${type}${defaultValue ? `=${defaultValue}` : ''}`)
      .join('\n');
    setPropertiesText(newPropertiesText);

    // Update the properties state in EventDetails
    setProperties(newProperties);
  };

  return (
    <ul>
      {properties.map((prop, index) => (
        <li key={index}>
          {prop.name}: {prop.type} {prop.defaultValue && `= ${prop.defaultValue} `}
          <button type="button" onClick={() => removeProperty(index)}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};

export default PropertyList;