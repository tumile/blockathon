pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract HireBlock {

    struct Company {
        address companyID;
        string companyName;
        string companyImage;
    }

    struct Employee {
        address employeeID;
        string employeeName;
        string employeeImage;
    }

    struct PerformanceReview {
        address companyID;
        uint timestamp;
        string review;
    }

    uint nonce = 0;

    mapping(address => Company) private companies;
    mapping(address => Employee) private employees;

    mapping(address => address[]) private companyEmployees;
    mapping(address => address[]) private companyCandidates;

    mapping(address => PerformanceReview[]) private employeeReviews;

    address private owner;

    constructor() public {
        owner = msg.sender;
    }

    function addCompany(string memory companyName, string memory companyImage) public returns (address companyID) {
        require(msg.sender == owner, "Sender must be owner of contract");
        companyID = getUniqueId();
        Company memory newCompany = Company(companyID, companyName, companyImage);
        companies[companyID] = newCompany;
    }

    function addEmployee(address companyID, string memory employeeName, string memory employeeImage) public returns (address employeeID) {
        employeeID = getUniqueId();
        Employee memory newEmployee = Employee(employeeID, employeeName, employeeImage);
        employees[employeeID] = newEmployee;
        companyEmployees[companyID].push(employeeID);
    }

    function addCandidate(address companyID, address employeeID) public {
        companyCandidates[companyID].push(employeeID);
    }

    function getEmployeeList(address companyID) public view returns (Employee[] memory employeeList) {
        address[] memory addresses = companyEmployees[companyID];
        uint length = addresses.length;
        employeeList = new Employee[](length);
        for (uint i = 0; i < length; i++) {
            employeeList[i] = employees[addresses[i]];
        }
    }

    function getCandidateList(address companyID) public view returns (Employee[] memory employeeList) {
        address[] memory addresses = companyCandidates[companyID];
        uint length = addresses.length;
        employeeList = new Employee[](length);
        for (uint i = 0; i < length; i++) {
            employeeList[i] = employees[addresses[i]];
        }
    }

    function addPerformanceReview(address companyID, address employeeID, string memory review, uint timestamp) public {
        PerformanceReview memory newReview = PerformanceReview(companyID, timestamp, review);
        employeeReviews[employeeID].push(newReview);
    }

    function getPerformanceReviews(address employeeID) public view returns (PerformanceReview[] memory performanceReviews) {
        performanceReviews = employeeReviews[employeeID];
    }

    function getCompany(address companyID) public view returns(Company memory company) {
        company = companies[companyID];
    }

    function getUniqueId() internal returns (address random) {
        random = address(uint160(uint(keccak256(abi.encodePacked(nonce, blockhash(block.number))))));
        nonce++;
    }
}