// generador-cv.js
// Generador de CV Tratook utilizando dom-to-image y jsPDF
// ======================
// AGREGAR Y ELIMINAR CAMPOS DINÁMICAMENTE
// ======================
// Designed by: Daniel Torreblanca Alvarez

// Educación
const btnAgregarEducacion = document.getElementById('agregar-educacion');
const btnEliminarEducacion = document.getElementById('eliminar-educacion');
const contenedorEducacion = document.getElementById('educacion-container');

btnAgregarEducacion.addEventListener('click', () => {
  const nuevoNivel = document.createElement('input');
  nuevoNivel.type = 'text';
  nuevoNivel.name = 'nivel';
  nuevoNivel.placeholder = 'Nivel educativo';
  nuevoNivel.style.padding = '12px';
  nuevoNivel.style.border = '1px solid #ccc';
  nuevoNivel.style.borderRadius = '8px';
  
  const nuevaEscuela = document.createElement('input');
  nuevaEscuela.type = 'text';
  nuevaEscuela.name = 'escuela';
  nuevaEscuela.placeholder = 'Nombre de la escuela';
  nuevaEscuela.style.padding = '12px';
  nuevaEscuela.style.border = '1px solid #ccc';
  nuevaEscuela.style.borderRadius = '8px';

  contenedorEducacion.appendChild(nuevoNivel);
  contenedorEducacion.appendChild(nuevaEscuela);
});

btnEliminarEducacion.addEventListener('click', () => {
  const inputs = contenedorEducacion.querySelectorAll('input');
  if (inputs.length > 2) {
    contenedorEducacion.removeChild(inputs[inputs.length - 1]);
    contenedorEducacion.removeChild(inputs[inputs.length - 2]);
  } else {
    alert("No puedes eliminar los campos originales.");
  }
});

// Experiencia
const contenedorExperiencia = document.getElementById('experiencia-container');
const btnAgregarExperiencia = document.getElementById('agregar-experiencia');
const btnEliminarExperiencia = document.getElementById('eliminar-experiencia');
const btnAgregarResponsabilidad = document.getElementById('agregar-responsabilidad');
const btnEliminarResponsabilidad = document.getElementById('eliminar-responsabilidad');

btnAgregarExperiencia.addEventListener('click', () => {
  const nuevoPuesto = document.createElement('input');
  nuevoPuesto.type = 'text';
  nuevoPuesto.name = 'puesto';
  nuevoPuesto.placeholder = 'Puesto';
  nuevoPuesto.style.padding = '12px';
  nuevoPuesto.style.border = '1px solid #ccc';
  nuevoPuesto.style.borderRadius = '8px';

  const nuevaEmpresa = document.createElement('input');
  nuevaEmpresa.type = 'text';
  nuevaEmpresa.name = 'empresa';
  nuevaEmpresa.placeholder = 'Empresa';
  nuevaEmpresa.style.padding = '12px';
  nuevaEmpresa.style.border = '1px solid #ccc';
  nuevaEmpresa.style.borderRadius = '8px';

  const nuevaResponsabilidad = document.createElement('input');
  nuevaResponsabilidad.type = 'text';
  nuevaResponsabilidad.name = 'responsabilidad';
  nuevaResponsabilidad.placeholder = 'Responsabilidad';
  nuevaResponsabilidad.style.padding = '12px';
  nuevaResponsabilidad.style.border = '1px solid #ccc';
  nuevaResponsabilidad.style.borderRadius = '8px';

  contenedorExperiencia.appendChild(nuevoPuesto);
  contenedorExperiencia.appendChild(nuevaEmpresa);
  contenedorExperiencia.appendChild(nuevaResponsabilidad);
});

btnEliminarExperiencia.addEventListener('click', () => {
  const inputs = contenedorExperiencia.querySelectorAll('input');
  if (inputs.length > 3) {
    contenedorExperiencia.removeChild(inputs[inputs.length - 1]);
    contenedorExperiencia.removeChild(inputs[inputs.length - 2]);
    contenedorExperiencia.removeChild(inputs[inputs.length - 3]);
  } else {
    alert("No puedes eliminar la experiencia inicial.");
  }
});

btnAgregarResponsabilidad.addEventListener('click', () => {
  const nuevaResponsabilidad = document.createElement('input');
  nuevaResponsabilidad.type = 'text';
  nuevaResponsabilidad.name = 'responsabilidad';
  nuevaResponsabilidad.placeholder = 'Responsabilidad adicional';
  nuevaResponsabilidad.style.padding = '12px';
  nuevaResponsabilidad.style.border = '1px solid #ccc';
  nuevaResponsabilidad.style.borderRadius = '8px';

  contenedorExperiencia.appendChild(nuevaResponsabilidad);
});

btnEliminarResponsabilidad.addEventListener('click', () => {
  const responsabilidades = contenedorExperiencia.querySelectorAll('input[name="responsabilidad"]');
  if (responsabilidades.length > 1) {
    contenedorExperiencia.removeChild(responsabilidades[responsabilidades.length - 1]);
  } else {
    alert("Debes dejar al menos una responsabilidad.");
  }
});

// ======================
// FUNCIONES PRINCIPALES
// ======================

// Función para construir la vista previa
function mostrarVistaPrevia() {
  const form = document.getElementById("cv-form");

  const nombre = form.nombre.value;
  const correo = form.correo.value;
  const telefono = form.telefono.value;
  const direccion = form.direccion.value;
  const habilidades = form.habilidades.value;

  const puestos = form.querySelectorAll('input[name="puesto"]');
  const empresas = form.querySelectorAll('input[name="empresa"]');
  const responsabilidades = form.querySelectorAll('input[name="responsabilidad"]');
  const niveles = form.querySelectorAll('input[name="nivel"]');
  const escuelas = form.querySelectorAll('input[name="escuela"]');

  let experienciasHTML = "";
  let indexResponsabilidad = 0;

  for (let i = 0; i < puestos.length; i++) {
    if (puestos[i].value.trim() !== "" || empresas[i].value.trim() !== "") {
      experienciasHTML += `
        <p><strong>${puestos[i].value}</strong> - ${empresas[i].value}</p>
        <ul>
      `;

      if (responsabilidades[indexResponsabilidad]) {
        experienciasHTML += `<li>${responsabilidades[indexResponsabilidad].value}</li>`;
        indexResponsabilidad++;
      }

      while (indexResponsabilidad < responsabilidades.length && (!puestos[indexResponsabilidad] || puestos[indexResponsabilidad].value.trim() === "")) {
        experienciasHTML += `<li>${responsabilidades[indexResponsabilidad].value}</li>`;
        indexResponsabilidad++;
      }

      experienciasHTML += `</ul>`;
    }
  }

  let educacionHTML = "";
  for (let i = 0; i < niveles.length; i++) {
    if (niveles[i].value.trim() !== "" || escuelas[i].value.trim() !== "") {
      educacionHTML += `<p>${niveles[i].value} en ${escuelas[i].value}</p>`;
    }
  }

  const contenidoHTML = `
    <div id="cv-content" style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="border-bottom: 2px solid #0F4C81; padding-bottom: 8px;">${nombre}</h2>
      <p><strong>Correo:</strong> ${correo}</p>
      <p><strong>Teléfono:</strong> ${telefono}</p>
      <p><strong>Dirección:</strong> ${direccion}</p>
      <h3 style="margin-top: 24px;">Experiencia Laboral</h3>
      ${experienciasHTML}
      <h3>Educación</h3>
      ${educacionHTML}
      <h3>Habilidades</h3>
      <p>${habilidades}</p>
    </div>
  `;

  const modal = document.getElementById("cv-preview-modal");
  const contenido = document.getElementById("cv-preview-content");

  contenido.innerHTML = contenidoHTML;
  modal.style.display = "flex";
}

// Función para generar el PDF
function generarPDF() {
  const cvContent = document.getElementById("cv-content");

  if (!cvContent) {
    alert("Genera la vista previa primero.");
    return;
  }

  domtoimage.toPng(cvContent)
    .then(function (dataUrl) {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('CV-Tratook.pdf');
    })
    .catch(function (error) {
      console.error('Error al generar el PDF', error);
    });
}
