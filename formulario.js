const formulario = document.querySelector("form");
const Nombres = document.getElementById("reg-nombres");
const Apellidos = document.getElementById("reg-apellidos");
const TipoDoc = document.getElementById("tipo-doc");
const NumDoc = document.getElementById("num-doc");
const Grado = document.getElementById("grado");
const Correo = document.getElementById("reg-correo");
const Contrasena = document.getElementById("reg-contrasena");

let editIndex = null;

// Evento del formulario
formulario.addEventListener("submit", function(evento){
    evento.preventDefault();

    // Obtener valores del formulario
    let nombres = Nombres.value;
    let apellidos = Apellidos.value;
    let tipoDoc = TipoDoc.value;
    let numDoc = NumDoc.value;
    let grado = Grado.value;
    let correo = Correo.value;
    let contrasena = Contrasena.value;

    // Obtener lista actual
    let listaEstudiantes = JSON.parse(localStorage.getItem("estudiantesSanAntonio")) || [];

    // Validar que la cédula no esté repetida
    let existe = listaEstudiantes.some(function(
        est,
        i
    ) {
        return est.documento === numDoc && i !== editIndex;
    });

    if (existe) {
        alert("Ya existe un estudiante con ese número de documento");
        return;
    }

    if(editIndex !== null) {
        // Actualizar estudiante existente
        listaEstudiantes[editIndex] = {
            nombres,
            apellidos,
            tipoDocumento: tipoDoc,
            documento: numDoc,
            grado,
            correo,
            contrasena
        };
        alert("Actualizado!");
        editIndex = null;
    } else {
        // Crear nuevo estudiante
        let nuevoEstudiante = {
            nombres,
            apellidos,
            tipoDocumento: tipoDoc,
            documento: numDoc,
            grado,
            correo,
            contrasena
        };
        listaEstudiantes.push(nuevoEstudiante);
        alert("Estudiante Registrado!");
    }

    // Guardar lista en localStorage
    localStorage.setItem("estudiantesSanAntonio", JSON.stringify(listaEstudiantes));

    // Resetear formulario y refrescar tabla
    formulario.reset();
    mostrarEstudiantes();
});

// Función para mostrar estudiantes en la tabla
function mostrarEstudiantes() {
    let listaEstudiantes = JSON.parse(localStorage.getItem("estudiantesSanAntonio")) || [];
    let cuerpoTabla = document.querySelector("#tabla-estudiantes tbody");
    cuerpoTabla.innerHTML = "";

    if(listaEstudiantes.length === 0){
        document.getElementById("contenedor-tabla").style.display = "none";
    } else {
        document.getElementById("contenedor-tabla").style.display = "block";
        listaEstudiantes.forEach((est, i) => {
            let fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${est.nombres}</td>
                <td>${est.apellidos}</td>
                <td>${est.documento}</td>
                <td>${est.grado}</td>
                <td>${est.correo}</td>
                <td>
                    <button onclick="editar(${i})">Editar</button> |
                    <button onclick="eliminar(${i})">Eliminar</button>
                </td>
            `;
            cuerpoTabla.appendChild(fila);
        });
    }
}

// Función para editar estudiante
function editar(Editar) {
    let listaEstudiantes = JSON.parse(localStorage.getItem("estudiantesSanAntonio")) || [];
    let est = listaEstudiantes[Editar];

    Nombres.value = est.nombres;
    Apellidos.value = est.apellidos;
    TipoDoc.value = est.tipoDocumento;
    NumDoc.value = est.documento;
    Grado.value = est.grado;
    Correo.value = est.correo;
    Contrasena.value = est.contrasena;

    editIndex = Editar; // guardamos el índice
}

// Función para eliminar estudiante
function eliminar(Eliminar) {
    let listaEstudiantes = JSON.parse(localStorage.getItem("estudiantesSanAntonio")) || [];
    listaEstudiantes.splice(Eliminar, 1);
    localStorage.setItem("estudiantesSanAntonio", JSON.stringify(listaEstudiantes));
    mostrarEstudiantes();
}

// Mostrar estudiantes al cargar la página
document.addEventListener("DOMContentLoaded", mostrarEstudiantes);



