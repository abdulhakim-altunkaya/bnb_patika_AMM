

const hre = require("hardhat");

async function main() {


  const TokenB = await hre.ethers.getContractFactory("TokenB");
  //deploying contract with 1 million tokens
  const tokenB = await TokenB.deploy(10000000);

  await tokenB.deployed();

  console.log(`tokenB  deployed to ${tokenB.address}`);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



