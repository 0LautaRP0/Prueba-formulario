const express = require('express');
const controller = require('./../controladores/alumnosController');
const routerAlumnos = express.Router();

// routerAlumnos.route('/estadisticas').get(controller.estadisticas);
// routerAlumnos
//   .route('/listado-filtrado')
//   .get(controller.listadoFiltrado)
//   .get(controller.mostrarAlumnos);
routerAlumnos
  .route('/')
  .get(controller.mostrarAlumnos)
  .post(controller.crearAlumno);
routerAlumnos
  .route('/:id')
  .get(controller.mostrarAlumno)
  .patch(controller.actualizarAlumno)
  .delete(controller.eliminarAlumno);

module.exports = routerAlumnos;
