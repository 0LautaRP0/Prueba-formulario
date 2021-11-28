class AppError extends Error {
  constructor(mensaje, codigo) {
    super(mensaje);
    this.statusCode = codigo;
    // this.status = `${codigo.startsWith('4' ? 'fail' : 'error')}`;
    this.isOperational = true;

    Error.captureStackTrace(this.constructor);
  }
}

module.exports = AppError;
