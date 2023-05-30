

const hre = require("hardhat");

async function main() {


  const TokenA = await hre.ethers.getContractFactory("TokenA");
  const tokenA = await TokenA.deploy();

  await tokenA.deployed();

  console.log(`tokenA  deployed to ${tokenA.address}`);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



