export interface EventMessage {
  type: ActionTypes;
  eventName: string;
  properties: Array<{ name: string; type: string }>;
}

export interface BulkEventMessage {
  type: ActionTypes;
  eventNames: string[];
}

export interface StickyDetailsMessage {
  type: ActionTypes;
  stickyType: StickyType;
  id: string;
}

export enum ActionTypes {
  CreateEventStickyNote = 'create-event',
  CreateBulkEvents = 'create-bulk-events',
  CreateCommandStickyNote = 'create-commands',
  StickyNoteSelected = 'sticky-note-selected',
  NothingSelected = 'nothing-selected',
  SectionSelected = 'section-selected',
}

export enum StickyType {
  Event = 'event',
  Command = 'command',
  View = 'view',
}

export interface UIAction {
  type: ActionTypes;
}
