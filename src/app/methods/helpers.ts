import { BLUE_COLOR, COLOR_TOLERANCE, GREEN_COLOR, ORANGE_COLOR } from '../../plugin/defaults';
import { StickyType } from '../types';

export async function getOrangeStickies() {
  return figma.root.findAll(
    (node) =>
      node.type === 'STICKY' &&
      Array.isArray(node.fills) &&
      node.fills.length > 0 &&
      isColorMatch((node.fills as SolidPaint[])[0].color, ORANGE_COLOR)
  ) as SceneNode[];
}


export function isCommandStickyNote(sticky: StickyNode): boolean {
  return (
    Array.isArray(sticky.fills) &&
    sticky.fills.length > 0 &&
    isColorMatch((sticky.fills as SolidPaint[])[0].color, BLUE_COLOR)
  );
}

export function isEventSticky(sticky: StickyNode): boolean {
  return (
    Array.isArray(sticky.fills) &&
    sticky.fills.length > 0 &&
    isColorMatch((sticky.fills as SolidPaint[])[0].color, ORANGE_COLOR)
  );
}

export function isViewSticky(sticky: StickyNode): boolean {
  return (
    Array.isArray(sticky.fills) &&
    sticky.fills.length > 0 &&
    isColorMatch((sticky.fills as SolidPaint[])[0].color, GREEN_COLOR)
  );
}

function isColorMatch(color1: RGB, color2: RGB): boolean {
  return (
    Math.abs(color1.r - color2.r) <= COLOR_TOLERANCE &&
    Math.abs(color1.g - color2.g) <= COLOR_TOLERANCE &&
    Math.abs(color1.b - color2.b) <= COLOR_TOLERANCE
  );
}

export function determineStickyType(stickyNode: StickyNode): StickyType {
  if (isColorMatch(stickyNode.fills[0].color, ORANGE_COLOR)) {
    return StickyType.Event
  } else if (isColorMatch(stickyNode.fills[0].color, BLUE_COLOR)) {
    return StickyType.Command
  } else if (isColorMatch(stickyNode.fills[0].color, GREEN_COLOR)) {
    return StickyType.View
  }
}