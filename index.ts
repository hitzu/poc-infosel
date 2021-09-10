'use strict';
const mongoose = require('mongoose');
require('custom-env').env(true);
import ip from 'ip';
const app = require('./app');

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};

const port = 3000;

mongoose.connect(process.env.DB_HOST, connectionOptions, (err, res) => {
  if (err) {
    return console.error(`Error al conectar a la base de datos: ${err}`);
  }
  console.log(`Conexion a la base de datos en: ${process.env.DB_HOST}`);

  app.listen(port, () => {
    console.log(`API REST corriendo en http://${ip.address()}:${port}/`);
  });
});
