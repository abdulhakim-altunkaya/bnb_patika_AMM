import React from 'react';
import { useState } from 'react';
import { useAccount } from '../../Store';  
import { ethers } from "ethers";

function RBalances() {
  let [displayStatus, setDisplayStatus] = useState(false);

  const contractPanda = useAccount(state => state.contractPanda2);
  const contractTokenA = useAccount(state => state.contractTokenA2);
  const contractTokenB = useAccount(state => state.contractTokenB2);

  let[balance1, setBalance1] = useState("");
  let[balance2, setBalance2] = useState("");
  let[balance3, setBalance3] = useState("");
  let[balance4, setBalance4] = useState("");

  const getBalances = async () => {
    let bal1 = await contractTokenA.getYourBalance();
    let bal2 = await contractTokenB.getYourBalance();
    let bal3 = await contractPanda.getReserves();
    const reserveAnew = parseInt(ethers.utils.formatUnits(bal3[0], 18));
    const reserveBnew = parseInt(ethers.utils.formatUnits(bal3[1], 18));
    setBalance1(bal1.toNumber());
    setBalance2(bal2.toNumber());
    setBalance3(reserveAnew);
    setBalance4(reserveBnew);
    setDisplayStatus(true);
  }

  const hideDetails = async () => {
    setDisplayStatus(false);
  }

  return (
    <div>
      <button onClick={getBalances} className='button9'>GET BALANCES</button>
      { displayStatus === true ?
        <>
          <div>
              <span>User TokenA Balance: </span>{balance1} <br />
              <span>User TokenB Balance: </span>{balance2} <br />
              <span>PandaSwap Pool TokenA Balance: </span>  <br />{balance3} <br />
              <span>PandaSwap Pool TokenB Balance: </span>  <br />{balance4} <br />
          </div>
          <button onClick={hideDetails} className='hidingButton'>Hide Details</button>
        </>
        :
        <></>
      }

    </div>
  )
}

export default RBalances