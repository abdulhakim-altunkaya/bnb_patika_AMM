import React, { useState } from 'react'

function RConnectMet() {
  const { ethereum } = window;
  let[displayStatus, setDisplayStatus] = useState(false);
 
  let [account, setAccount] = useState("");
  const connectMetamask = async () => {
    if(window.ethereum !== "undefined") {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
      setDisplayStatus(true)
    } else {
      alert("install Metamask on your browser");
      return;
    }
  }
 
  const hideDetails = () => {
    setDisplayStatus(false);
  }

  return (
    <>
      <button onClick={connectMetamask} className='button9'>CONNECT METAMASK</button>
      { displayStatus === true ?
        <>
          <div className='contractDetailsDiv'>
              <span>Your Metamask Account:</span>  <br />{account} <br />
              <span>TokenA address:</span> 0xEB3d3b84F5c6D0db85c5e0666056858B283f82f3 <br />
              <span>TokenA symbol:</span>  TOKA <br />
              <span>TokenA cap: </span>  1000000 <br />
              <span>TokenB address:</span> 0xCdD11a615072F4F09b2970c44dDd8b3F5226e695 <br />
              <span>TokenB symbol:</span>  TOBA <br />
              <span>TokenB cap: </span>  1000000 <br />
              <span>Token Standard:</span>  ERC20 <br />
              <span>Token Decimals:</span>  18 <br />
              <span>Network:</span> Binance Smart Chain Testnet <br />
              <span>PandaSwap address:</span> 0xec4B63d19A1f18477952d95a0Dc71F64690fb332 <br />
              <span>Owner address:</span> 0x6EcBD464d3200C08d1bC50027FC32a6Da6694641 <br />   
          </div>
          <button className='hidingButton' onClick={hideDetails}>Hide Details</button>
        </>
      :
        <></>
      }
      
    </>

  )
}

export default RConnectMet