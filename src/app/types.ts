export interface StickyNoteData {
  name: string;
  properties: Property[];
}

export type Property = {
  name: string;
  type: string;
  defaultValue?: string;
};

export interface BulkEventMessage {
  eventNames: string[];
}

export interface StickyDetails {
  type: StickyType,
  id: string,
  data: StickyNoteData
  connectedStickies: ConnectedStickiesInfo
}

export interface ConnectedStickiesInfo{
  event: StickyNoteData[]
  command: StickyNoteData[]
  view: StickyNoteData[]
}

export enum ActionTypes {
  CreateEventStickyNote = 'create-event',
  CreateBulkEvents = 'create-bulk-events',
  CreateCommandStickyNote = 'create-commands',
  StickyNoteSelected = 'sticky-note-selected',
  NothingSelected = 'nothing-selected',
  SectionSelected = 'section-selected',
  CreateViewStickyNote = 'create-view',
  VerifyEventModel = 'verify-event-model',
  UpdateStickyNote = 'update-sticky-note',
}

export enum StickyType {
  Event = 'event',
  Command = 'command',
  View = 'view',
}

