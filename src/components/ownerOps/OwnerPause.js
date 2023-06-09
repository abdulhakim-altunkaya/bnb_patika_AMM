import React, { useState } from 'react';
import { useAccount } from '../../Store';
import { AddressOwner } from "../addressABI/AddressOwner";

function OwnerPause() {

  const { ethereum } = window;

  const contractPanda = useAccount(state => state.contractPanda2);
  let [message, setMessage] = useState("");

  const pauseSystem = async () => {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    if(accounts[0].toLowerCase() === AddressOwner.toLowerCase()) {
      await contractPanda.pauseEverything();
    } else {
      setMessage("You are not owner");
      return;
    }

  }

  return (
    <div>
        <button onClick={pauseSystem} className='button4'>Pause System</button>&nbsp;&nbsp;{message}
    </div>
  )
}

export default OwnerPause