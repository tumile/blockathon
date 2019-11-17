pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract HireBlock {

    struct Company {
        string companyID;
        string companyName;
        string companyImage;
    }

    struct Employee {
        string employeeID;
        string employeeName;
        string employeeTitle;
        string employeeImage;
    }

    struct PerformanceReview {
        string companyID;
        uint timestamp;
        string review;
    }

    mapping(string => Company) private companies;
    mapping(string => Employee) private employees;

    mapping(string => string[]) private companyEmployees;
    mapping(string => string[]) private companyCandidates;

    mapping(string => PerformanceReview[]) private employeeReviews;

    address private owner;

    constructor() public {
        owner = msg.sender;
    }

    function createCompany(string memory companyID, string memory companyName, string memory companyImage) public {
        require(msg.sender == owner, "Sender must be owner of contract");
        Company memory newCompany = Company(companyID, companyName, companyImage);
        companies[companyID] = newCompany;
    }

    function createEmployee(string memory employeeID, string memory employeeName, string memory employeeTitle, string memory employeeImage) public {
        Employee memory newEmployee = Employee(employeeID, employeeName, employeeTitle, employeeImage);
        employees[employeeID] = newEmployee;
    }

    function addEmployee(string memory companyID, string memory employeeID) public {
        companyEmployees[companyID].push(employeeID);
    }

    function addCandidate(string memory companyID, string memory employeeID) public {
        companyCandidates[companyID].push(employeeID);
    }

    function getEmployeeList(string memory companyID) public view returns (Employee[] memory employeeList) {
        string[] memory addresses = companyEmployees[companyID];
        uint length = addresses.length;
        employeeList = new Employee[](length);
        for (uint i = 0; i < length; i++) {
            employeeList[i] = employees[addresses[i]];
        }
    }

    function getCandidateList(string memory companyID) public view returns (Employee[] memory employeeList) {
        string[] memory addresses = companyCandidates[companyID];
        uint length = addresses.length;
        employeeList = new Employee[](length);
        for (uint i = 0; i < length; i++) {
            employeeList[i] = employees[addresses[i]];
        }
    }

    function addPerformanceReview(string memory companyID, string memory employeeID, string memory review, uint timestamp) public {
        PerformanceReview memory newReview = PerformanceReview(companyID, timestamp, review);
        employeeReviews[employeeID].push(newReview);
    }

    function getPerformanceReviews(string memory employeeID) public view returns (PerformanceReview[] memory performanceReviews) {
        performanceReviews = employeeReviews[employeeID];
    }

    function getCompany(string memory companyID) public view returns(Company memory company) {
        company = companies[companyID];
    }
}