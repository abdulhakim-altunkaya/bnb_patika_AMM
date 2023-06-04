import React, { useState } from 'react'

function RConnectMet() {
  const { ethereum } = window;
 
  let [account, setAccount] = useState("");
  const connectMetamask = async () => {
    if(window.ethereum !== "undefined") {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } else {
      alert("install Metamask on your browser");
    }
  }

  return (
    <>
      <button onClick={connectMetamask} className='button9'>CONNECT METAMASK</button>
      <div className='contractDetailsDiv'>
          <span>Your Metamask Account:</span>  <br />{account} <br />
          <span>TokenA address:</span> 0x423d6B08eabbd387d9F4b9593745F3A83dcb35fd <br />
          <span>TokenA symbol:</span>  TOKA <br />
          <span>TokenA cap: </span>  1000000 <br />
          <span>TokenB address:</span> 0x7622b5f39116A8208f8C8697e298b3038f87d8e4 <br />
          <span>TokenB symbol:</span>  TOBA <br />
          <span>TokenB cap: </span>  1000000 <br />
          <span>Token Standard:</span>  ERC20 <br />
          <span>Token Decimals:</span>  18 <br />
          <span>Network:</span> Binance Smart Chain Testnet <br />
          <span>PandaSwap address:</span> 0xec4B63d19A1f18477952d95a0Dc71F64690fb332 <br />
          <span>Owner address:</span> 0x6EcBD464d3200C08d1bC50027FC32a6Da6694641 <br />   
      </div>
      <button className='hidingButton'>Hide Details</button>
    </>

  )
}

export default RConnectMet