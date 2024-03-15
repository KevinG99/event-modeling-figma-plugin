export interface EventMessage {
  type: ActionTypes;
  name: string;
  properties: Array<{ name: string; type: string }>;
}

export interface UIAction {
  type: ActionTypes;
}

export enum ActionTypes {
  CreateEventStickyNote = 'create-event-sticky-note',
  CreateCommandStickyNote = 'create-commands',
}
