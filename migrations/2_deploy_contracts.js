var HireBlock = artifacts.require('./HireBlock.sol');

module.exports = function(deployer) {
  deployer.deploy(HireBlock).then(async function(instance) {
    // Company
    const googleID = 'e38997ad5c457';
    await instance.addCompany(
      googleID,
      'Google',
      'https://images.theconversation.com/files/93616/original/image-20150902-6700-t2axrz.jpg'
    );

    // Employee
    const johnID = Math.random()
      .toString(16)
      .slice(2);
    await instance.addEmployee(
      googleID,
      johnID,
      'John Doe',
      'https://cdn2.iconfinder.com/data/icons/people-80/96/Picture1-512.png'
    );
    const aliceID = Math.random()
      .toString(16)
      .slice(2);
    await instance.addEmployee(
      microID,
      aliceID,
      'Alice Smith',
      'https://cdn2.iconfinder.com/data/icons/people-80/96/Picture1-512.png'
    );

    instance.addPerformanceReview(
      googleID,
      johnID,
      'Good job this year',
      Date.UTC(2017, 12, 28)
    );
    instance.addPerformanceReview(
      googleID,
      aliceID,
      'Another good year',
      Date.UTC(2018, 12, 28)
    );

    const microID = Math.random()
      .toString(16)
      .slice(2);
    await instance.addCompany(
      microID,
      'Microsoft',
      'https://images.theconversation.com/files/93616/original/image-20150902-6700-t2axrz.jpg'
    );
    await instance.addEmployee(
      microID,
      aliceID,
      'Alice Smith',
      'https://cdn2.iconfinder.com/data/icons/people-80/96/Picture1-512.png'
    );

    instance.addCandidate(googleID, aliceID);
    instance.addCandidate(googleID, johnID);
  });
};
