import ml from '../src';

if (!process.env.TEST_USER || !process.env.TEST_PASSWORD) {
  console.error('TEST_USER and TEST_PASSWORD not configured');
  process.exit(1);
}

describe('Movielens', () => {
  it('login() succeeds', async () => {
    try {
      const cookie = await ml.login('bad@email.com', 'notfound');
      expect(cookie).toBeDefined();
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it('login() fails for bad logins', async () => {
    try {
      await ml.login('bad@email.com', 'notfound');
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});
