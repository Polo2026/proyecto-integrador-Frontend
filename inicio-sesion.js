const usuarios = [
    { usuario: "admin", correo: "admin@colegio.com", contrasena: "12345" }
];


const formLogin = document.querySelector("#formLogin");
const inputUsuario = document.querySelector("#usuario");
const inputContrasena = document.querySelector("#contrasena");
const mensajeLogin = document.querySelector("#mensajeLogin");
const botonIngresar = document.querySelector(".btn-ingresar");


const MAX_INTENTOS = 3;
let intentos = Number(sessionStorage.getItem("intentos")) || 0;


const bloquearFormulario = () => {
    mensajeLogin.textContent = "Superó los intentos permitidos. Acceso bloqueado.";
    mensajeLogin.className = "mensaje-login error";

    inputUsuario.disabled = true;
    inputContrasena.disabled = true;
    botonIngresar.disabled = true;
};


if (intentos >= MAX_INTENTOS) {
    bloquearFormulario();
}


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


formLogin.addEventListener("submit", (evento) => {
    evento.preventDefault();

   
    if (intentos >= MAX_INTENTOS) {
        bloquearFormulario();
        return;
    }

    const usuario = verificarCredenciales(inputUsuario.value, inputContrasena.value);

    if (usuario !== null) {
        
        intentos = 0;
        sessionStorage.removeItem("intentos");

        mensajeLogin.textContent = `¡Bienvenid@, ${usuario.usuario}!`;
        mensajeLogin.className = "mensaje-login exito";

        sessionStorage.setItem("nombreUsuario", usuario.usuario);

        setTimeout(() => {
            window.location.href = "portal-admin.html";
        }, 1000);
    } else {
        
        intentos++;
        sessionStorage.setItem("intentos", intentos);

        if (intentos >= MAX_INTENTOS) {
            bloquearFormulario();
        } else {
            const restantes = MAX_INTENTOS - intentos;
            mensajeLogin.textContent = `Usuario o contraseña incorrectos. Te quedan ${restantes} intento(s).`;
            mensajeLogin.className = "mensaje-login error";
        }
    }
});