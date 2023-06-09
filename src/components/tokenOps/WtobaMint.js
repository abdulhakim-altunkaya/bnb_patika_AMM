import React, { useState } from 'react';
import { useAccount } from '../../Store';  

function WtobaMint() {

  const contractTokenB = useAccount(state => state.contractTokenB2);

  let [amount, setAmount] = useState("");
  let [message, setMessage] = useState("");

  const mintToken = async () => {
    let userBalance = await contractTokenB.getYourBalance();
    let userBalance2 = userBalance.toString();
    let userBalance3 = parseInt(userBalance2);
    if(userBalance3 > 1000) {
      alert("you have more than 1000 TOBA. You cannot mint more");
      return;
    }
    let amount1 = parseInt(amount);
    if(amount1 > 499) {
      alert("Please mint between 1-499");
      return;
    } else {
      await contractTokenB.mintTokenGenerals(amount1);
      setMessage("success, you minted", amount1," tokens");
    } 
  }

  return (
    <div>
        <button onClick={mintToken} className='button4'>Mint TokenB</button>
        <input type="number" placeholder='Mint between 1-499' className='inputFields'
          value={amount} onChange={ e => setAmount(e.target.value)}/> {message}
    </div>
  )
}

export default WtobaMint