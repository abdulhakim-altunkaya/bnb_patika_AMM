//SSPDX-License-Identifier: MIT

pragma solidity >= 0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PandaSwap {
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
        tokenA = _tokenA;
        tokenB = _tokenB;
    }

    // Fee structure
    uint public feePercentage = 10; // Fee percentage (default 10 means 0.1% fee)
    function updateFeePercentage(uint _fee) external onlyOwner {
        require(_fee < 201, "fee cannot be bigger than %2");
        feePercentage = _fee;
    }

    function addLiquidity(uint amountA, uint amountB) external onlyOwner {
        require(amountA > 0 && amountB > 0, "amounts must be greater than 0");

        //transfer tokens from sender to the contract(pool)
        IERC20(tokenA).transferFrom(msg.sender, address(this), amountA);
        IERC20(tokenB).transferFrom(msg.sender, address(this), amountB);

        reserveA += amountA;
        reserveB += amountB;
    }

    function removeLiquidityTokenA(uint amountA) external {
        require(amountA > 0, "removal amount must be bigger than 0");

        //we need to withdraw a proportional amount from tokenB also to keep the balance of the pool
        //To do so, we use a basic mathematical proportion.
        uint amountB = (amountA * reserveB) / reserveA;

        //decrease the reserves
        reserveA -= amountA;
        reserveB -= amountB;

        //transfer tokens back to msg.sender
        IERC20(tokenA).transfer(msg.sender, amountA);
        IERC20(tokenB).transfer(msg.sender, amountB);
    }

    function removeLiquidityTokenB(uint amountB) external {
        require(amountB > 0, "removal amount must be bigger than 0");

        //calculate corresponding amount as above
        uint amountA = (amountB * reserveA) / reserveB;

        //decrease the reserves
        reserveA -= amountA;
        reserveB -= amountB;

        //transfer tokens to the msg.sender
        IERC20(tokenA).transfer(msg.sender, amountA);
        IERC20(tokenB).transfer(msg.sender, amountB);
    }

    function swapAwithB(uint amountIn, uint amountOutMin) external {
        require(amountIn > 0, "Amount must be greater than 0");

        // we calculate the amountout. The balance of value between tokens
        // is dynamic thanks to this calculation below.
        uint amountOut = (amountIn * reserveB) / reserveA;

        //calculating fee on mathematical proportion
        // if fee is 10, it means we will charge %0.1 per tx on amountOut
        uint txFee = amountOut / (feePercentage * 100);

        //deducting fee from amountOut
        amountOut -= txFee;

        // amountOut must be greater than or equal to the minimum specified
        // This line of code is for security of users against slippage and manipulation
        require(amountOut >= amountOutMin, "actual output is smaller than the desired output");

        // Transfer tokenIn from the sender to the contract
        IERC20(tokenA).transferFrom(msg.sender, address(this), amountIn);

        // Transfer tokenOut from the contract to the sender
        IERC20(tokenB).transfer(msg.sender, amountOut);

        // Updating reserves
        reserveA += amountIn;
        reserveB -= amountOut;
    }

    function swapBwithA(uint amountIn, uint amountOutMin) external {
        require(amountIn > 0, "Amount must be greater than 0");

        //we calculate the amountOut as above.
        uint amountOut = (amountIn * reserveA) / reserveB;

        //calculating fee as above
        uint txFee = amountOut / (feePercentage * 100);

        //deducting fee from amountOut
        amountOut -= txFee;

        //amountOut is specified as above function
        require(amountOut >= amountOutMin, "actual output is smaller than the desired output");

        //Transfer tokenIn from sender to the contract
        IERC20(tokenB).transferFrom(msg.sender, address(this), amountIn);

        //Transfer tokenOut from contract to the sender
        IERC20(tokenA).transfer(msg.sender, amountOut);

        // update reserves
        reserveB += amountIn;
        reserveA -= amountOut;
    }

    function getContactBalance() external view returns(uint, uint) {
        return (IERC20(tokenA).balanceOf(address(this)), IERC20(tokenB).balanceOf(address(this)));
    }
}
/*
You can add 10**18 to make calculation easier
Staking and rewarding mechanism for liquidity providers
allowance and approve functions
Anywhere to use Counters?
Anywhere to use block.timestamp?
Events*/