import React from 'react'
import { useState } from 'react';
import { useAccount } from '../../Store';  

function WtobaBurn() {

  const contractTokenB = useAccount(state => state.contractTokenB2);

  let [amount, setAmount] = useState("");
  let [message, setMessage] = useState("");

  const burnToken = async () => {
    let amount1 = parseInt(amount);
    if(amount1 < 1) {
      alert("You need to burn at least 1 token");
      return;
    } else {
      await contractTokenB.burnToken(amount1);
      setMessage("success, you burned", amount1," tokens");
    }
  }

  return (
    <div>
      <button onClick={burnToken} className='button4'>Burn TokenA</button>
      <input type="number" placeholder='enter amount' className='inputFields'
        value={amount} onChange={ e => setAmount(e.target.value)}/> {message}
    </div>
  )
}

export default WtobaBurn