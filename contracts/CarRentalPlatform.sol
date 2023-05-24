//SPDX-License-Identifier: MIT

pragma solidity >=0.8.7;

import "@openzeppelin/contracts/utils/Counters.sol";

contract CarRentalPlatform {

    //DATA

    //Counter
    using Counters for Counters.Counter;
    Counters.Counter private _counter;

    //owner
    address private owner;

    //Total Payments
    uint private totalPayments;

    //User Struct
    struct User {
        address walletAddress;
        string name;
        string lastName;
        uint rentedCarId;
        uint balance;
        uint debt;
        uint start;
    }

    //Car Struct
    struct Car {
        uint id;
        string name;
        string imgUrl;
        Status status;
        uint rentFee;
        uint saleFee;
    }

    //Car Status
    enum Status {Retired, InUse, Available}

    //events
    event CarAdded (uint indexed id, string name, string imgUrl, uint rentFee, uint saleFee);
    event CarMetaDataEdited(uint indexed id, string name, string imgUrl, uint rentFee, uint saleFee);
    event CarStatusEdited(uint indexed id, Status status);
    event UserAdded(address indexed walletAddress, string name, string lastName);
    event Deposit(address indexed walletAddress, uint amount);
    event CheckOut(address indexed walletAddress, uint indexed carId);
    event CheckIn(address indexed walletAddress, uint indexed carId);
    event PaymentMade(address indexed walletAddress, uint amount);
    event BalanceWithdrawn(address indexed walletAddress, uint amount);

    //User Mapping
    mapping(address => User) private users;

    //Car Mapping
    mapping(uint => Car) private cars;

    //Constructor
    constructor() {
        owner = msg.sender;
    }

    //Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "only owner can call this function");
        _;
    }
    //FUNCTIONS

    //set owner #onlyOwner

    //add user #onlyOwner

    //add car #onlyOwner, #nonExistingCar

    //update car data #onlyOwner, #existingCar

    //update car status #onlyOwner, #existingCar

    //checkout the car #existingUser, #isCarAvailable, #userHasNotRentedCar, #userHasNoDebt

    //checkIn #existingUser, #userHasRentedCar

    //deposit tokens for future rental payments #existingUser

    //make payment #existingUser, #existingDebt, #sufficientBalance

    //withdraw balance #existingUser

    //withdraw Owner #onlyOwner

    //get owner query function

    //isUser query function

    //getUser #existingUser query function

    //getCar #existingCar query function

    //getCarByStatus

    //calculateDebt

    //getCurrentCount

    //getContractBalance #onlyOwner

    //getTotalPayment #onlyOwner


}