import { EventMessage } from '../../types';
import { moveStickyToSection } from '../../methods/sliceAndSections';
import { ORANGE_COLOR, STICKY_SEPARATOR } from '../../../plugin/defaults';

export default handleCreateEventStickyNote;

function handleCreateEventStickyNote(msg: EventMessage) {
  createEventStickyNote(msg).then((sticky) => {
    const sectionNode = moveStickyToSection(sticky);
    figma.viewport.scrollAndZoomIntoView([sectionNode]);
  });
}

export async function createEventStickyNote(msg: EventMessage) {
  const sticky = figma.createSticky();
  await figma.loadFontAsync(sticky.text.fontName as FontName);
  sticky.fills = [{ type: 'SOLID', color: ORANGE_COLOR }];
  sticky.text.fontSize = 16;

  let content = `${msg.eventName}${STICKY_SEPARATOR}`;
  msg.properties.forEach((property) => {
    if (property.defaultValue !== '') {
      content += `${property.name}: ${property.type} = ${property.defaultValue}\n`;
    } else {
      content += `${property.name}: ${property.type}\n`;
    }
  });

  sticky.text.characters = content;
  return sticky;
}