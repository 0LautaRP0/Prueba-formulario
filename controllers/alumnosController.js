const Alumno = require('../models/alumnosModel');
const apiOpciones = require('../apiOpciones');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
// const { isNumberObject } = require('util/types');

// const alumnos = JSON.parse(
//   fs.readFileSync('./dev-data/data/alumnos.json', 'utf-8')
// );
exports.mostrarAlumnos = catchAsync(async (req, res, next) => {
  let queryObj = { ...req.query };
  let query = Alumno.find();
  new apiOpciones(query, queryObj).filtrar().ordenar().limit().paginar();

  const alumnos = await query;

  if (alumnos.length === 0) {
    return next(new AppError('No hay alumnos', 404));
  }
  res.json({
    status: 'success',
    data: {
      alumnos,
    },
  });
});

exports.crearAlumno = async (req, res, next) => {
  const nuevoAlumno = await Alumno.create(req.body);
  res.json({
    status: 'success',
    data: {
      alumno: nuevoAlumno,
    },
  });
};

exports.mostrarAlumno = async (req, res, next) => {
  const alumno = await Alumno.findById(req.params.id);

  res.json({
    status: 'success',
    data: {
      alumno,
    },
  });
};

exports.actualizarAlumno = async (req, res, next) => {
  const alumno = await Alumno.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json({
    status: 'success',
    data: alumno,
  });
};

exports.eliminarAlumno = async (req, res) => {
  await Alumno.findByIdAndDelete(req.params.id);

  res.json({
    status: 'success',
    data: 'Nada que mostrar',
  });
};

//Aliasing
// exports.listadoFiltrado = async (req, res, next) => {
//   req.query.page = '1';
//   req.query.limit = '2';
//   req.query.fields = 'apellido, nombres, edad,-_id';
//   req.query.sort = 'nombres,edad';
//   next();
// };

// Aggregation
// exports.estadisticas = async (req, res) => {
//   const stats = await Alumno.aggregate([
//     {
//       $unwind: '$cursos',
//     },
//     { $match: { edad: { $gte: 10 } } },
//     {
//       $group: {
//         _id: '$cursos',
//         cantAlumnos: { $sum: 1 },
//         sumaEdades: { $sum: '$edad' },
//         avgEdad: { $avg: '$edad' },
//         minEdad: { $min: '$edad' },
//         maxEdad: { $max: '$edad' },
//         alumnos: { $push: '$apellido' },
//       },
//     },
//     {
//       $addfields: { curso: '$_id' },
//     },
//     {
//       $project: {
//         _id: 0,
//       },
//     },
//     {
//       $sort: { _id: 1 },
//     },
//     {
//       $limit: 10,
//     },
//   ]);
//   res.json({
//     status: 'success',
//     data: {
//       stats,
//     },
//   });
// };
