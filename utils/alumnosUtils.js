const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Alumno = require('../models/alumnosModel');

dotenv.config({ path: '../config.env' });
const puerto = process.env.PORT || 3000;

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const eliminarTodo = async () => {
  try {
    await Alumno.deleteMany();
  } catch (err) {
    console.error(err.message);
  }
  process.exit();
};

const importarDesde = async (file) => {
  try {
    const data = JSON.parse(
      fs.readFileSync(`../dev-data/data/${file}`, 'utf-8')
    );
    await Alumno.create(data);
  } catch (err) {
    console.error(err.message);
  }
  process.exit();
};

const exportarA = async (file) => {
  try {
    const alumnos = await Alumno.find();
    fs.writeFileSync(`../dev-data/data/${file}`, JSON.stringify(alumnos));
  } catch (err) {
    console.error(err.message);
  }
  process.exit();
};

mongoose
  .connect(
    // DB,
    process.env.DATABASE_LOCAL,
    {
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Connection successful!');
    // console.log(process.argv, process.argv.length);

    if (process.argv[2] === '--importar') {
      console.log('Importar desde archivo JSON');
      const file = process.argv[3] ? process.argv[3] : 'data.json';
      importarDesde(file);
    } else if (process.argv[2] === '--borrar') {
      console.log('Se eliminaron los datos de la base de datos!');
      eliminarTodo();
    } else if (process.argv[2] === '--exportar') {
      const file = process.argv[3] ? process.argv[3] : 'export.json';
      // console.log('Exportar desde archivo JSON');
      exportarA(file);
    }
  })
  .catch((err) => {
    console.log(err);
  });
