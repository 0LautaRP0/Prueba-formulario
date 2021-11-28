const mongoose = require('mongoose');
const validator = require('validator');

const cursoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      validate: [validator.isAlpha, 'Error ...'],
      required: [true, 'El nombre del curso es obligatorio!'],
    },
    fechaDesde: {
      type: Number,
      required: true,
    },
    fechaHasta: {
      type: Number,
      required: true,
    },
    dias: {
      type: String,
      required: true,
    },
    horarios: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// cursoSchema.pre('save', function (next) {
//   if (this.cursos.length === 0) {
//     this.cursos = ['cocinero'];
//   }
//   console.log(this);
//   next();
// });

// cursoSchema.post('save', function (doc, next) {
//   console.log(this);
//   next();
// });

// cursoSchema.pre(/^find/, function (next) {
//   this.start = Date.now();
//   next();
// });

// cursoSchema.post(/^find/, function (docs, next) {
//   console.log(`El query duro ${Date.now() - this.start} milisegundos!`);
//   next();
// });

const Curso = mongoose.model('Curso', cursoSchema);

module.exports = Curso;
