var HireBlock = artifacts.require('./HireBlock.sol');

module.exports = function(deployer) {
  deployer.deploy(HireBlock).then(async function(instance) {
    const google = 'e38997ad5c457';
    instance.createCompany(google, 'Google', 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/150_Google_logo_logos-512.png');

    await addCandidates(instance, google);
    await addEmployees(instance, google)
  });

  const getRandomID = () => {
    return Math.random().toString(16).slice(2);
  }

  const addCandidates = async (instance, google) => {
    const airbnb = getRandomID();
    await instance.createCompany( airbnb, 'Airbnb', 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/11_Airbnb_logo_logos-512.png');

    const uber = getRandomID();
    await instance.createCompany( uber, 'Uber', 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/347_Uber_logo-512.png');

    const microsoft = getRandomID();
    await instance.createCompany(microsoft,'Microsoft','https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/216_Microsoft_logo_logos-512.png');

    const apple = getRandomID();
    await instance.createCompany(apple, 'Apple', 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/22_Apple_logo_logos-512.png');

    const netlix = getRandomID();
    await instance.createCompany(netlix, 'Netlix', 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/227_Netflix_logo-512.png');

    const adriana = getRandomID();
    await instance.createEmployee(adriana, 'Adriana Dillaway', 'Senior Software Engineer', 'https://randomuser.me/api/portraits/women/63.jpg')
    await instance.addPerformanceReview(airbnb, adriana, 'Adriana possesses a disciplined, reliable work ethic. She is always available to her team members. Of the areas identified in previous reviews, Adriana has demonstrated significant growth as an employee.', Date.UTC('2019', '10', '20'));
    await instance.addPerformanceReview(microsoft, adriana, 'Adriana helps team members on projects she is not involved in. She provides support, key insights, ideas and direction when possible.', Date.UTC('2019', '07', '10'));
    await instance.addPerformanceReview(microsoft, adriana, 'Adriana will need to create and excute a plan for getting more press mentions for the brand, and brokering content partnerships as she moves into Q2.', Date.UTC('2019', '03', '30'));

    const melitta = getRandomID();
    await instance.createEmployee(melitta, 'Melitta Houlahan', 'Technical Recruiter', 'https://randomuser.me/api/portraits/women/8.jpg')
    await instance.addPerformanceReview(uber, melitta, 'Melitta makes a strong effort to educate herself and enrich her own critical thinking skills. While she still has some areas to cover, her growth has demonstrated her dedication to the role, and ability to problem-solve proactively.', Date.UTC('2019', '10', '20'));
    await instance.addPerformanceReview(uber, melitta, 'She is well-organized, efficient with her time and mindful of deadlines. She has also made significant effort to learn, study her industry and make highly-informed decisions.', Date.UTC('2019', '07', '10'));
    await instance.addPerformanceReview(netlix, melitta, 'Melitta demonstrates job role ownership, ability to learn, win as a team, and active reflection exceedingly well.', Date.UTC('2019', '03', '30'));

    const orion = getRandomID();
    await instance.createEmployee(orion, 'Orion Lindwall', 'Busineess Strategy Analyst', 'https://randomuser.me/api/portraits/men/78.jpg');
    await instance.addPerformanceReview(apple, orion, 'Orion will need to determine ways to scale certain experiments and hacks that show growth potential. He possesses a disciplined, reliable work ethic. He is always available to his team members.', Date.UTC('2019', '10', '20'));
    await instance.addPerformanceReview(apple, orion, 'Orion makes a string effort to educate himself and enrich his own critical thinking skills.', Date.UTC('2019', '07', '10'));
    await instance.addPerformanceReview(airbnb, orion, 'Orion\'s work ethic is a string reflection of the company\'s core values. He helps team members on projects he is not involved in. He provides support, key insights, ideas and direction when possible.', Date.UTC('2019', '03', '30'));

    await instance.addCandidate(google, adriana);
    await instance.addCandidate(google, melitta);
    await instance.addCandidate(google, orion);
  };

  const addEmployees = async (instance, google) => { 
    const neal = getRandomID();
    await instance.createEmployee(neal, 'Neal Ternault', 'Staff Software Engineer', 'https://randomuser.me/api/portraits/men/51.jpg');
    await instance.addPerformanceReview(google, neal, 'Neal possesses a disciplined, reliable work ethic. He is always available to her team members. Of the areas identified in previous reviews, Neal has demonstrated significant growth as an employee.', Date.UTC('2019', '10', '20'));
    await instance.addPerformanceReview(google, neal, 'Neal helps team members on projects he is not involved in. He provides support, key insights, ideas and direction when possible.', Date.UTC('2019', '07', '10'));
    await instance.addPerformanceReview(google, neal, 'Neal will need to create and excute a plan for getting more press mentions for the brand, and brokering content partnerships as he moves into Q2.', Date.UTC('2019', '03', '30'));

    const linda = getRandomID();
    await instance.createEmployee(linda, 'Linda Burney', 'Mobile Software Engineer', 'https://randomuser.me/api/portraits/women/27.jpg')
    await instance.addPerformanceReview(google, linda, 'Linda makes a strong effort to educate herself and enrich her own critical thinking skills. While she still has some areas to cover, her growth has demonstrated her dedication to the role, and ability to problem-solve proactively.', Date.UTC('2019', '10', '20'));
    await instance.addPerformanceReview(google, linda, 'She is well-organized, efficient with her time and mindful of deadlines. She has also made significant effort to learn, study her industry and make highly-informed decisions.', Date.UTC('2019', '07', '10'));
    await instance.addPerformanceReview(google, linda, 'Linda demonstrates job role ownership, ability to learn, win as a team, and active reflection exceedingly well.', Date.UTC('2019', '03', '30'));

    const dudley = getRandomID();
    await instance.createEmployee(dudley, 'Dudley Woolard', 'UX Engineer, Front End', 'https://randomuser.me/api/portraits/men/91.jpg');
    await instance.addPerformanceReview(google, dudley, 'Dudley will need to determine ways to scale certain experiments and hacks that show growth potential. He possesses a disciplined, reliable work ethic. He is always available to his team members.', Date.UTC('2019', '10', '20'));
    await instance.addPerformanceReview(google, dudley, 'Dudley makes a string effort to educate himself and enrich his own critical thinking skills.', Date.UTC('2019', '07', '10'));
    await instance.addPerformanceReview(google, dudley, 'Dudley\'s work ethic is a string reflection of the company\'s core values. He helps team members on projects he is not involved in. He provides support, key insights, ideas and direction when possible.', Date.UTC('2019', '03', '30'));


    await instance.addEmployee(google, neal);
    await instance.addEmployee(google, linda);
    await instance.addEmployee(google, dudley);
  }
};
