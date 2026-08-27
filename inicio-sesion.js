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


//Utilizar un ciclo para controlar los intentos de acceso.


//Mostrar un mensaje de bloqueo cuando se superen tres intentos fallidos



//Hola Mundo



//Hola soy Seleny

