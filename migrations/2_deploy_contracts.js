var HireBlock = artifacts.require('./HireBlock.sol');

module.exports = function(deployer) {
  deployer.deploy(HireBlock).then(async function(instance) {
    const google = await instance.addCompany(
      'Google',
      'https://images.theconversation.com/files/93616/original/image-20150902-6700-t2axrz.jpg'
    );
    const micro = await instance.addCompany(
      'Microsoft',
      'https://cdn.pixabay.com/photo/2013/02/12/09/07/microsoft-80660_960_720.png'
    );
    const john = await instance.addEmployee(
      google,
      'John Doe',
      'https://cdn2.iconfinder.com/data/icons/people-80/96/Picture1-512.png'
    );
    const alice = await instance.addEmployee(
      micro,
      'Alice Smith',
      'https://cdn2.iconfinder.com/data/icons/people-80/96/Picture1-512.png'
    );
    const dana = await instance.addEmployee(
      google,
      'Dana Washington',
      'https://cdn2.iconfinder.com/data/icons/people-80/96/Picture1-512.png'
    );
    const bob = await instance.addEmployee(
      micro,
      'Bob Jones',
      'https://cdn2.iconfinder.com/data/icons/people-80/96/Picture1-512.png'
    );
    const james = await instance.addEmployee(
      micro,
      'James Lincoln',
      'https://cdn2.iconfinder.com/data/icons/people-80/96/Picture1-512.png'
    );
    instance.addPerformanceReview(
      google,
      john,
      'Good job this year',
      Date.UTC(2017, 12, 28)
    );
    instance.addPerformanceReview(
      google,
      dana,
      'Another good year',
      Date.UTC(2018, 12, 28)
    );
    instance.addPerformanceReview(
      micro,
      james,
      'Excellent performance',
      Date.UTC(2017, 12, 26)
    );
    instance.addCandidate(google, alice);
    instance.addCandidate(google, james);
    instance.addCandidate(google, bob);
  });
};
