const { expect } = require("chai");

describe("PandaSwap", () => {
  let contractPandaSwap;
  let contractTokenA;
  let contractTokenB;
  let owner;

  //I need these address later to send tokens between contract and accounts
  let addressPandaSwap;
  let addressTokenA;
  let addressTokenB;

  beforeEach(async () => {

    //PandaSwap Block
    const PandaSwap = await ethers.getContractFactory("PandaSwap");
    contractPandaSwap = await PandaSwap.deploy();
    await contractPandaSwap.deployed();
    //extra step for some functions
    addressPandaSwap = contractPandaSwap.address;
 
    //TokenA Block
    const TokenA = await ethers.getContractFactory("TokenA");
    contractTokenA = await TokenA.deploy(1000000); // Set the initial supply to 1000000
    await contractTokenA.deployed();

    //extra steps for some test blocks
    addressTokenA = contractTokenA.address;
    await contractTokenA.mintToken(20000);

    //TokenB Block
    const TokenB = await ethers.getContractFactory("TokenB");
    contractTokenB = await TokenB.deploy(1000000);
    await contractTokenB.deployed();

    //extra steps for some test blocks
    addressTokenB = contractTokenB.address;
    await contractTokenB.mintToken(20000);

    //getting owner for some test blocks
    [owner] = await ethers.getSigners();
  });

  it("Should deploy contract and print success message", async () => {
    console.log("Deployment is successful");
  });

  it("Should return the symbol of TokenA as TOKA", async () => {
    const tokenName = await contractTokenA.symbol();
    expect(tokenName).to.equal("TOKA");
  });

  it("Should return the owner of the TokenB", async () => {
    expect(await contractTokenB.owner()).to.equal(owner.address);
  });

  it("Should mint 1000 tokens from TokenA and TokenB and send it to msg.sender aka owner", async () => {
    const tokenBalance1 = await contractTokenA.getYourBalance();
    const tokenBalance2 = await contractTokenB.getYourBalance();
    //as it returns a string, I need to convert values to Number
    expect(Number(tokenBalance1) + Number(tokenBalance2)).to.equal(40000);
  });

  it("Should mint 2000 tokens from TokenA and TokenB and set token addresses on PandaSwap contract", async () => {
    await contractPandaSwap.setTokenAddresses(addressTokenA, addressTokenB);
    let tokenAddress = await contractPandaSwap.tokenA();
    console.log("here is the address of TokenA contract:", tokenAddress);
  });

  it("Should return the balance of owner address in TokenA", async () => {
    await contractPandaSwap.setTokenAddresses(addressTokenA, addressTokenB);
    const tokenABalance = await contractTokenA.balanceOf(owner.address);
    console.log("Owner Balance in TokenA is: ", tokenABalance);
  });

  it("Should add liquidity in PandaSwap contract", async () => {
    await contractPandaSwap.setTokenAddresses(addressTokenA, addressTokenB);
    // Approve the PandaSwap contract to spend the tokens
    await contractTokenA.approve(addressPandaSwap, ethers.utils.parseEther("2"));
    await contractTokenB.approve(addressPandaSwap, ethers.utils.parseEther("2"));
    // Add liquidity
    await contractPandaSwap.addLiquidity(2, 2);
    const tokenABalance = await contractTokenA.balanceOf(addressPandaSwap);
    console.log("PandaSwap contract Balance in TokenA is: ", tokenABalance);
    // Optional: Check that the liquidity was added correctly
  })
  it("Should remove liquidity in PandaSwap contract", async () => {
    await contractPandaSwap.setTokenAddresses(addressTokenA, addressTokenB);
    // Approve the PandaSwap contract to spend the tokens
    await contractTokenA.approve(addressPandaSwap, ethers.utils.parseEther("2"));
    await contractTokenB.approve(addressPandaSwap, ethers.utils.parseEther("2"));
    // Add liquidity
    await contractPandaSwap.addLiquidity(2, 2);
    await contractPandaSwap.removeLiquidityTokenB(1);
    const tokenBBalance = await contractTokenB.balanceOf(addressPandaSwap);
    console.log("PandaSwap contract Balance in TokenB is: ", tokenBBalance);
    // Optional: Check that the liquidity was added correctly
  })

});

