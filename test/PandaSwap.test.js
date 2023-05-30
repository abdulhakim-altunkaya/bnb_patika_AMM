const { expect } = require("chai");

describe("PandaSwap", function () {
  let pandaSwap;
  let tokenA;
  let tokenB;
  let owner;
  let client;

  beforeEach(async function () {
    const PandaSwap = await ethers.getContractFactory("PandaSwap");
    pandaSwap = await PandaSwap.deploy();
    await pandaSwap.deployed();

    [owner, client] = await ethers.getSigners();
    const TokenA = await ethers.getContractFactory("TokenA");
    tokenA = await TokenA.deploy();
    await tokenA.deployed();

    const TokenB = await ethers.getContractFactory("TokenB");
    tokenB = await TokenB.deploy();
    await tokenB.deployed();

    await pandaSwap.setTokenAddresses(tokenA.address, tokenB.address);
  });

  it("should add liquidity to the pool", async function () {
    const amountA = ethers.utils.parseEther("100");
    const amountB = ethers.utils.parseEther("200");

    await tokenA.transfer(client.address, amountA);
    await tokenB.transfer(client.address, amountB);

    await tokenA.connect(client).approve(pandaSwap.address, amountA);
    await tokenB.connect(client).approve(pandaSwap.address, amountB);

    await pandaSwap.connect(client).addLiquidity(amountA, amountB);

    const [reserveA, reserveB] = await pandaSwap.getContactBalance();
    expect(reserveA).to.equal(amountA);
    expect(reserveB).to.equal(amountB);
  });

  // Add more simple test cases for other contract functionalities
});
