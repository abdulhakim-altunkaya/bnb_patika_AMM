import React from 'react'
import { useState } from 'react'

function WtokaBurn() {

  let [amount, setAmount] = useState("");

  const burnToken = async () => {
    console.log(amount);
  }

  return (
  <div>
      <button onClick={burnToken} className='button4'>Burn TokenA</button> {amount}
      <input type="number" placeholder='enter amount' className='inputFields'
        value={amount} onChange={ e => setAmount(e.target.value)}/>
    </div>
  )
}

export default WtokaBurn