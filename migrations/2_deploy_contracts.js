var HireBlock = artifacts.require('./HireBlock.sol');

module.exports = function(deployer) {
  deployer.deploy(HireBlock).then(function(instance) {
    instance.addCompany("Google", "https://images.theconversation.com/files/93616/original/image-20150902-6700-t2axrz.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1000&fit=clip");
    instance.addCompany("Microsoft", "https://cdn.pixabay.com/photo/2013/02/12/09/07/microsoft-80660_960_720.png");

    instance.addEmployee(0, "John Doe", "https://cdn2.iconfinder.com/data/icons/people-80/96/Picture1-512.png");
    instance.addEmployee(0, "Alice Smith", "https://cdn2.iconfinder.com/data/icons/people-80/96/Picture1-512.png");
    instance.addEmployee(0, "Dana Washington", "https://cdn2.iconfinder.com/data/icons/people-80/96/Picture1-512.png");
    instance.addEmployee(1, "Bob Jones", "https://cdn2.iconfinder.com/data/icons/people-80/96/Picture1-512.png");
    instance.addEmployee(1, "James Lincoln", "https://cdn2.iconfinder.com/data/icons/people-80/96/Picture1-512.png");

    Date d1 = new Date(2017, 12, 28);

    instance.addPerformanceReview(0, 0, "Good job this year", d1.prototype.getTime());

  });
};
