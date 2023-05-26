//SSPDX-License-Identifier: MIT

pragma solidity >= 0.8.7;

contract FrogAMM {
    //FrogAMM is an Automated Market Maker contract. It manages
    //a pool of TokenA and TokenB. The project is prepared for Patika-BNB Course
    //by Abdulhakim Altunkaya, 2023

    //setting the owner bby using if&revert structure
    address public owner;
    error NotOwner(string message, address caller);
    modifier onlyOwner() {
        if(msg.sender == owner) {
            revert NotOwner("you are not owner", msg.sender);
        }
    }

    //Token addresses and reserves
    address public tokenA;
    address public tokenB;
    uint public reserveA;
    uint public reserveB;

    //constructor assigns owner and also token addresses to the variables
    constructor(address _tokenA, address _tokenB) {
        owner = msg.sender;
        tokenA = _tokenA;
        tokenB = _tokenB;
    }

    function addLiquidity(uint amountA, uint amountB) external {
        require(amountA > && amountB > 0, "amounts must be greater than 0");

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


}
/*
You can add 10**18 to make calculation easier */

contract AMM {



    function swap(uint256 amountIn, uint256 amountOutMin) external {
        require(amountIn > 0, "Amount must be greater than zero");

        // Calculate the output amount using the constant product formula
        uint256 amountOut = (amountIn * reserveB) / reserveA;

        // Ensure the calculated amountOut is greater than or equal to the minimum specified
        require(amountOut >= amountOutMin, "Insufficient output amount");

        // Transfer tokenIn from the sender to the contract
        IERC20(tokenA).transferFrom(msg.sender, address(this), amountIn);

        // Transfer tokenOut from the contract to the sender
        IERC20(tokenB).transfer(msg.sender, amountOut);

        // Update the reserves
        reserveA += amountIn;
        reserveB -= amountOut;
    }
}

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
}
