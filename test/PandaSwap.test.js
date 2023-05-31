const { expect } = require("chai");

describe("PandaSwap", () => {
  
  let pandaswap;

  beforeEach(async () => {
    const PandaSwap = await ethers.getContractFactory("PandaSwap");
    pandaswap = await PandaSwap.deploy();
    await pandaswap.deployed();
  });

  it("Should deploy contract and print success message", async () => {
    console.log("Deployment is successful");
  })

})