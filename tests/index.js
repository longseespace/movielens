const movielens = require('../dist');

if (!process.env.TEST_USER || !process.env.TEST_PASSWORD) {
  console.error('TEST_USER and TEST_PASSWORD not configured');
  process.exit(1);
}

// login test
function goodLoginTest() {
  console.log('Test: login() succeeds');
  movielens.login(process.env.TEST_USER, process.env.TEST_PASSWORD).then(() => {
    console.log('Test passed');
  }, () => {
    console.log('Test failed');
    process.exit(1);
  });
}

goodLoginTest();

function badLoginTest() {
  console.log('Test: login() fails for bad logins');
  movielens.login('bad@email.com', 'notfound').then(() => {
    console.log('Test failed');
    process.exit(1);
  }, () => {
    console.log('Test passed');
  });
}

badLoginTest();
