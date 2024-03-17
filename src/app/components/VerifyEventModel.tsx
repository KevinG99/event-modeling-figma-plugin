import React from 'react';

function VerifyEventModel (msg) {
  const x = msg.type
  return (
    <div>
      Verifying event model. {x}
    </div>
  );
}

export default VerifyEventModel;