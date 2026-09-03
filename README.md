# Sistema de Inicio de sesión en JavaScript

Un script simple en JavaScript que ejecuta un proceso de inicio de sesión seguro, por el cual se solicitan las credenciales al usuario, y se comprueban los datos mediante condicionales,
y restringe el acceso tras superar el límite de intentos fallidos que para el ejercicio serían 3.

## Características

* **Validación de credenciales:** Aquí se verifica de forma estricta que el usuario y la contraseña coincidan con los datos del sistema posee.
* **Control de intentos:** Se agrega un bucle `while` que permite realizar un máximo de 3 intentos.
* **Alertas de seguridad:** Muestra alertas y mensajes en el navegador informando el bloqueo de la cuenta si se fallan todos los intentos.

## Tecnologías utilizadas

* **JavaScript (ES6+)**
* Métodos del navegador: `prompt()` y `alert()` para la interacción con el usuario.

## Estructuración del Código

El script está dividido de forma modular en tres funciones principales:

1. **`iniciarSesion()`**: Solicita los datos en pantalla a través de ventanas emergentes y retorna un objeto con el usuario y contraseña.
2. **`verificarCredenciales(usuario, contrasena)`**: Evalúa si los datos ingresados corresponden al administrador (`admin` / `12345`).
3. **`controlarAcceso()`**: Gestiona el flujo del ciclo, lleva el conteo de los intentos fallidos y determina si se concede el acceso o se bloquea la cuenta.

## Pasos para ejecutarlo

1. Copia el código del script en el archivo principal de tu proyecto (por ejemplo, `app.js`).
2. Vincúlalo a un archivo HTML básico:
   ```html
   <script src="app.js"></script>
   ```
3. Abre el archivo HTML en tu navegador web.
4. Abre la **Consola de Desarrollador (F12)** para ver el registro detallado de las acciones e intentos.

## Autores

María Fernanda Montoya Restrepo
Seleny Meza Suaréz
Dahiana Zapata Tabares
Cristian Polo Gutiérrez
