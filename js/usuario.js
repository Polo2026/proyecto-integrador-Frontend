const CLAVE_USUARIOS = "usuarios";                 // admin y docentes
const CLAVE_ESTUDIANTES = "estudiantesSanAntonio"; // estudiantes (CRUD)

async function inicializarUsuarios() {
    try {
        const respuesta = await fetch("usuario.json");

        if (!respuesta.ok) {
            throw new Error("HTTP " + respuesta.status);
        }

        const datos = await respuesta.json();

        if (!Array.isArray(datos)) {
            throw new Error("El archivo debe contener un arreglo.");
        }

        if (localStorage.getItem(CLAVE_USUARIOS) === null) {
            const personal = datos.filter((u) => u.rol !== "estudiante");
            localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(personal));
        }

        if (localStorage.getItem(CLAVE_ESTUDIANTES) === null) {
            const estudiantes = datos
                .filter((u) => u.rol === "estudiante")
                .map((u) => ({
                    usuario: u.usuario,
                    nombres: u.nombres,
                    apellidos: u.apellidos,
                    tipoDocumento: u.tipoDocumento,
                    documento: u.documento,
                    grado: u.grado,
                    correo: u.correo,
                    contrasena: u.contrasena
                }));
            localStorage.setItem(CLAVE_ESTUDIANTES, JSON.stringify(estudiantes));
        }

        console.log("Datos iniciales cargados desde usuario.json");
    } catch (error) {
        console.error("No se pudo cargar usuario.json:", error);
    }
}

// Promesa que las otras páginas esperan con: await usuariosListos
const usuariosListos = inicializarUsuarios();
