

const hre = require("hardhat");

async function main() {


  const PandaSwap = await hre.ethers.getContractFactory("PandaSwap");
  const pandaSwap = await PandaSwap.deploy();

  await pandaSwap.deployed();

  console.log(`pandaSwap  deployed to ${pandaSwap.address}`);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



