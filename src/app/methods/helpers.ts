import { isColorMatch } from '../../plugin/controller';
import { BLUE_COLOR, ORANGE_COLOR } from '../../plugin/defaults';

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