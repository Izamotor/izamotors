// Función para mostrar el formulario seleccionado
function mostrarFormulario(id) {
  // Ocultar todos los formularios
  document.querySelectorAll(".formulario").forEach((form) => {
    form.classList.remove("active");
  });

  // Mostrar solo el formulario seleccionado
  document.getElementById(id).classList.add("active");
}

// Función para actualizar los modelos según la marca seleccionada
function actualizarModelos() {
  const marca = document.getElementById("marca").value;
  const modeloSelect = document.getElementById("modelo");

  // Limpia las opciones existentes en el select de modelos
  modeloSelect.innerHTML = "";

  // Define los modelos según la marca seleccionada
  let modelos;
  switch (marca) {
    case "Toyota":
      modelos = ["Corolla", "Camry", "RAV4", "Highlander"];
      break;
    case "Mitsubishi":
      modelos = ["Lancer", "Outlander", "Pajero", "Eclipse"];
      break;
    case "Chevrolet":
      modelos = ["Spark", "Malibu", "Impala", "Tahoe"];
      break;
    case "Hyundai":
      modelos = ["Elantra", "Sonata", "Tucson", "Santa Fe"];
      break;
    case "DFSK":
      modelos = ["Fengon", "C31", "C35", "V21"];
      break;
    // Agrega más casos según las marcas disponibles
    default:
      modelos = [];
  }

  // Agrega las nuevas opciones al select de modelos
  modelos.forEach(function (modelo) {
    const option = document.createElement("option");
    option.value = modelo;
    option.text = modelo;
    modeloSelect.add(option);
  });
}

async function generatePDFInventario() {
  event.preventDefault(); // Evita que el formulario se envíe

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a3",
  });
  let y = 10; // Coordenada Y inicial
  // URL de la imagen alojada en Imgur
  const imgURL =
    "https://raw.githubusercontent.com/Izamotor/izamotors/refs/heads/main/izamotor.png"; // Reemplaza con la URL real

  // Función para convertir imagen a Base64
  async function getBase64Image(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  // Agregar imagen al PDF
  const imgBase64 = await getBase64Image(imgURL);
  doc.addImage(imgBase64, "PNG", 10, 5, 60, 20); // Ajusta la posición y tamaño del logo

  // Agregar texto a la derecha
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Importador Directo", 280, 10, { align: "right" });
  doc.setFontSize(10);
  doc.text("Mecánica en General", 280, 15, { align: "right" });
  doc.text("Venta de Repuestos", 280, 20, { align: "right" });
  doc.text("Lima - Provincias", 280, 25, { align: "right" });

  // Línea separadora
  doc.setDrawColor(0);
  y += 20;
  doc.setLineWidth(0.5);
  doc.line(10, y, 280, y); // Línea horizontal

  y += 10; // Ajuste después de la línea

  // Título del documento
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);

  // Recoger los valores del formulario
  const fecha = document.getElementById("fecha").value;
  const numeroFolio = document.getElementById("numero_folio").value;
  const clienteNombre = document.getElementById("cliente_nombre").value;
  const clienteTelefono = document.getElementById("cliente_telefono").value;
  const clienteEmail = document.getElementById("cliente_email").value;
  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const color = document.getElementById("color").value;
  const anio = document.getElementById("año").value;
  const placa = document.getElementById("placa").value;
  const kilometraje = document.getElementById("kilometraje").value;
  const trabajoRealizar = document.getElementById("trabajo_realizar").value;

  // Recoger los checkboxes seleccionados
  const inventario = [];
  document
    .querySelectorAll('input[type="checkbox"]:checked')
    .forEach((checkbox) => {
      inventario.push(checkbox.parentElement.textContent.trim());
    });

  // Recoger daños preexistentes
  const ladoDerecho = document.getElementById("lado_derecho").value;
  const frente = document.getElementById("frente").value;
  const detras = document.getElementById("detras").value;
  const ladoIzquierdo = document.getElementById("lado_izquierdo").value;
  const observaciones = document.getElementById(
    "observaciones_adicionales"
  ).value;

  const tecnico = document.getElementById("tecnico").value;
  const administrador = document.getElementById("administrador").value;
  const observacionesChecklist = document.getElementById(
    "observaciones-checklist"
  ).value;

  // Obtener la tabla
  const table = document.querySelector("table");
  const rows = table.querySelectorAll("tr");
  // Extraer datos de la tabla
  /*const data = [];
  rows.forEach((row, rowIndex) => {
    const cells = row.querySelectorAll("td, th");
    const rowData = [];
    cells.forEach((cell, cellIndex) => {
      if (cell.querySelector("input[type='checkbox']")) {
        rowData.push(cell.querySelector("input").checked ? "✓" : "✗");
      } else {
        rowData.push(cell.textContent.trim());
      }
    });
    data.push(rowData);
    if(rowData.length > 0){
        data.push(rowData)
    }
  });
*/

  const data = [];
  rows.forEach((row, rowIndex) => {
    const cells = row.querySelectorAll("td, th");
    console.log("cells", cells);

    const rowData = [];

    cells.forEach((cell, index) => {
      const checkboxes = cell.querySelectorAll("input[type='checkbox']");
      let checkedValues = "";
      if (index < 3) {
        checkedValues = cells[index]?.innerText;
      } else {
        checkboxes.forEach((checkbox) => {
          checkedValues = [checkbox.checked ? "X" : ""];
        });
      }

      rowData.push(checkedValues);
    });

    console.log("CELDAS", rowData); // Mostrar los checkboxes
    data.push(rowData);
  });
  console.log("TODOOOO", data); // Mostrar los checkboxes

  // Dibujar la tabla en el PDF

  // Formatear el PDF
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Orden de Servicio - Inventario", 10, y);
  y += 10;

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Fecha: ${fecha}`, 10, y);
  y += 10;
  doc.text(`Número de Folio: ${numeroFolio}`, 10, y);
  y += 10;

  doc.setFont("helvetica", "bold");
  doc.text("Datos del Cliente", 10, y);
  y += 10;
  doc.setFont("helvetica", "normal");
  doc.text(`Nombre: ${clienteNombre}`, 10, y);
  y += 10;
  doc.text(`Teléfono: ${clienteTelefono}`, 10, y);
  y += 10;
  doc.text(`Email: ${clienteEmail}`, 10, y);
  y += 10;

  doc.setFont("helvetica", "bold");
  doc.text("Datos del Vehículo", 10, y);
  y += 10;
  doc.setFont("helvetica", "normal");
  doc.text(`Marca: ${marca}`, 10, y);
  y += 10;
  doc.text(`Modelo: ${modelo}`, 10, y);
  y += 10;
  doc.text(`Año: ${anio}`, 10, y);
  y += 10;
  doc.text(`Color: ${color}`, 10, y);
  y += 10;
  doc.text(`Placa: ${placa}`, 10, y);
  y += 10;
  doc.text(`Kilometraje: ${kilometraje}`, 10, y);
  y += 10;

  doc.setFont("helvetica", "bold");
  doc.text("Trabajo a Realizar", 10, y);
  y += 10;
  doc.setFont("helvetica", "normal");
  doc.text(trabajoRealizar, 10, y, { maxWidth: 180 });
  y += 20;

  doc.setFont("helvetica", "bold");
  doc.text("Inventario", 10, y);
  y += 10;
  doc.setFont("helvetica", "normal");
  doc.text(inventario.length > 0 ? inventario.join(", ") : "Ninguno", 10, y, {
    maxWidth: 180,
  });
  y += 20;

  doc.setFont("helvetica", "bold");
  doc.text("Daños Preexistentes", 10, y);
  y += 10;
  doc.setFont("helvetica", "normal");
  doc.text(`Lado Derecho: ${ladoDerecho}`, 10, y, { maxWidth: 180 });
  y += 10;
  doc.text(`Frente: ${frente}`, 10, y, { maxWidth: 180 });
  y += 10;
  doc.text(`Detrás: ${detras}`, 10, y, { maxWidth: 180 });
  y += 10;
  doc.text(`Lado Izquierdo: ${ladoIzquierdo}`, 10, y, { maxWidth: 180 });
  y += 20;

  doc.setFont("helvetica", "bold");
  doc.text("Observaciones Adicionales", 10, y);
  y += 10;
  doc.setFont("helvetica", "normal");
  doc.text(observaciones, 10, y, { maxWidth: 180 });
  y += 20;

  doc.setFont("helvetica", "bold");
  doc.text("Checklist del Vehículo", 10, y);
  y += 10;

  console.log("ANTES DE HEAD", [data[0]]);
  console.log("ANTES DE IMPRIMIR", data.slice(1));
  doc.autoTable({
    head: [["Item", "Sistema", "Tarea", "B", "M", "R", "C"]], // Primera fila como encabezado
    body: data.slice(1), // Resto de filas como contenido
    startY: y,
    theme: "grid",
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] },
    columnStyles: {
      0: { cellWidth: 10 },
      1: { cellWidth: 40 },
      2: { cellWidth: 50 },
    },
  });

  doc.setFont("helvetica", "bold");
  y += 40;
  doc.text(`Observaciones del checklist: ${observacionesChecklist}`, 10, y, {
    maxWidth: 180,
  });
  y += 10;
  doc.setFont("helvetica", "bold");
  doc.text("Firmas", 10, y);
  y += 10;
  doc.setFont("helvetica", "normal");
  doc.text(`Técnico: ${tecnico}`, 10, y);
  y += 10;
  doc.text(`Administrador: ${administrador}`, 10, y);
  y += 10;
  // Descargar el PDF
  doc.save(`Orden_Servicio_${numeroFolio}.pdf`);
}

// Llama a la función para actualizar los modelos al cargar la página
window.onload = function () {
  actualizarModelos();
};
