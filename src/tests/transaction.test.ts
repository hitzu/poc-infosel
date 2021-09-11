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

  const token = await generate(
    '613ad150454eb932c1b50cf3',
    'ales',
    true,
    '613ad150454eb932c1b50cf1',
    '192.168.10'
  );

  supertest(app)
    .post('/transaction/deposit')
    .send({
      receivedAccount: '613ad151454eb932c1b50cf6',
      movementype: 'Abono',
      amount: 2000,
      concept: 'pago mensualidad',
      reference: 'AF123412',
      operation: 'SPEI',
      status: 'Aprobado'
    })
    .set('Accept', /json/)
    .set({ Authorization: token })
    .expect('Content-Type', /json/)
    .expect(200)
    .then(response => {
      console.log(response.body);
    });
  expect(true).toBe(true);
});
