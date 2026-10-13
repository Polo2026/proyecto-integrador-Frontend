// Arreglo "quemado" de usuarios (solo para pruebas)
const usuarios = [
    {usuario: "admin", correo: "admin@colegio.com", contrasena: "12345" }
];

// Selectores del DOM
const formLogin = document.querySelector("#formLogin");
const inputUsuario = document.querySelector("#usuario");
const inputContrasena = document.querySelector("#contrasena");
const mensajeLogin = document.querySelector("#mensajeLogin");

// Reutiliza la lógica de la entrega 1
const verificarCredenciales = (identificador, contrasena) => {
    const buscado = identificador.trim().toLowerCase();
    for (let i = 0; i < usuarios.length; i++) {
        const u = usuarios[i];
        if ((u.usuario === buscado || u.correo === buscado) && u.contrasena === contrasena) {
            return u;
        }
    }
    return null;
};

// Evento del formulario
formLogin.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const usuario = verificarCredenciales(inputUsuario.value, inputContrasena.value);

    if (usuario !== null) {
        mensajeLogin.textContent = `¡Bienvenid@, ${usuario.usuario}!`;
        mensajeLogin.className = "mensaje-login exito";

        // Guarda quién inició sesión para que la otra página lo sepa
        sessionStorage.setItem("nombreUsuario", usuario.usuario);

        // Espera 1 segundo para que se alcance a leer el mensaje y cambia de página
        setTimeout(() => {
            window.location.href = "portal-admin.html";
        }, 1000);
    } else {
        mensajeLogin.textContent = "Usuario o contraseña incorrectos.";
        mensajeLogin.className = "mensaje-login error";
    }
});
