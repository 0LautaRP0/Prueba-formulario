const express = require('express');
const controller = require('./../controllers/instructoresController');
const routerInstructores = express.Router();

// routerInstructores.route('/estadisticas').get(controller.estadisticas);
// routerInstructores
//   .route('/listado-filtrado')
//   .get(controller.listadoFiltrado)
//   .get(controller.mostrarInstructores);
routerInstructores
  .route('/')
  .get(controller.mostrarInstructores)
  .post(controller.crearInstructor);
routerInstructores
  .route('/:id')
  .get(controller.mostrarInstructor)
  .patch(controller.actualizarInstructor)
  .delete(controller.eliminarInstructor);

module.exports = routerInstructores;
