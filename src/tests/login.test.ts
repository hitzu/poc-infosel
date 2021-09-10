test('POST /auth/login', async () => {
  const supertest = require('supertest');
  const app = require('../../app');
  const userToFound = { username: 'ales', password: 'Ro250693' };

  supertest(app)
    .post('/auth/login')
    .send(userToFound)
    .expect(200)
    .then(response => {
      console.log(response.body);
    });
});
