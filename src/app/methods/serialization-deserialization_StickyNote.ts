import { StickyNoteData } from '../types';
import { STICKY_SEPARATOR } from '../../plugin/defaults';

export function deserializeStickyNoteData(content: string): StickyNoteData {
  let name = '';
  let properties = [];

  // Splitting the content safely
  const splitContent = content.split(STICKY_SEPARATOR.replace(/\n/g, ' '))
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



export function serializeStickyNoteData(msg : StickyNoteData) {
  let content = `${msg.name}${STICKY_SEPARATOR}`;
  msg.properties.forEach((property) => {
    if (property.defaultValue !== '') {
      content += `${property.name}: ${property.type} = ${property.defaultValue}\n`;
    } else {
      content += `${property.name}: ${property.type}\n`;
    }
  });
  return content;
}