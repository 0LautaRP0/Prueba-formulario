const alumnosContainer = document.querySelector('alumnos-container');
const formContainerAlumnos = document.querySelector('.form-container-alumnos');
const lblId = document.querySelector('.lbl-id');
const formAlumnos = document.querySelector('.form-alumnos');
const txtEmail = document.getElementById('txt-email');
const txtApellido = document.getElementById('txt-apellido');
const txtNombre = document.getElementById('txt-nombre');
const btnGuardarAlumnos = document.querySelector('.btn-guardar-alumnos');
const btnActualizarAlumnos = document.querySelector('.btn-actualizar-alumnos');
const btnLimpiarAlumnos = document.querySelector('.btn-limpiar-alumnos');
const listaAlumnos = document.querySelector('.lista-alumnos');
const filasAlumnos = document.querySelector('.filas-alumnos');

let dataAlumnos = {
  lastId: 0,
  alumnos: [],
};

btnGuardarAlumnos.addEventListener('click', function () {
  if (Number(lblId.textContent)) return;
  dataAlumnos.lastId++;
  const alumno = {
    id: dataAlumnos.lastId,
    email: txtEmail.value,
    nombre: txtNombre.value,
    apellido: txtApellido.value,
  };
  dataAlumnos.alumnos.push(alumno);
  console.log(dataAlumnos);
  localStorage.setItem('dataAlumnos', JSON.stringify(dataAlumnos));
  limpiarFormAlumnos();
  cargaAlumnos();
});
filasAlumnos.addEventListener('click', function (evt) {
  console.dir(evt.target.classList.contains('close'));
  const fila = evt.target.closest('tr');
  const id = Number(fila.dataset.id);
  if (evt.target.classList.contains('close')) {
    let alumno = dataAlumnos.alumnos.find(function (alu) {
      return alu.id === id;
    });
    const posicion = dataAlumnos.alumnos.indexOf(alumno);
    dataAlumnos.alumnos.splice(posicion, 1);
    localStorage.setItem('dataAlumnos', JSON.stringify(dataAlumnos));
    cargaAlumnos();
  } else {
    lblId.textContent = fila.dataAlumnosset.id;
    txtEmail.value = fila.querySelector('.celda-email').textContent;
    txtApellido.value = fila.querySelector('.celda-apellido').textContent;
    txtNombre.value = fila.querySelector('.celda-nombre').textContent;
    txtEmail.focus();
  }
});
btnActualizarAlumnos.addEventListener('click', function () {
  const id = Number(lblId.textContent);
  if (!id) return;
  let alumno = dataAlumnos.alumnos.find(function (alu) {
    return alu.id === id;
  });
  if (alumno) {
    alumno.email = txtEmail.value;
    alumno.apellido = txtApellido.value;
    alumno.nombre = txtNombre.value;
    localStorage.setItem('dataAlumnos', JSON.stringify(dataAlumnos));
    cargaAlumnos();
  }
});
btnLimpiarAlumnos.addEventListener('click', function () {
  limpiarFormAlumnos();
});
const limpiarFormAlumnos = function () {
  formAlumnos.reset();
  txtEmail.focus();
  lblId.textContent = '';
};
window.addEventListener('load', function () {
  if (localStorage.getItem('dataAlumnos')) {
    dataAlumnos = JSON.parse(localStorage.getItem('dataAlumnos'));
  } else {
    localStorage.setItem('dataAlumnos', JSON.stringify(dataAlumnos));
  }
  cargaAlumnos();
});

const cargaAlumnos = function () {
  let html = dataAlumnos.alumnos.map(function (alumno) {
    return `<tr dataAlumnos-id="${alumno.id}">
          <td class="celda-email">${alumno.email}</td>
          <td class="celda-apellido">${alumno.apellido}</td>
          <td class="celda-nombre">${alumno.nombre}</td>
          <th><button class="close">&times;</button></th>
        </tr>`;
  });
  html = html.join('\n');
  filasAlumnos.innerHTML = html;
};
