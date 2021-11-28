const express = require('express');
// const morgan = require('morgan');
const routerAlumnos = require('./rutas/rutasAlumnos');
// const routerAuth = require('./rutas/auth');
const app = express();

app.use(express.json());
// app.use(morgan('dev'))
app.use('/api/v1/alumnos', routerAlumnos);
// app.use('/api/v1/auth', routerAuth);

// manejador de rutasno encontradas
app.all('*', (req, res, next) => {
  next(new AppError('xxxxxxxxxxxxx', 404));
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
