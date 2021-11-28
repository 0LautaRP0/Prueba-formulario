const Instructor = require('../models/instructoresModel');
const clasesInstructores = require('./../clases/clasesInstructores');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
// const { isNumberObject } = require('util/types');

// const Instructors = JSON.parse(
//   fs.readFileSync('./dev-data/data/Instructors.json', 'utf-8')
// );
exports.mostrarInstructores = catchAsync(async (req, res, next) => {
  let queryObj = { ...req.query };
  let query = Instructor.find();
  new clasesInstructores(query, queryObj).filtrar().ordenar().limit().paginar();

  const instructores = await query;

  if (instructores.length === 0) {
    return next(new AppError('No hay instructores', 404));
  }
  res.json({
    status: 'success',
    data: {
      instructores,
    },
  });
});

exports.crearInstructor = async (req, res, next) => {
  const nuevoInstructor = await Instructor.create(req.body);
  res.json({
    status: 'success',
    data: {
      Instructor: nuevoInstructor,
    },
  });
};

exports.mostrarInstructor = async (req, res, next) => {
  const Instructor = await Instructor.findById(req.params.id);

  res.json({
    status: 'success',
    data: {
      Instructor,
    },
  });
};

exports.actualizarInstructor = async (req, res, next) => {
  const Instructor = await Instructor.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.json({
    status: 'success',
    data: Instructor,
  });
};

exports.eliminarInstructor = async (req, res) => {
  await Instructor.findByIdAndDelete(req.params.id);

  res.json({
    status: 'success',
    data: 'Nada que mostrar',
  });
};

// Aliasing
// exports.listadoFiltrado = async (req, res, next) => {
//   req.query.page = '1';
//   req.query.limit = '2';
//   req.query.fields = 'apellido, nombres, edad,-_id';
//   req.query.sort = 'nombres,edad';
//   next();
// };

// Aggregation
// exports.estadisticas = async (req, res) => {
//   const stats = await Instructor.aggregate([
//     {
//       $unwind: '$cursos',
//     },
//     { $match: { edad: { $gte: 10 } } },
//     {
//       $group: {
//         _id: '$cursos',
//         cantInstructors: { $sum: 1 },
//         sumaEdades: { $sum: '$edad' },
//         avgEdad: { $avg: '$edad' },
//         minEdad: { $min: '$edad' },
//         maxEdad: { $max: '$edad' },
//         Instructors: { $push: '$apellido' },
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
