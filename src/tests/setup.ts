require('custom-env').env(true);
const mongoose = require('mongoose');

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};

beforeEach(async done => {
  mongoose.connect(
    'mongodb+srv://dev_user:GnWRgraL1J6SrBvs@cluster0.2vlym.mongodb.net/test?retryWrites=true&w=majority',
    connectionOptions,
    (err, res) => {
      done();
    }
  );
});

afterEach(done => {
  mongoose.connection.close(() => done());
});
