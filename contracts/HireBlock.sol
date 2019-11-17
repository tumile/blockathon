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
        uint timestamp;
        string review;
    }

    uint nonce = 0;

    mapping(address => Company) private companies;

    mapping(address => Employee[]) private companyEmployees;

    mapping(address => Employee[]) private companyCandidates;

    mapping(address => PerformanceReview[]) private employeeReviews;

    address private owner;

    constructor() public {
        owner = msg.sender;
    }

    function addCompany(string memory companyName, string memory companyImage) public returns (address) {
        require(msg.sender == owner, "Sender must be owner of contract");

        address companyID = getUniqueId();
        Company memory newCompany = Company(companyID, companyName, companyImage);
        companies[companyID] = newCompany;

        return companyID;
    }

    function addEmployee(address companyID, string memory employeeName, string memory employeeImage) public returns (address) {
        require(companyID < companyList.length, "Company ID is invalid");

        uint employeeAmount = employeeLists[companyID].length;

        Employee memory newEmployee = Employee(employeeAmount, employeeName, employeeImage);

        employeeLists[companyID].push(newEmployee);

        return employeeAmount;
    }

    function addPerformanceReview(uint companyID, uint employeeID, string memory review, uint timestamp) public {
        require(companyID < companyList.length, "Company ID is invalid");
        require(employeeID < employeeLists[companyID].length, "Employee ID is invalid");

        PerformanceReview memory newReview = PerformanceReview(timestamp, review);

        string memory compEmpID = strConcat(uintToString(companyID), "-", uintToString(employeeID));

        employeeReviewsForCompany[compEmpID].push(newReview);
    }

    function addCandidate(uint companyID, uint employeeID, string memory employeeName, string memory employeeImage) public {
        Employee memory newEmployee = Employee(employeeID, employeeName, employeeImage);
        
        companyCandidates[companyID].push(newEmployee);
    }

    function getEmployeeList(uint companyID) public view returns(Employee[] memory employeeList) {
        return employeeLists[companyID];
    }

     function getPerformanceReviews(uint companyID, uint employeeID) public view returns (PerformanceReview[] memory reviewList) {
        string memory compEmpID = strConcat(uintToString(companyID), "-", uintToString(employeeID));
        return employeeReviewsForCompany[compEmpID];
    }

    function getCompanyCount() public view returns(uint count) {
        return companyList.length;
    }

    function getCompany(uint companyID) public view returns(Company memory comp) {
        return companyList[companyID];
    }

    function strConcat(string memory _a, string memory _b, string memory _c, string memory _d, string memory _e)
    internal pure returns (string memory){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory _bc = bytes(_c);
        bytes memory _bd = bytes(_d);
        bytes memory _be = bytes(_e);
        string memory abcde = new string(_ba.length + _bb.length + _bc.length + _bd.length + _be.length);
        bytes memory babcde = bytes(abcde);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) babcde[k++] = _ba[i];
        for (uint i = 0; i < _bb.length; i++) babcde[k++] = _bb[i];
        for (uint i = 0; i < _bc.length; i++) babcde[k++] = _bc[i];
        for (uint i = 0; i < _bd.length; i++) babcde[k++] = _bd[i];
        for (uint i = 0; i < _be.length; i++) babcde[k++] = _be[i];
        return string(babcde);
    }

    function strConcat(string memory _a, string memory _b, string memory _c, string memory _d) internal pure returns (string memory) {
        return strConcat(_a, _b, _c, _d, "");
    }

    function strConcat(string memory _a, string memory _b, string memory _c) internal pure returns (string memory) {
        return strConcat(_a, _b, _c, "", "");
    }

    function strConcat(string memory _a, string memory _b) internal pure returns (string memory) {
        return strConcat(_a, _b, "", "", "");
    }

    function uintToString(uint v) internal pure returns (string memory str) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        uint temp = v;
        while (temp != 0) {
            uint remainder = temp % 10;
            temp = temp / 10;
            reversed[i++] = byte(uint8(48 + remainder));
        }
        bytes memory s = new bytes(i + 1);
        for (uint j = 0; j <= i; j++) {
            s[j] = reversed[i - j];
        }
        str = string(s);
    }

    function getUniqueId() internal returns (address) {
        address random = address(uint160(uint(keccak256(abi.encodePacked(nonce, blockhash(block.number))))));
        nonce++;
        return address(random);
    }
}