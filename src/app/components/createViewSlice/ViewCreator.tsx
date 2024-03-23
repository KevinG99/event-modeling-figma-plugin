import React, { useState } from 'react';
import { dispatch } from '../../methods/uiMessageHandler';
import { ActionTypes } from '../../types';
import PropertyForm from '../eventCreationSlice/PropertyForm';
import StickyNotePreview from '../eventCreationSlice/StickyNotePreview';

function ViewCreator() {
  const [viewName, setViewName] = useState('');
  const [properties, setProperties] = useState([]);

  const addProperty = (property) => {
    setProperties([...properties, property]);
  };
  const onCreateView = () => {
    dispatch(ActionTypes.CreateViewStickyNote, { name: viewName, properties });
    clearEverything();
  };


  const clearEverything = () => {
    setViewName('');
    setProperties([]);
  };


  return (
    <div>
      <h2>View Creator</h2>
      <input
        id="view-name"
        type="text"
        placeholder="View Name"
        value={viewName}
        onChange={(e) => setViewName(e.target.value)}
      />
      <PropertyForm addProperty={addProperty} defaultValues={false} />
      <StickyNotePreview name={viewName} properties={properties}
                         onSerializedDataChange={undefined}
      />
      <button onClick={onCreateView}>Create</button>
      <button onClick={clearEverything}>Cancel</button>

    </div>
  );
}


export default ViewCreator;