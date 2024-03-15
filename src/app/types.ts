export interface EventMessage {
  type: ActionTypes;
  eventName: string;
  properties: Array<{ name: string; type: string }>;
}

export enum ActionTypes {
  CreateEventStickyNote = 'create-event',
  CreateCommandStickyNote = 'create-commands',
}

export interface UIAction {
  type: ActionTypes;
}
