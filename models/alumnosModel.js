const mongoose = require('mongoose');
const validator = require('validator');

const alumnoSchema = new mongoose.Schema(
  {
    apellido: {
      type: String,
      required: [true, 'El apellido del alumno es obligatorio!'], //default: "false", puede ir "true", o un arreglo de 2 elementos: "[true, 'asdwqfafsd']"
    },
    nombre: {
      type: String,
      validate: [validator.isAlpha, 'Error ...'],
      required: [true, 'El nombre del alumno es obligatorio!'],
    },
    email: {
      type: String,
      required: true,
    },
    edad: {
      type: Number,
      validate: function (val) {
        return val > 0;
      },
      max: 99,
      default: 18,
    },
    documentoTipo: {
      type: String,
      required: true,
    },
    documentoNro: {
      type: Number,
      required: true,
    },
    domicilio: {
      type: String,
      required: true,
    },
    documentoNro: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
alumnoSchema.virtual('nombreCompleto').get(function () {
  return `${this.apellido}, ${this.nombre}`;
});

// alumnoSchema.pre('save', function (next) {
//   if (this.cursos.length === 0) {
//     this.cursos = ['cocinero'];
//   }
//   console.log(this);
//   next();
// });

// alumnoSchema.post('save', function (doc, next) {
//   console.log(this);
//   next();
// });

// alumnoSchema.pre(/^find/, function (next) {
//   this.start = Date.now();
//   next();
// });

// alumnoSchema.post(/^find/, function (docs, next) {
//   console.log(`El query duro ${Date.now() - this.start} milisegundos!`);
//   next();
// });

const Alumno = mongoose.model('Alumno', alumnoSchema);

module.exports = Alumno;
