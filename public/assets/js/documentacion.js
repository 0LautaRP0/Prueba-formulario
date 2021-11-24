const documentacionContainer = document.querySelector(
  'documentacion-container'
);
const formContainerDocumentacion = document.querySelector(
  '.form-container-documentacion'
);
const formContainerCursos = document.querySelector('.form-container-cursos');
const formDocumentacion = document.querySelector('.form-documentacion');
const formCursos = document.querySelector('.form-cursos');
const txtDocumentoTipo = document.getElementById('txt-documento-tipo');
const txtDocumento = document.getElementById('txt-documento');
const btnGuardarDocumentacion = document.querySelector(
  '.btn-guardar-documentacion'
);
const btnActualizarDocumentacion = document.querySelector(
  '.btn-actualizar-documentacion'
);
const btnLimpiarDocumentacion = document.querySelector(
  '.btn-limpiar-documentacion'
);
const listaDocumentacion = document.querySelector('.lista-documentacion');
const filasDocumentacion = document.querySelector('.filas-documentacion');

let dataDocumentacion = {
  lastId: 0,
  documentos: [],
};

btnGuardarDocumentacion.addEventListener('click', function () {
  if (Number(lblId.textContent)) return;
  dataDocumentacion.lastId++;
  const documento = {
    id: dataDocumentacion.lastId,
    tipoDeDocumento: txtDocumentoTipo.value,
    documento: txtDocumento.value,
  };
  dataDocumentacion.documentos.push(documento);
  console.log(dataDocumentacion);
  localStorage.setItem('dataDocumentacion', JSON.stringify(dataDocumentacion));
  limpiarFormDocumentacion();
  cargaDocumentacion();
});
filasDocumentacion.addEventListener('click', function (evt) {
  console.dir(evt.target.classList.contains('close'));
  const fila = evt.target.closest('tr');
  const id = Number(fila.dataset.id);
  if (evt.target.classList.contains('close')) {
    let documento = dataDocumentacion.documentos.find(function (docu) {
      return docu.id === id;
    });
    const posicion = dataDocumentacion.documentos.indexOf(documento);
    dataDocumentacion.documentos.splice(posicion, 1);
    localStorage.setItem(
      'dataDocumentacion',
      JSON.stringify(dataDocumentacion)
    );
    cargaDocumentacion();
  } else {
    lblId.textContent = fila.dataDocumentacionset.id;
    txtDocumentoTipo.value = fila.querySelector(
      '.celda-documento-tipo'
    ).textContent;
    txtDocumento.value = fila.querySelector('.celda-documento').textContent;
    txtDocumentoTipo.focus();
  }
});
btnActualizarDocumentacion.addEventListener('click', function () {
  const id = Number(lblId.textContent);
  if (!id) return;
  let documentacion = dataDocumentacion.documentos.find(function (docu) {
    return docu.id === id;
  });
  if (documentacion) {
    documentacion.documentoTipo = txtEmail.value;
    documentacion.documento = txtApellido.value;
    localStorage.setItem(
      'dataDocumentacion',
      JSON.stringify(dataDocumentacion)
    );
    cargaDocumentacion();
  }
});
btnLimpiarDocumentacion.addEventListener('click', function () {
  limpiarFormDocumentacion();
});
const limpiarFormDocumentacion = function () {
  formDocumentacion.reset();
  txtDocumentoTipo.focus();
  lblId.textContent = '';
};
window.addEventListener('load', function () {
  if (localStorage.getItem('dataDocumentacion')) {
    dataDocumentacion = JSON.parse(localStorage.getItem('dataDocumentacion'));
  } else {
    localStorage.setItem(
      'dataDocumentacion',
      JSON.stringify(dataDocumentacion)
    );
  }
  cargaDocumentacion();
});
const cargaDocumentacion = function () {
  let html = dataDocumentacion.documentos.map(function (documentacion) {
    return `<tr dataDocumentacion-id="${documentacion.id}">
            <td class="celda-documento-tipo">${documentacion.tipoDeDocumento}</td>
            <td class="celda-documento">${documentacion.documento}</td>
            <th><button class="close">&times;</button></th>
          </tr>`;
  });
  html = html.join('\n');
  filasDocumentacion.innerHTML = html;
};
