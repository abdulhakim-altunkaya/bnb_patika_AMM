//SPDX-License-Identifier: MIT

pragma solidity >= 0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PandaSwap {
    //events
    event SwapHappened(address tokenIn, uint amountIn, address tokenOut, uint amountOut, address client);
    event PoolIncreased(string message, uint amountA, uint amountB, uint reserveA, uint reserveB);
    event PoolDecreased(string message, uint amountA, uint amountB, uint reserveA, uint reserveB);
    event FeeUpdated(uint newFee);


    //PandaSwap is an Automated Market Maker contract. It manages
    //a pool of TokenA and TokenB. The project is prepared for Patika-BNB Course
    //by Abdulhakim Altunkaya, 2023

    //setting the owner bby using if&revert structure
    address public owner;
    error NotOwner(string message, address caller);
    modifier onlyOwner() {
        if(msg.sender == owner) {
            revert NotOwner("you are not owner", msg.sender);
        }
        _;
    }
    //constructor assigns owner
    constructor() {
        owner = msg.sender;
    }

    //Token addresses and reserves
    address public tokenA;
    address public tokenB;
    uint public reserveA;
    uint public reserveB;

    //I made the token assignment dynamic with no restriction, so that we play with pool
    function setTokenAddresses(address _tokenA, address _tokenB) external onlyOwner {
        require(isERC20Token(_tokenA) == true, "not valid tokenA address");
        require(isERC20Token(_tokenB) == true, "not valid tokenB address");
        tokenA = _tokenA;
        tokenB = _tokenB;
    }
    //We are checking if the addresses belong to ERC20 tokens. They need to return a number
    //from if we call totalSupply() erc20 method on them.
    function isERC20Token(address _tokenAddress) internal view returns(bool) {
        try IERC20(_tokenAddress).totalSupply() returns(uint) {
            return true;
        } catch {
            return false;
        }
    }

    // Fee structure
    uint public feePercentage = 10; // Fee percentage (default 10 means 0.1% fee)
    function updateFeePercentage(uint _fee) external onlyOwner {
        require(_fee < 201, "fee cannot be bigger than %2");
        feePercentage = _fee;
        emit FeeUpdated(feePercentage);
    }

    function addLiquidity(uint _amountA, uint _amountB) external {
        require(amountA > 0 && amountB > 0, "amounts of tokenA and tokenB must be greater than 0");

        //adding decimals
        uint amountA = _amountA * (10**18);
        uint amountB = _amountB * (10**18);
        
        //transfer tokens from sender to the contract(pool)
        IERC20(tokenA).transferFrom(msg.sender, address(this), amountA);
        IERC20(tokenB).transferFrom(msg.sender, address(this), amountB);

        reserveA += amountA;
        reserveB += amountB;

        emit PoolIncreased("PLUS", amountA, amountB, reserveA, reserveB);
    }

    function removeLiquidityTokenA(uint _amountA) external onlyOwner {
        require(_amountA > 0, "removal amount must be bigger than 0");

        //adding decimals
        uint amountA = _amountA * (10**18);

        //we need to withdraw a proportional amount from tokenB also to keep the balance of the pool
        //To do so, we use a basic mathematical proportion.
        uint amountB = (amountA * reserveB) / reserveA;

        //decrease the reserves
        reserveA -= amountA;
        reserveB -= amountB;

        //transfer tokens back to msg.sender
        IERC20(tokenA).transfer(msg.sender, amountA);
        IERC20(tokenB).transfer(msg.sender, amountB);

        emit PoolDecreased("MINUS", amountA, amountB, reserveA, reserveB);
    }

    function removeLiquidityTokenB(uint _amountB) external onlyOwner {
        require(_amountB > 0, "removal amount must be bigger than 0");

        //adding 18 decimals
        uint amountB = _amountB * (10**18);

        //calculate corresponding amount as above
        uint amountA = (amountB * reserveA) / reserveB;

        //decrease the reserves
        reserveA -= amountA;
        reserveB -= amountB;

        //transfer tokens to the msg.sender
        IERC20(tokenA).transfer(msg.sender, amountA);
        IERC20(tokenB).transfer(msg.sender, amountB);

        emit PoolDecreased("MINUS", amountA, amountB, reserveA, reserveB);
    }

    function swapAwithB(uint amountIn, uint amountOutMin) external {
        require(amountIn > 0, "Amount must be greater than 0");

        //adding 18 decimals to the input values:
        uint amountInDecimalsAdded = amountIn * (10**18);
        uint amountOutMinDecimalsAdded = amountOutMin * (10**18);

        // we calculate the amountout. The balance of value between tokens
        // is dynamic thanks to this calculation below.
        uint amountOut = (amountInDecimalsAdded * reserveB) / reserveA;

        //calculating fee on mathematical proportion
        // if fee is 10, it means we will charge %0.1 per tx on amountOut
        uint txFee = amountOut / (feePercentage * 100);
        //deducting fee from amountOut
        amountOut -= txFee;

        // amountOut must be greater than or equal to the minimum specified
        // This line of code is for security of users against slippage and manipulation
        require(amountOut >= amountOutMinDecimalsAdded, "actual output is smaller than the desired output");

        // Transfer tokenIn from the sender to the contract
        IERC20(tokenA).transferFrom(msg.sender, address(this), amountInDecimalsAdded);

        // Transfer tokenOut from the contract to the sender
        IERC20(tokenB).transfer(msg.sender, amountOut);

        // Updating reserves
        reserveA += amountInDecimalsAdded;
        reserveB -= amountOut;

        emit SwapHappened(tokenA, amountInDecimalsAdded, tokenB, amountOut, msg.sender);
    }

    function swapBwithA(uint amountIn, uint amountOutMin) external {
        require(amountIn > 0, "Amount must be greater than 0");

        //adding 18 decimals to the input values:
        uint amountInDecimalsAdded = amountIn * (10**18);
        uint amountOutMinDecimalsAdded = amountOutMin * (10**18);

        //we calculate the amountOut as above.
        uint amountOut = (amountInDecimalsAdded * reserveA) / reserveB;

        //calculating fee as above
        uint txFee = amountOut / (feePercentage * 100);
        //deducting fee from amountOut
        amountOut -= txFee;

        //amountOut is specified as above function
        require(amountOut >= amountOutMinDecimalsAdded, "actual output is smaller than the desired output");

        //Transfer tokenIn from sender to the contract
        IERC20(tokenB).transferFrom(msg.sender, address(this), amountInDecimalsAdded);

        //Transfer tokenOut from contract to the sender
        IERC20(tokenA).transfer(msg.sender, amountOut);

        // update reserves
        reserveB += amountInDecimalsAdded;
        reserveA -= amountOut;

        emit SwapHappened(tokenB, amountInDecimalsAdded, tokenA, amountOut, msg.sender);
    }

    //As this an AMM of TokenA and TokenB, I dont need to use parameter area to assign
    //any dynamic token address
    function withdrawLeftoverTokens() external onlyOwner {

        //calculating the general amounts (reserve + leftover)
        uint amountTokenA = IERC20(tokenA).balanceOf(address(this));
        uint amountTokenB = IERC20(tokenB).balanceOf(address(this));

        //calculating leftovers 
        uint leftoverTokenA = amountTokenA - reserveA;
        uint leftoverTokenB = amountTokenB - reserveB;

        //leftovers must be above 1 token to make tx meaningful
        require(leftoverTokenA > 1*(10**18) || leftoverTokenB > 1*(10**18), "leftover token must be bigger than 1");

        //Transfer leftovers from contract to the sender
        IERC20(tokenA).transfer(msg.sender, leftoverTokenA);
        IERC20(tokenB).transfer(msg.sender, leftoverTokenB);
    }

    //return amounts are divided by 18 decimals to make results look nicer on the frontend
    function getContactBalance() external view returns(uint, uint) {
        uint amountTokenA = IERC20(tokenA).balanceOf(address(this)) / (10**18);
        uint amountTokenB = IERC20(tokenB).balanceOf(address(this)) / (10**18);
        return (amountTokenA, amountTokenB);
    }
}
/*
You can add 10**18 to make calculation easier
Staking and rewarding mechanism for liquidity providers
Anywhere to use Counters?
Anywhere to use block.timestamp?
Pause the swap and remove liquidity functions

allowance and approve functions**no need because we are directly depositing the amounts inside the contract
*/