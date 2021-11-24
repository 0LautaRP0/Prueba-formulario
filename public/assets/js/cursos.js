const cursosContainer = document.querySelector('cursos-container');
const txtEstablecimiento = document.getElementById('txt-establecimiento');
const txtCurso = document.getElementById('txt-curso');
const btnGuardarCursos = document.querySelector('.btn-guardar-cursos');
const btnActualizarCursos = document.querySelector('.btn-actualizar-cursos');
const btnLimpiarCursos = document.querySelector('.btn-limpiar-cursos');
const listaCursos = document.querySelector('.lista-cursos');
const filasCursos = document.querySelector('.filas-cursos');

let dataCursos = {
  lastId: 0,
  cursos: [],
};

btnGuardarCursos.addEventListener('click', function () {
  if (Number(lblId.textContent)) return;
  dataCursos.lastId++;
  const curso = {
    id: dataCursos.lastId,
    establecimiento: txtEstablecimiento.value,
    curso: txtCurso.value,
  };
  console.log(curso);
  dataCursos.cursos.push(curso);
  console.log(dataCursos);
  localStorage.setItem('dataCursos', JSON.stringify(dataCursos));
  limpiarFormCursos();
  cargaCursos();
});

filasCursos.addEventListener('click', function (evt) {
  console.dir(evt.target.classList.contains('close'));
  const fila = evt.target.closest('tr');
  const id = Number(fila.dataCursosset.id);
  if (evt.target.classList.contains('close')) {
    let curso = dataCursos.cursos.find(function (cur) {
      return cur.id === id;
    });
    const posicion = dataCursos.cursos.indexOf(curso);
    dataCursos.cursos.splice(posicion, 1);
    localStorage.setItem('dataCursos', JSON.stringify(dataCursos));
    cargaCursos();
  } else {
    lblId.textContent = fila.dataset.id;
    txtEstablecimiento.value = fila.querySelector(
      '.celda-establecimiento'
    ).textContent;
    txtCurso.value = fila.querySelector('.celda-curso').textContent;
    txtEstablecimiento.focus();
  }
});

// btnActualizarCursos.addEventListener('click', function () {
//   const id = Number(lblId.textContent);
//   if (!id) return;
//   let alumno = dataCursos.alumnos.find(function (alu) {
//     return alu.id === id;
//   });
//   if (alumno) {
//     alumno.email = txtEmail.value;
//     alumno.apellido = txtApellido.value;
//     alumno.nombre = txtNombre.value;
//     localStorage.setItem('dataCursos', JSON.stringify(dataCursos));
//     cargaAlumnos();
//   }
// });

btnLimpiarCursos.addEventListener('click', function () {
  limpiarFormCursos();
});
const limpiarFormCursos = function () {
  formCursos.reset();
  txtEstablecimiento.focus();
  lblId.textContent = '';
};

window.addEventListener('load', function () {
  if (localStorage.getItem('dataCursos')) {
    dataCursos = JSON.parse(localStorage.getItem('dataCursos'));
  } else {
    localStorage.setItem('dataCursos', JSON.stringify(dataCursos));
  }
  cargaCursos();
});
const cargaCursos = function () {
  let html = dataCursos.cursos.map(function (curso) {
    return `<tr dataCursos-id="${curso.id}">
          <td class="celda-establecimiento">${curso.establecimiento}</td>
          <td class="celda-curso">${curso.curso}</td>
          <th><button class="close">&times;</button></th>
        </tr>`;
  });
  html = html.join('\n');
  filasCursos.innerHTML = html;
};
