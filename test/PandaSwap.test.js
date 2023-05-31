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
    const PandaSwap = await ethers.getContractFactory("PandaSwap");
    contractPandaSwap = await PandaSwap.deploy();
    await contractPandaSwap.deployed();
    addressPandaSwap = contractPandaSwap.address;
 

    const TokenA = await ethers.getContractFactory("TokenA");
    contractTokenA = await TokenA.deploy(1000000); // Set the initial supply to 1000000
    await contractTokenA.deployed();
    addressTokenA = contractTokenA.address;
   

    const TokenB = await ethers.getContractFactory("TokenB");
    contractTokenB = await TokenB.deploy(1000000);
    await contractTokenB.deployed();
    addressTokenB = contractTokenB.address;


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
    await contractTokenA.mintToken(1000);
    await contractTokenB.mintToken(1000);
    const tokenBalance1 = await contractTokenA.getYourBalance();
    const tokenBalance2 = await contractTokenB.getYourBalance();
    //as it returns a string, I need to convert values to Number
    expect(Number(tokenBalance1) + Number(tokenBalance2)).to.equal(2000);
  });

  it("Should mint 2000 tokens from TokenA and TokenB and set token addresses on PandaSwap contract", async () => {
    await contractTokenA.mintToken(2000);
    await contractTokenB.mintToken(2000);
    await contractPandaSwap.setTokenAddresses(addressTokenA, addressTokenB);
    let tokenAddress = await contractPandaSwap.tokenA();
    console.log("here it is:", tokenAddress);
  })


});
