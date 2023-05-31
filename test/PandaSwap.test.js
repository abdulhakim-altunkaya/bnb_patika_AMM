const { expect } = require("chai");

describe("PandaSwap", () => {
  let contractPandaSwap;
  let contractTokenA;
  let contractTokenB;

  beforeEach(async () => {
    const PandaSwap = await ethers.getContractFactory("PandaSwap");
    contractPandaSwap = await PandaSwap.deploy();
    await contractPandaSwap.deployed();

    const TokenA = await ethers.getContractFactory("TokenA");
    contractTokenA = await TokenA.deploy(1000000); // Set the initial supply to 1000000
    await contractTokenA.deployed();

    const TokenB = await ethers.getContractFactory("TokenB");
    contractTokenB = await TokenB.deploy(1000000);
    await contractTokenB.deployed();
  });

  it("Should deploy contract and print success message", async () => {
    console.log("Deployment is successful");
  });

  it("Should return the symbol of TokenA as TOKA", async () => {
    const tokenName = await contractTokenA.symbol();
    expect(tokenName).to.equal("TOKA");
  });
});
