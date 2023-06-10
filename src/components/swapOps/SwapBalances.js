import React from 'react';
import { useState } from 'react';
import { useAccount } from '../../Store';  
import { ethers } from "ethers";

function SwapBalances() {
  let [displayStatus, setDisplayStatus] = useState(false);

  const contractPanda = useAccount(state => state.contractPanda2);

  let[balance2, setBalance2] = useState("");
  let[balance3, setBalance3] = useState("");
  let[balance4, setBalance4] = useState("");

  const getBalances = async () => {
    setDisplayStatus(!displayStatus);
    let bal3 = await contractPanda.getReserves();
    let fee = await contractPanda.feePercentage();
    const reserveAnew = parseInt(ethers.utils.formatUnits(bal3[0], 18));
    const reserveBnew = parseInt(ethers.utils.formatUnits(bal3[1], 18));
    setBalance2(fee.toString());
    setBalance3(reserveAnew);
    setBalance4(reserveBnew);

  }

  return (
    <div>
      <button onClick={getBalances} className='button10'>GET BALANCES</button>
      { displayStatus === true ?
        <>
          <div>
              <span>PandaSwap Pool TokenA Balance: </span>{balance3} <br />
              <span>PandaSwap Pool TokenB Balance: </span>{balance4} <br />
              <span>PandaSwap Pool Fee Percentage: </span>{balance2/10}% <br />
          </div>
        </>
        :
        <></>
      }

    </div>
  )
}

export default SwapBalances