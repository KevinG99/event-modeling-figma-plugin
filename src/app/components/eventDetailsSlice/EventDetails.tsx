import React, { useState } from 'react';
import { dispatch } from '../../methods/uiMessageHandler';
import { ActionTypes } from '../../types';
import { handleEvent } from '../../methods/codeMessageHandler';

handleEvent(ActionTypes.UpdateEventStickyNote, ({ stickyNode, newContent }) => {
  const stickyName = stickyNode.name;
  const allStickyNodes = figma.currentPage.findAll((node) => node.type === 'STICKY' && node.name === stickyName);

  for (const node of allStickyNodes) {
    let stickyNode = node as StickyNode
    stickyNode.text.characters = newContent;
  }
})

function EventDetails({ characters, stickyNode }) {
  const [content, setContent] = useState(characters);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(ActionTypes.UpdateEventStickyNote, { stickyNode, newContent: content });
  };

  return (
    <div>
      <h2>Event Details</h2>
      <textarea value={content} onChange={handleContentChange} />
      <button onClick={handleSubmit}>Update</button>
    </div>
  );
}


export default EventDetails;