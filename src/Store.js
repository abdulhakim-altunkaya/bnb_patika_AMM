import { create } from "zustand";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "./ContractAddress";
import { CONTRACT_ABI } from "./ContractABI";


let signer;
let provider;
let contract1;

const connectContract = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract1 = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
}

connectContract();

export const useAccount = create( () => {
  {
    contract: contract1
  }
})





