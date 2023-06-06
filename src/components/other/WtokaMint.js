import React, { useState } from 'react';
import { useAccount } from '../../Store';  


function WtokaMint() {

  const contractTokenA = useAccount(state => state.contractTokenA2);

  let [amount, setAmount] = useState("");
  let [message, setMessage] = useState("");

  const mintToken = async () => {
    let amount1 = parseInt(amount);
    if(amount1 > 499) {
      alert("Please mint between 1-499");
      return;
    } else {
      await contractTokenA.mintToken(amount1);
      setMessage("success, you minted", amount1," tokens");
    }
  }
  return (
    <div>
      <button onClick={mintToken} className='button4'>Mint TokenA</button>
      <input type="number" placeholder='Mint between 1-499' className='inputFields'
         value={amount} onChange={ e => setAmount(e.target.value)}/> {message}
    </div>
  )
}

export default WtokaMint