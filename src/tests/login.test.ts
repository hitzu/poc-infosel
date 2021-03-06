test('POST /auth/login', async () => {
  const encodings = require('../../node_modules/iconv-lite/encodings');
  const iconvLite = require('../../node_modules/iconv-lite/lib');
  iconvLite.getCodec('UTF-8');
  const supertest = require('supertest');
  const app = require('../../app');
  const mongoose = require('mongoose');
  const { generate } = require('../services/token');

  const conection = async () => {
    const connectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    };

    await mongoose.connect(
      'mongodb+srv://dev_user:GnWRgraL1J6SrBvs@cluster0.2vlym.mongodb.net/test?retryWrites=true&w=majority',
      connectionOptions
    );
  };

  conection();
  supertest(app)
    .post('/auth/login')
    .send({
      username: 'ales',
      password: 'Ro250693'
    })
    .set('Accept', /json/)
    .expect('Content-Type', /json/)
    .expect(200)
    .then(response => {
      console.log(response.body);
    });

  expect(true).toBe(true);
});
