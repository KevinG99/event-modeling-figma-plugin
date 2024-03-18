import React from 'react';
import { ActionTypes } from '../../types';
import { dispatch } from '../../methods/uiMessageHandler';

const CommandCreator = () => {
  const onCreateCommands = () => {
    dispatch(ActionTypes.CreateCommandStickyNote);
  };

  return (
    <div>
      <h2>Command Creator</h2>
      <button onClick={onCreateCommands}>Create Commands</button>
    </div>
  );
};

export default CommandCreator;