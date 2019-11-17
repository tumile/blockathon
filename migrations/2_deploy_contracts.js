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

    instance.addPerformanceReview(
      googleID,
      johnID,
      'Good job this year',
      Date.UTC(2017, 12, 28)
    );
    
    const microID = Math.random()
      .toString(16)
      .slice(2);
    await instance.addCompany(
      microID,
      'Microsoft',
      'https://images.theconversation.com/files/93616/original/image-20150902-6700-t2axrz.jpg'
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
      aliceID,
      'Another good year',
      Date.UTC(2018, 12, 28)
    );

    instance.addCandidate(googleID, aliceID);
    instance.addCandidate(googleID, johnID);

    var fnames = ["Neddy", "Neal", "Darline", "Linda", "Gallagher", "Kathlin", "Duky", "Jewel", "Dudley", "Silvester"];
    var lnames = ["Alltimes", "Ternault", "Pawling", "Burney", "Vido", "Vido", "Treneman", "Treneman", "Woolard", "Guilder"];
    var reviews = ['Good job this year', 'Great job this year', 
                  'Fantastic job this year', 'Acceptable job this year', 
                  'Great work on the project', 'Great display of teamwork'];

    for (var i = 0; i < 5; i++) {
      const currentID = Math.random()
      .toString(16)
      .slice(2);

      var name = fnames[Math.floor(Math.random(0, fnames.length)*10)] + " " + lnames[Math.floor(Math.random(0, fnames.length)*10)];

      instance.addEmployee(
        googleID,
        currentID,
        name,
        'https://cdn2.iconfinder.com/data/icons/people-80/96/Picture1-512.png'
      );
      
      var year = 2015 + Math.floor(Math.random() * Math.floor(3));
      var month = Math.floor(Math.random() * Math.floor(12));
      var day = Math.floor(Math.random() * Math.floor(28));

      instance.addPerformanceReview(
        googleID,
        currentID,
        reviews[Math.floor(Math.random(0, reviews.length)*10)],
        Date.UTC(year, month, day)
      );

      year = 2015 + Math.floor(Math.random() * Math.floor(3));
      month = Math.floor(Math.random() * Math.floor(12));
      day = Math.floor(Math.random() * Math.floor(28));

      instance.addPerformanceReview(
        googleID,
        currentID,
        reviews[Math.floor(Math.random(0, reviews.length)*10)],
        Date.UTC(year, month, day)
      );


    }

  });
};
