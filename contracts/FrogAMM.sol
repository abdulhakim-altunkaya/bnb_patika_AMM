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

}
