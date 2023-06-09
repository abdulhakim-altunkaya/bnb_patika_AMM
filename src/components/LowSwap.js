import React from 'react';
import SwapBalances from "./swapOps/SwapBalances";
import AddLiquidity from "./swapOps/AddLiquidity";
import SwapAwithB from "./swapOps/SwapAwithB";
import SwapBwithA from "./swapOps/SwapBwithA";

function LowSwap() {
  return (
    <div>
      <SwapBalances />
      <AddLiquidity />
      <SwapAwithB />
      <SwapBwithA />
      <p id='aboutText'>Project created for BNB-Patika course by Abdulhakim Altunkaya. 2023</p>
    </div>
  )
}

export default LowSwap