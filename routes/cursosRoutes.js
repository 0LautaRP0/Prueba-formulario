const express = require('express');
const controller = require('./../controllers/cursosController');
const routerCursos = express.Router();

// routerCursos.route('/estadisticas').get(controller.estadisticas);
// routerCursos
//   .route('/listado-filtrado')
//   .get(controller.listadoFiltrado)
//   .get(controller.mostrarCursos);
routerCursos
  .route('/curso')
  .get(controller.mostrarCursos)
  .post(controller.crearCurso);
routerCursos
  .route('/:id')
  .get(controller.mostrarCurso)
  .patch(controller.actualizarCurso)
  .delete(controller.eliminarCurso);

module.exports = routerCursos;
