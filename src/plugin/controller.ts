import { createCommandSection, createEventStickyNote, getOrangeStickies, moveStickyToSection  } from '../app/methods/helper';
import { EventMessage, ActionTypes, UIAction } from '../app/types';
figma.showUI(__html__);

export const ORANGE_COLOR = { r: 1, g: 0.647, b: 0 };
export const BLUE_COLOR = { r: 0.529, g: 0.808, b: 0.922 };
export const COLOR_TOLERANCE = 0.01;
export const CENTER_X = figma.viewport.center.x;

export const CENTER_Y = figma.viewport.center.y;

figma.ui.resize(300, 600);

figma.ui.onmessage = async (msg: EventMessage | UIAction) => {
  if (msg.type === ActionTypes.CreateEventStickyNote) {
    await createEventStickyNote(<EventMessage>msg).then((sticky) => moveStickyToSection(sticky));
  } else if (msg.type === ActionTypes.CreateCommandStickyNote) {
    await getOrangeStickies().then((stickies) => {
      stickies.forEach((sticky) => createCommandSection(sticky));
    });
  }
};


