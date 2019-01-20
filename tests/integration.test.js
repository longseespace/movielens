jest.unmock('axios');
jest.setTimeout(30000);

import m from '../src';

if (!process.env.TEST_USER || !process.env.TEST_PASSWORD) {
  console.error('TEST_USER and TEST_PASSWORD not configured');
  process.exit(1);
}

let cookie;

beforeAll(async () => {
  cookie = await m.login(process.env.TEST_USER, process.env.TEST_PASSWORD);
});

test('getMe()', async () => {
  const resp = await m.getMe(cookie);
  expect(resp).toMatchObject({
    data: {
      account: {
        email: process.env.TEST_USER,
      },
    },
    status: 'success',
  });
});

test('getGenres()', async () => {
  const resp = await m.getGenres(cookie);
  expect(resp).toMatchObject({
    status: 'success',
  });
});
