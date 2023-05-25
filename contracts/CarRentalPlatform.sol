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
    function setOwner(address _newOwner) external onlyOwner {
        owner = _newOwner;
    }

    //add user #nonExisting
    function addUser(string calldata name, string calldata lastName) external {
        require(!isUser(msg.sender), "user already exists");
        users[msg.sender] = User(msg.sender, name, lastname, 0, 0, 0, 0);
        emit UserAdded(msg.sender, users[msg.sender].name, users[msg.sender].lastName);

    }
    //add car #onlyOwner, #nonExistingCar
    function addCar(string calldata name, string calldata url, uint rent, uint sale) external onlyOwner {
        _counter.increment();
        uint counter = _counter.current();
        cars[counter] = Cars(counter, name, url, Status.Available, rent, sale);
        emit CarAdded(counter, cars[counter].name, cars[counter].imgUrl, cars[counter].rentFee, cars[counter].saleFee);
    }

    //update car data #onlyOwner, #existingCar
    function editCarMetaData(uint id, string calldata name, string calldata imgUrl, uint rentFee, uint safeFee) external onlyOwner {
        require(cars[id] != 0, "car does not exist");
        Car storage car = cars[id];
        if(bytes(name).length != 0) {
            car.name = name;
        }
        if(bytes(imgUrl).length != 0) {
            car.imgUrl = imgUrl;
        }
        if(rentFee > 0) {
            car.rentFee = rentFee;
        }
        if(saleFee > 0) {
            car.saleFee = saleFee;
        }
        emit CarMetaDataEdited(id, car.name, car.imgUrl, car.rentFee, car.saleFee);
    }

    //update car status #onlyOwner, #existingCar
    function editCarStatus(uint id, Status status) external onlyOwner {
        require(cars[id].id != 0, "car does not exist");
        cars[id].status = status;
        emit CarStatusEdited(id, status);
    }

    //checkout the car #existingUser, #isCarAvailable, #userHasNotRentedCar, #userHasNoDebt
    function CheckOut(uint id) external {
        require(isUser(msg.sender), "user does not exist");
        require(cars[id].status == Status.Available, "car is not available");
        require(users[msg.sender].rentedCarId == 0, "you did not rent any car");
        require(users[msg.sender].debt == 0, "you have debt");

        users[msg.sender].start = block.timestamp;
        users[msg.sender].rentedCarId = id;
        cars[id].status = Status.InUse;

        emit CheckOut(msg.sender, id);
    }

    //checkIn #existingUser, #userHasRentedCar
    function checkIn() external {
        require(isUser(msg.sender), "user does not exist");
        uint rentedCarId = users[msg.sender].rentedCarId;
        require(rentedCarId != 0, "User has not rented a car");
        uint usedSeconds = block.timestamp - users[msg.sender].start;
        uint rentFee = cars[rentedCarId].rentFee;
        users[msg.sender].debt += calculateDebt(usedSeconds, rentFee);
        users[msg.sender].rentedCarId = 0;
        users[msg.sender].start = 0;
        cars[rentedCarId].status = Status.Available;

        emit CheckIn(msg.sender, rentedCarId);
    }

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