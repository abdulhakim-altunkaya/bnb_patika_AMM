require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.7",
  networks: {
    bnb: {
      url: process.env.PROVIDER_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      chainId: 97,
      gasPrice: 20000000000,
      gasLimit: 5000000,
    }
  }
};
