
//Sistema de Inicio de Sesión 
//Solicitar al usuario el ingreso del nombre de usuario y la contraseña,
// leerlos e imprimirlos por consola.
function iniciarSesion() {
    let usuario = prompt("Ingrese su nombre:");
    let contrasena = prompt("Ingrese su contraseña:");

    console.log("Ingreso su nombre: " + usuario);
    console.log("Ingreso su contraseña: " + contrasena);

    return { usuario, contrasena };
}

// Verificar mediante condicionales si las credenciales son correctas.
function verificarCredenciales(usuario, contrasena) {
    const usuarioCorrecto = "admin";
    const contrasenaCorrecta = "12345";

    if (usuario === usuarioCorrecto && contrasena === contrasenaCorrecta) {
        console.log("Credenciales correctas. Acceso permitido.");
        console.log("Bienvenido, " + usuario + "!"); // Permitir el acceso cuando los datos sean válidos.
        return true;
    } else {
        console.log("Usuario o contraseña incorrectos."); // Indicar cuando los datos sean incorrectos.
        alert("Usuario o contraseña incorrectos.");
        return false;
    }
}

// Utilizar un ciclo para controlar los intentos de acceso.
// Mostrar un mensaje de bloqueo cuando se superen tres intentos fallidos.
function controlarAcceso() {
    const maxIntentos = 3;
    let intentos = 0;
    let acceso = false;

    while (intentos < maxIntentos && !acceso) {
        // Reutilizamos iniciarSesion() para pedir los datos en cada intento.
        const { usuario, contrasena } = iniciarSesion();

        acceso = verificarCredenciales(usuario, contrasena);

        if (!acceso) {
            intentos++;
            console.log(`Intento ${intentos} de ${maxIntentos} fallido.`);
            alert(`Intento ${intentos} de ${maxIntentos} fallido.`);
        }
    }

    if (acceso) {
        console.log("¡Bienvenido! Acceso concedido.");
        alert("¡Bienvenido! Acceso concedido.");
    } else {
        console.log("Ha superado el número máximo de intentos. Cuenta bloqueada.");
        alert("Ha superado el número máximo de intentos. Cuenta bloqueada.");
    }
}

controlarAcceso();
