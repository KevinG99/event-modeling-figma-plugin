export interface StickyNoteData {
  name: string;
  properties: Property[];
}

type Property = {
  name: string;
  type: string;
  defaultValue?: string;
};

export interface BulkEventMessage {
  eventNames: string[];
}


export enum ActionTypes {
  CreateEventStickyNote = 'create-event',
  CreateBulkEvents = 'create-bulk-events',
  CreateCommandStickyNote = 'create-commands',
  StickyNoteSelected = 'sticky-note-selected',
  NothingSelected = 'nothing-selected',
  SectionSelected = 'section-selected',
  UpdateEventStickyNote = 'update-event',
  CreateViewStickyNote = 'create-view',
}

export enum StickyType {
  Event = 'event',
  Command = 'command',
  View = 'view',
}

