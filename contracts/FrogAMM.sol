//SSPDX-License-Identifier: MIT

pragma solidity >= 0.8.7;

contract FrogAMM {

    //setting the owner bby using if&revert structure
    address public owner;
    constructor() {
        owner = msg.sender;
    }
    error NotOwner(string message, address caller);
    modifier onlyOwner() {
        if(msg.sender == owner) {
            revert NotOwner("you are not owner", msg.sender);
        }
    }

    

}