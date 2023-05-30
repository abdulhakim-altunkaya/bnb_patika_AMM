

const hre = require("hardhat");

async function main() {


  const TokenB = await hre.ethers.getContractFactory("TokenB");
  const tokenB = await TokenB.deploy();

  await tokenB.deployed();

  console.log(`tokenB  deployed to ${tokenB.address}`);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



