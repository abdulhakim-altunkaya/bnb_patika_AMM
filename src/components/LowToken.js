import React from 'react';
import TokenRead from "./other/TokenRead";
import TokenWrite from "./other/TokenWrite";

function LowToken() {
  return (
    <div className='mainTokenDiv'>
      <TokenRead />
      <TokenWrite />
    </div>
  )
}

export default LowToken