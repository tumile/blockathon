pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract CompanyDatabase {

    struct Company {
        uint companyID;
        string companyName;
        string companyImage;
    }

    struct Employee {
        uint employeeID;
        string employeeName;
        string employeeImage;
    }

    struct PerformanceReview {
        uint date;
        string review;
    }

    Company[] companyList;

    mapping(uint => Employee[]) employeeLists;

    //concatenate companyId and employeeID to get the key for performance reviews
    mapping(string => PerformanceReview[]) employeeReviewsForCompany;

    address owner;

    constructor() public {
        owner = msg.sender;
    }

    function addCompany(string memory companyName, string memory companyImage) public returns(uint companyID) {
        require(msg.sender == owner, "Sender must be owner of contract");

        Company memory newCompany = Company(companyList.length, companyName, companyImage);
        companyList[companyList.length] = newCompany;

        return companyList.length - 1;
    }

    function addEmployee(uint companyID, string memory empName, string memory imageURL) public returns (uint empID) {
        require(companyID < companyList.length, "Company ID is invalid");

        uint employeeAmount = employeeLists[companyID].length;

        Employee memory newEmployee = Employee(employeeAmount, empName, imageURL);

        employeeLists[companyID].push(newEmployee);

        return employeeAmount + 1;
    }
    
    function addPerformanceReview(uint companyID, uint employeeID, string memory review, uint timestamp) public returns (string memory) {
        require(companyID < companyList.length, "Company ID is invalid");
        require(employeeID < employeeLists[companyID].length, "Employee ID is invalid");
        
        PerformanceReview memory newReview = PerformanceReview(review, timestamp);
        
        string memory compEmpID = strConcat(uintToString(companyID), uintToString(employeeID));
        
        employeeReviewsForCompany[compEmpID].push(newReview);
        
        return compEmpID;
    }
    
    // function getEmployeeList(uint companyID) public view returns(string memory empList) {
    //     string memory retStr = strConcat(uintToString(employeeLists[companyID][0].id), ",", employeeLists[companyID][0].name, ".");
        
    //     for (uint i = 1; i < employeeLists[companyID].length; i++) {
    //         retStr = strConcat(retStr, uintToString(employeeLists[companyID][i].id), ",", employeeLists[companyID][i].name, ".");
    //     }
        
    //     return retStr;
    // }
    
    function getEmployeeList(uint companyID) public view returns(Employee[] memory empList) {
        return employeeLists[companyID];
    }
    
    // function getPerformanceReviews(uint companyID, uint employeeID) public view returns (string memory reviewList) {
    //     string memory compEmpID = strConcat(uintToString(companyID), uintToString(employeeID));
    //     PerformanceReview[] memory reviews = employeeReviewsForCompany[compEmpID];
        
    //     string memory retStr = strConcat(reviews[0].review, ",", uintToString(reviews[0].date), ".");
        
        
    //     for (uint i = 1; i < reviews.length; i++) {
    //         retStr = strConcat(retStr, reviews[i].review, ",", uintToString(reviews[0].date), ".");
    //     }
        
        
    //     return retStr;
    // }
    
     function getPerformanceReviews(uint companyID, uint employeeID) public view returns (PerformanceReview[] memory reviewList) {
        string memory compEmpID = strConcat(uintToString(companyID), uintToString(employeeID));
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
    
    function strConcat(string memory _a, string memory _b, string memory _c, string memory _d) pure internal returns (string memory) {
        return strConcat(_a, _b, _c, _d, "");
    }
    
    function strConcat(string memory _a, string memory _b, string memory _c) pure internal returns (string memory) {
        return strConcat(_a, _b, _c, "", "");
    }
    
    function strConcat(string memory _a, string memory _b) pure internal returns (string memory) {
        return strConcat(_a, _b, "", "", "");
    }

    function uintToString(uint v) pure internal returns (string memory str) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        while (v != 0) {
            uint remainder = v % 10;
            v = v / 10;
            reversed[i++] = byte(uint8(48 + remainder));
        }
        bytes memory s = new bytes(i + 1);
        for (uint j = 0; j <= i; j++) {
            s[j] = reversed[i - j];
        }
        str = string(s);
    }
}