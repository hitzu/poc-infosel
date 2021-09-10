test('GET /user', async () => {
  const supertest = require('supertest');
  const app = require('../../app');

  await supertest(app)
    .get('/user/613ad150454eb932c1b50cf3')
    .expect(200)
    .then(response => {
      console.log(response.body);
    });

  expect(true).toBe(true);
});
