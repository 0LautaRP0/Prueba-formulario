const express = require('express');
// const morgan = require('morgan');
const routerAlumnos = require('./routes/alumnosRoutes');
const routerCursos = require('./routes/cursosRoutes');
const routerInstructores = require('./routes/instructoresRoutes');
const AppError = require('./utils/appError');
// const routerAuth = require('./rutas/auth');
const app = express();
// app.use(morgan('dev'))

app.use(express.json());
app.use('/api/v1/alumnos', routerAlumnos);

app.use(express.json());
app.use('/api/v1/cursos', routerCursos);

app.use(express.json());
app.use('/api/v1/instructores', routerInstructores);
// app.use('/api/v1/auth', routerAuth);

// manejador de rutasno encontradas
app.all('*', (req, res, next) => {
  next(new AppError('No se encontro la ruta', 404));
});

app.use((error, req, res, next) => {
  error.status = error.status || 'fail';
  error.statusCode = error.statusCode || 500;
  error.message = error.message || 'Mensaje de error generico';
  console.log(error);
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
});

module.exports = app;
