import React from 'react';
import { useState } from 'react';
import { useAccount } from '../../Store'; 

function RBalances() {
  const contractPanda = useAccount(state => state.contractPanda2);
  const contractTokenA = useAccount(state => state.contractTokenA2);
  const contractTokenB = useAccount(state => state.contractTokenB2)

  let[balance1, setBalance1] = useState("");
  let[balance2, setBalance2] = useState("");
  let[balance3, setBalance3] = useState("");
  let[balance4, setBalance4] = useState("");

  const getBalances = async () => {
    let bal1 = await contractTokenA.getYourBalance();
    let bal2 = await contractTokenB.getYourBalance();
    let bal3 = await contractPanda.reserveA();
    bal3 = bal3.toString();
    let bal4 = await contractPanda.reserveB();
    bal4 = bal4.toString();
    setBalance1(bal1);
    setBalance2(bal2);
    setBalance3(bal3.slice(0, -18));
    setBalance4(bal4.slice(0, -18));
  }

  return (
    <div>
      <button onClick={getBalances}>GET BALANCES</button>
      <div>
          <span>User TokenA Balance:</span>{balance1} <br />
          <span>User TokenB Balance:</span>{balance2} <br />
          <span>PandaSwap Pool TokenA Balance:</span>  <br />{balance3} <br />
          <span>PandaSwap Pool TokenB Balance:</span>  <br />{balance4} <br />
      </div>
    </div>
  )
}

export default RBalances