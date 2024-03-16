export interface EventMessage {
  type: ActionTypes;
  eventName: string;
  properties: Array<{ name: string; type: string }>;
}

export interface BulkEventMessage {
  type: ActionTypes;
  eventNames: string[];
}

export enum ActionTypes {
  CreateEventStickyNote = 'create-event',
  CreateBulkEvents = 'create-bulk-events',
  CreateCommandStickyNote = 'create-commands',
}

export interface UIAction {
  type: ActionTypes;
}
