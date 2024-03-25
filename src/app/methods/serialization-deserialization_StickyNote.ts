import { StickyNoteData } from '../types';
import { STICKY_SEPARATOR } from '../../plugin/defaults';

export function deserializeStickyNoteData(content: string): StickyNoteData {
  let name = '';
  let properties = [];

  // Splitting the content safely
  const splitContent = content.split(STICKY_SEPARATOR.trim());
  if (splitContent.length > 0) {
    name = splitContent[0].trim();
  }

  // Check if properties exist before attempting to process them
  if (splitContent.length > 1) {
    const propertiesString = splitContent[1];
    const propertiesLines = propertiesString.trim().split('\n');
    properties = propertiesLines.map(line => {
      const [left, right] = line.split(':', 2);
      const propName = left.trim();
      let type = '';
      let defaultValue = '';

      // Ensure 'right' is not undefined before proceeding
      if (right !== undefined) {
        const rightParts = right.includes('=') ? right.split('=') : [right];
        type = rightParts[0].trim();
        defaultValue = rightParts.length > 1 ? rightParts[1].trim() : '';
      }

      return {
        name: propName,
        type,
        defaultValue,
      };
    });
  }

  return {
    name,
    properties,
  };
}


export function serializeStickyNoteData(msg: StickyNoteData) {
  let content = msg.name; // Start with just the name, not appending the separator yet.
  let propertiesContent = ''; // Initialize an empty string for properties content.

  // Accumulate properties content.
  msg.properties.forEach((property) => {
    if (property.defaultValue !== '') {
      propertiesContent += `${property.name}: ${property.type} = ${property.defaultValue}\n`;
    } else {
      propertiesContent += `${property.name}: ${property.type}\n`;
    }
  });

  // Conditionally append the separator and properties content if there is any.
  if (propertiesContent) {
    content += `${STICKY_SEPARATOR}${propertiesContent}`;
  }

  return content;
}
