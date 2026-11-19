

# 🏫 Institución Educativa San Antonio — Sitio Web (Proyecto Integrador Frontend)

Sitio web institucional para la **I.E. San Antonio de Rionegro, Antioquia**. Incluye una página de inicio con información del colegio, un sistema de inicio de sesión con control de intentos y módulos de registro y gestión de estudiantes, administración académica y consulta de información.

El proyecto cuenta con diferentes portales según el rol del usuario: administrador, docente y estudiante.

El diseño sigue el mockup incluido en el repositorio (`Mockup Pagina Web - Institución Educativa San Antonio Rionegro.pdf`).

---

## ✨ Características

### 🏠 Página de inicio (`menu.html`)
- Encabezado con logo y menú de navegación.
- Cinta de fotos del colegio.
- **Horizonte Institucional** y **video institucional** (HTML5).
- **Cuadro de Honor 2025** por nivel.
- **Calendario de actividades 2026-I** y tabla de actividades extracurriculares.
- Formulario de **solicitud de información** para padres/acudientes.
- Sección **"Conoce Nuestros Profes"** con fotografías y grados a cargo.
- Información de contacto con mapa de Google Maps y redes sociales.

### 🔐 Inicio de sesión (`inicio-sesion.html` + `js/inicio-sesion.js`)
- Acceso con usuario o correo y contraseña.
- Validación de credenciales.
- **Máximo 3 intentos fallidos:** al superarlos, el formulario se bloquea.
- Control de intentos mediante `sessionStorage`.
- Mensajes de error y éxito en pantalla.
- Identificación del rol del usuario.
- Acceso a los diferentes portales según el tipo de usuario.

### 📝 Registro de estudiantes (`formulario.html` + `js/formulario.js`)
- Formulario con nombres, apellidos, tipo y número de documento, grado, correo y contraseña.
- Aceptación de la política de tratamiento de datos personales.
- **CRUD completo** sobre `localStorage`:
  - **Crear:** registra un nuevo estudiante.
  - **Leer:** lista los estudiantes en una tabla.
  - **Editar:** permite actualizar la información.
  - **Eliminar:** elimina estudiante tabla.
- Validación para no repetir el número de documento.

### 🛠️ Portal del administrador (`portal-admin copy.html` + `js/portal-admin.js`)
- Panel principal de administración.
- Visualización de estudiantes registrados y docentes.
- Estadísticas generales de la institución.
- Promedio académico institucional.
- Estadísticas de asistencia.
- Identificación de estudiantes con materias en riesgo.
- Gráfica de estudiantes por grado.
- Buscador de estudiantes por nombre, documento o grado.
- Consulta de información académica.

### 👨‍🏫 Portal del docente (`portal-docente.html` + `js/portal-docente.js`)
- Consulta de estudiantes según los grados asignados.
- Visualización de información de los estudiantes.
- Registro y actualización de calificaciones.
- Organización de notas por períodos académicos.
- Cálculo de notas definitivas.
- Validación de calificaciones.
- Registro de asistencia por fecha.
- Clasificación de asistencia: presente, ausente y excusa.
- Consulta de estadísticas académicas y de asistencia.

### 🎓 Portal del estudiante (`portal-estudiante.html` + `js/portal-estudiante.js`)
- Consulta de información personal.
- Visualización de calificaciones por materia y período.
- Consulta del promedio general.
- Visualización de notas definitivas.
- Identificación de materias en riesgo.
- Consulta del porcentaje de asistencia.
- Visualización de inasistencias y excusas.
- Seguimiento de registros de asistencia.



## 📁 Estructura del proyecto

```text
proyecto-integrador-Frontend-main/
│
├── CSS/
│   └── estilospropios.css
│
├── imagenes/
│   ├── COLEGIO.JPG
│   ├── Carrete 1 .jpg
│   ├── Carrete 2.jpg
│   ├── colegio.png
│   ├── images.jpg
│   ├── profe_eduardo.webp
│   ├── profe_jorge.webp
│   ├── profe_nubia.webp
│   ├── profe_rocio.webp
│   ├── redes.png
│   └── Mockup Pagina Web - Institución Educativa San Antonio Rionegro.pdf
│
├── js/
│   ├── formulario.js
│   ├── inicio-sesion.js
│   ├── portal-admin.js
│   ├── portal-docente.js
│   ├── portal-estudiante.js
│   └── usuario.js
│
├── video/
│   └── IE San Antonio.mp4
│
├── menu.html
├── inicio-sesion.html
├── formulario.html
├── portal-admin.html
├── portal-admin copy.html
├── portal-docente.html
├── portal-estudiante.html
├── usuario.json
└── README.md
```

---

## 🚀 Cómo ejecutarlo

1. Clona o descarga el repositorio

2. Entra a la carpeta del proyecto.

3. Abre la carpeta en Visual Studio Code.

4. Ejecuta el proyecto utilizando la extensión **Live Server**.

5. Ingresa desde `menu.html` para visualizar la página principal.

> Se recomienda utilizar Live Server para permitir la carga de los archivos JSON mediante JavaScript.

---

## 🔑 Credenciales de prueba

Los usuarios iniciales se encuentran definidos en el archivo `usuario.json`.

| Rol | Usuario | Correo | Contraseña |
|---|---|---|---|
| Administrador | `admin` | `admin@colegio.com` | `12345` |
| Docente | `docente` | `docente@colegio.com` | `docente` |
| Estudiante | `estudiante` | `estudiante@colegio.com` | `estudiante` |

> ⚠️ Son credenciales de demostración. La autenticación se realiza mediante JavaScript y almacenamiento del lado del cliente.

---

## 💾 Almacenamiento de información

El proyecto utiliza las herramientas de almacenamiento del navegador:

- **LocalStorage:** permite conservar información de estudiantes, usuarios, calificaciones y asistencia.
- **SessionStorage:** permite gestionar información temporal relacionada con los intentos de inicio de sesión y los datos de sesión.

---

## 🗺️ Flujo de navegación

```text
menu.html
    |
    v
inicio-sesion.html
    |
    v
Validación de credenciales
    |
    +----------+----------+
    |          |          |
    v          v          v
Administrador Docente  Estudiante
    |          |          |
    v          v          v
Portal       Portal     Portal
Admin        Docente    Estudiante
```

El módulo de registro de estudiantes se encuentra disponible mediante `formulario.html`.

---

## 🔮 Mejoras futuras

- Conectar el sistema a un backend con base de datos.
- Implementar mecanismos de autenticación y almacenamiento seguro de contraseñas.
- Ampliar las funcionalidades de administración académica.
- Mejorar la gestión de usuarios y permisos.
- Incorporar nuevos reportes y consultas institucionales.

---

## 👥 Autores

- María Fernanda Montoya Restrepo
- Seleny Meza Suaréz
- Cristian Polo Gutiérrez

---
