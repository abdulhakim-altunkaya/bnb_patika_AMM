import React from 'react';
import { useState } from 'react';

function RBalances() {
  let[balance1, setBalance1] = useState("");
  let[balance2, setBalance2] = useState("");
  let[balance3, setBalance3] = useState("");
  let[balance4, setBalance4] = useState("");

  const getBalances = async () => {
    setBalance1("hihi")
  }

  return (
    <div>
      <button onClick={getBalances}>GET BALANCES</button>
      <div>
          <span>User TokenA Balance:</span>  <br />{balance1} <br />
          <span>User TokenB Balance:</span>  <br />{balance2} <br />
          <span>PandaSwap Pool TokenA Balance:</span>  <br />{balance3} <br />
          <span>PandaSwap Pool TokenB Balance:</span>  <br />{balance4} <br />
      </div>
    </div>
  )
}

export default RBalances