import React, { useState } from 'react'

function WtokaMint() {

  let [amount, setAmount] = useState("");

  const mintToken = async () => {
    console.log(amount);
  }
  return (
    <div>
      <button onClick={mintToken} className='button4'>Mint TokenA</button> {amount}
      <input type="number" placeholder='Mint between 1-499' className='inputFields'
        value={amount} onChange={ e => setAmount(e.target.value)}/>
    </div>
  )
}

export default WtokaMint