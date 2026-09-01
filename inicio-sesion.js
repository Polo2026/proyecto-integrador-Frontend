//Solicitar al usuario el ingreso del nombre de usuario y la contraseña.
function iniciarSesion() {
  let usuario = "Maria ";
  let contrasena = " 123";

  console.log("Ingrese su nombre: " + usuario);
  console.log("Ingrese su contrasena: " + contrasena);
}

iniciarSesion();


//Leer e imprimir los datos por consola.


//Verificar mediante condicionales si las credenciales son correctas.
function verificarCredenciales(usuario, contraseña) {

    const usuarioCorrecto = "admin";
    const contraseñaCorrecta = "12345";

    if (usuario === usuarioCorrecto && contraseña === contraseñaCorrecta) {
    
        console.log("Credenciales correctas. Acceso permitido.");
        return true;
    } else {
        console.log("Usuario o contraseña incorrectos.");
        return false;
    }
}


//Permitir el acceso cuando los datos sean válidos.


//Indicar cuando los datos sean incorrectos.


//4Utilizar un ciclo para controlar los intentos de acceso.
//5Mostrar un mensaje de bloqueo cuando se superen tres intentos fallidos

function controlarAcceso() {
  const maxIntentos = 3;
  let intentos = 0;
  let acceso = false;

  while (intentos < maxIntentos && !acceso) {
    // Aquí simulas el ingreso de datos (podrías usar prompt() en un navegador)
    let usuarioIngresado = prompt("Ingrese su usuario:");
    let contrasenaIngresada = prompt("Ingrese su contraseña:");

    acceso = verificarCredenciales(usuarioIngresado, contrasenaIngresada);

    if (!acceso) {
      intentos++;
      console.log(`Intento ${intentos} de ${maxIntentos} fallido.`);
    }
  }

  if (acceso) {
    console.log("¡Bienvenido! Acceso concedido.");
  } else {
    console.log("Ha superado el número máximo de intentos. Cuenta bloqueada.");
  }
}

controlarAcceso();



