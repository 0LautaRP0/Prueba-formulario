const Curso = require('../models/cursosModel');
const apiOpciones = require('../apiOpciones');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
// const { isNumberObject } = require('util/types');

// const Cursos = JSON.parse(
//   fs.readFileSync('./dev-data/data/Cursos.json', 'utf-8')
// );
exports.mostrarCursos = catchAsync(async (req, res, next) => {
  let queryObj = { ...req.query };
  let query = Curso.find();
  new apiOpciones(query, queryObj).filtrar().ordenar().limit().paginar();

  const cursos = await query;

  if (cursos.length === 0) {
    return next(new AppError('No hay cursos', 404));
  }
  res.json({
    status: 'success',
    data: {
      cursos,
    },
  });
});

exports.crearCurso = async (req, res, next) => {
  const nuevoCurso = await Curso.create(req.body);
  res.json({
    status: 'success',
    data: {
      curso: nuevoCurso,
    },
  });
};

exports.mostrarCurso = async (req, res, next) => {
  const curso = await Curso.findById(req.params.id);

  res.json({
    status: 'success',
    data: {
      curso,
    },
  });
};

exports.actualizarCurso = async (req, res, next) => {
  const curso = await Curso.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json({
    status: 'success',
    data: curso,
  });
};

exports.eliminarCurso = async (req, res) => {
  await Curso.findByIdAndDelete(req.params.id);

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
//   const stats = await Curso.aggregate([
//     {
//       $unwind: '$cursos',
//     },
//     { $match: { edad: { $gte: 10 } } },
//     {
//       $group: {
//         _id: '$cursos',
//         cantCursos: { $sum: 1 },
//         sumaEdades: { $sum: '$edad' },
//         avgEdad: { $avg: '$edad' },
//         minEdad: { $min: '$edad' },
//         maxEdad: { $max: '$edad' },
//         Cursos: { $push: '$apellido' },
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
