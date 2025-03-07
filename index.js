// Función para mostrar el formulario seleccionado
function mostrarFormulario(id) {
    // Ocultar todos los formularios
    document.querySelectorAll('.formulario').forEach(form => {
        form.classList.remove('active');
    });

    // Mostrar solo el formulario seleccionado
    document.getElementById(id).classList.add('active');
}

// Función para actualizar los modelos según la marca seleccionada
function actualizarModelos() {
    const marca = document.getElementById("marca").value;
    const modeloSelect = document.getElementById("modelo");

    // Limpia las opciones existentes en el select de modelos
    modeloSelect.innerHTML = "";

    // Define los modelos según la marca seleccionada
    let modelos;
    switch(marca) {
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
    modelos.forEach(function(modelo) {
        const option = document.createElement("option");
        option.value = modelo;
        option.text = modelo;
        modeloSelect.add(option);
    });
}
function generatePDFInventario2() {
    event.preventDefault(); // Evita que el formulario se envíe

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Recoger los valores del formulario
    let numeroFolio = document.getElementById("numero_folio").value;
    let clienteNombre = document.getElementById("cliente_nombre").value;
    let clienteTelefono = document.getElementById("cliente_telefono").value;
    let clienteEmail = document.getElementById("cliente_email").value;
    let marca = document.getElementById("marca").value;
    let modelo = document.getElementById("modelo").value;
    let color = document.getElementById("color").value;
    let placas = document.getElementById("placas").value;
    let trabajoRealizar = document.getElementById("trabajo_realizar").value;
    
    // Recoger los checkboxes seleccionados
    let inventario = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        inventario.push(checkbox.name);
    });

    // Recoger daños preexistentes
    let ladoDerecho = document.getElementById("lado_derecho").value;
    let frente = document.getElementById("frente").value;
    let detras = document.getElementById("detras").value;
    let ladoIzquierdo = document.getElementById("lado_izquierdo").value;
    
    let observaciones = document.getElementById("observaciones_adicionales").value;

    // Agregar contenido al PDF
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Orden de Servicio - Inventario", 10, 10);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Número de Folio: ${numeroFolio}`, 10, 20);
    
    doc.setFont("helvetica", "bold");
    doc.text("Datos del Cliente", 10, 30);
    doc.setFont("helvetica", "normal");
    doc.text(`Nombre: ${clienteNombre}`, 10, 40);
    doc.text(`Teléfono: ${clienteTelefono}`, 10, 50);
    doc.text(`Email: ${clienteEmail}`, 10, 60);
    
    doc.setFont("helvetica", "bold");
    doc.text("Datos del Vehículo", 10, 70);
    doc.setFont("helvetica", "normal");
    doc.text(`Marca: ${marca}`, 10, 80);
    doc.text(`Modelo: ${modelo}`, 10, 90);
    doc.text(`Color: ${color}`, 10, 100);
    doc.text(`Placas: ${placas}`, 10, 110);
    
    doc.setFont("helvetica", "bold");
    doc.text("Trabajo a Realizar", 10, 120);
    doc.setFont("helvetica", "normal");
    doc.text(trabajoRealizar, 10, 130, { maxWidth: 180 });

    doc.setFont("helvetica", "bold");
    doc.text("Inventario", 10, 150);
    doc.setFont("helvetica", "normal");
    doc.text(inventario.length > 0 ? inventario.join(", ") : "Ninguno", 10, 160, { maxWidth: 180 });

    doc.setFont("helvetica", "bold");
    doc.text("Daños Preexistentes", 10, 180);
    doc.setFont("helvetica", "normal");
    doc.text(`Lado Derecho: ${ladoDerecho}`, 10, 190, { maxWidth: 180 });
    doc.text(`Frente: ${frente}`, 10, 200, { maxWidth: 180 });
    doc.text(`Detrás: ${detras}`, 10, 210, { maxWidth: 180 });
    doc.text(`Lado Izquierdo: ${ladoIzquierdo}`, 10, 220, { maxWidth: 180 });

    doc.setFont("helvetica", "bold");
    doc.text("Observaciones Adicionales", 10, 240);
    doc.setFont("helvetica", "normal");
    doc.text(observaciones, 10, 250, { maxWidth: 180 });

    // Descargar el PDF
    doc.save(`Orden_Servicio_${numeroFolio}.pdf`);
}


function generatePDFInventario444() {
    event.preventDefault(); // Evita que el formulario se envíe

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

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
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        inventario.push(checkbox.parentElement.textContent.trim());
    });

    // Recoger daños preexistentes
    const ladoDerecho = document.getElementById("lado_derecho").value;
    const frente = document.getElementById("frente").value;
    const detras = document.getElementById("detras").value;
    const ladoIzquierdo = document.getElementById("lado_izquierdo").value;
    const observaciones = document.getElementById("observaciones_adicionales").value;

    const tecnico = document.getElementById("tecnico").value;
    const administrador = document.getElementById("administrador").value;
    const observacionesChecklist = document.getElementById("observaciones-checklist").value;
    // Formatear el PDF

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Orden de Servicio - Inventario", 10, 10);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Fecha: ${fecha}`, 10, 190);
    doc.text(`Número de Folio: ${numeroFolio}`, 10, 20);

    doc.setFont("helvetica", "bold");
    doc.text("Datos del Cliente", 10, 30);
    doc.setFont("helvetica", "normal");
    doc.text(`Nombre: ${clienteNombre}`, 10, 40);
    doc.text(`Teléfono: ${clienteTelefono}`, 10, 50);
    doc.text(`Email: ${clienteEmail}`, 10, 60);

    doc.setFont("helvetica", "bold");
    doc.text("Datos del Vehículo", 10, 70);
    doc.setFont("helvetica", "normal");
    doc.text(`Marca: ${marca}`, 10, 80);
    doc.text(`Modelo: ${modelo}`, 10, 90);
    doc.text(`Año: ${anio}`, 10, 90);
    doc.text(`Color: ${color}`, 10, 100);
    doc.text(`Placa: ${placa}`, 10, 110);
    doc.text(`Kilometraje: ${kilometraje}`, 10, 210);


    doc.setFont("helvetica", "bold");
    doc.text("Trabajo a Realizar", 10, 120);
    doc.setFont("helvetica", "normal");
    doc.text(trabajoRealizar, 10, 130, { maxWidth: 180 });

    doc.setFont("helvetica", "bold");
    doc.text("Inventario", 10, 150);
    doc.setFont("helvetica", "normal");
    doc.text(inventario.length > 0 ? inventario.join(", ") : "Ninguno", 10, 160, { maxWidth: 180 });

    doc.setFont("helvetica", "bold");
    doc.text("Daños Preexistentes", 10, 180);
    doc.setFont("helvetica", "normal");
    doc.text(`Lado Derecho: ${ladoDerecho}`, 10, 190, { maxWidth: 180 });
    doc.text(`Frente: ${frente}`, 10, 200, { maxWidth: 180 });
    doc.text(`Detrás: ${detras}`, 10, 210, { maxWidth: 180 });
    doc.text(`Lado Izquierdo: ${ladoIzquierdo}`, 10, 220, { maxWidth: 180 });

    doc.setFont("helvetica", "bold");
    doc.text("Observaciones Adicionales", 10, 240);
    doc.setFont("helvetica", "normal");
    doc.text(observaciones, 10, 250, { maxWidth: 180 });


    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Checklist del vehiculo", 10, 180);

    doc.setFont("helvetica", "normal");
    doc.text(`Observaciones: ${observacionesChecklist}`, 10, 230, { maxWidth: 180 });

    doc.setFont("helvetica", "bold");
    doc.text("Firmas", 10, 250);
    doc.setFont("helvetica", "normal");
    doc.text(`Técnico: ${tecnico}`, 10, 270);
    doc.text(`Administrador: ${administrador}`, 10, 280);



    // Descargar el PDF
    doc.save(`Orden_Servicio_${numeroFolio}.pdf`);
}


function generatePDFInventario() {
    event.preventDefault(); // Evita que el formulario se envíe

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: "p",
        unit:"mm",
        format: "a3"
    });
    let y = 10; // Coordenada Y inicial

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
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        inventario.push(checkbox.parentElement.textContent.trim());
    });

    // Recoger daños preexistentes
    const ladoDerecho = document.getElementById("lado_derecho").value;
    const frente = document.getElementById("frente").value;
    const detras = document.getElementById("detras").value;
    const ladoIzquierdo = document.getElementById("lado_izquierdo").value;
    const observaciones = document.getElementById("observaciones_adicionales").value;

    const tecnico = document.getElementById("tecnico").value;
    const administrador = document.getElementById("administrador").value;
    const observacionesChecklist = document.getElementById("observaciones-checklist").value;

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
    doc.text(inventario.length > 0 ? inventario.join(", ") : "Ninguno", 10, y, { maxWidth: 180 });
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
    doc.setFont("helvetica", "normal");
    doc.text(`Observaciones: ${observacionesChecklist}`, 10, y, { maxWidth: 180 });
    y += 20;

    doc.setFont("helvetica", "bold");
    doc.text("Firmas", 10, y);
    y += 10;
    doc.setFont("helvetica", "normal");
    doc.text(`Técnico: ${tecnico}`, 10, y);
    y += 10;
    doc.text(`Administrador: ${administrador}`, 10, y);

    // Descargar el PDF
    doc.save(`Orden_Servicio_${numeroFolio}.pdf`);
}

// Llama a la función para actualizar los modelos al cargar la página
window.onload = function() {
    actualizarModelos();
}

