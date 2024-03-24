import React, { useState, useEffect } from 'react';
import { verifyEventModel } from './eventModelVerification';

function VerifyEventModel({ allStickies, allConnectors }) {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Assume verifyEventModel is available and correctly implemented
    const result = verifyEventModel(allStickies, allConnectors);
    setIsVerified(result);
  }, [allStickies, allConnectors]);

  return (
    <div style={{ color: isVerified ? 'green' : 'red' }}>
      {isVerified ? 'Model Verified' : 'Verification Failed'}
    </div>
  );
}

export default VerifyEventModel;
