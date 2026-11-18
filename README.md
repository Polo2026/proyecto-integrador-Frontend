# 🏫 Institución Educativa San Antonio — Sitio Web (Proyecto Integrador Frontend)

Sitio web institucional para la **I.E. San Antonio de Rionegro, Antioquia**. Incluye una página de inicio con información del colegio, un sistema de inicio de sesión con control de intentos y un módulo de registro y gestión de estudiantes (CRUD) que guarda los datos en el navegador.

El diseño sigue el mockup incluido en el repositorio (`Mockup Pagina Web - Institución Educativa San Antonio Rionegro.pdf`).

---

## ✨ Características

### 🏠 Página de inicio (`menu.html`)
- Encabezado con logo y menú de navegación.
- Cinta de fotos del colegio.
- **Horizonte Institucional** y **video institucional** (HTML5).
- **Cuadro de Honor 2025** por nivel (Preescolar, Primaria, Bachillerato).
- **Calendario de actividades 2026-I** y tabla de **actividades extra-curriculares**.
- Formulario de **solicitud de información** para padres/acudientes.
- Sección **"Conoce Nuestros Profes"** con foto y grados a cargo.
- **Información de contacto** con mapa de Google Maps y redes sociales.

### 🔐 Inicio de sesión (`inicio-sesion.html` + `inicio-sesion.js`)
- Acceso con **usuario o correo** y contraseña.
- **Máximo 3 intentos fallidos**: al superarlos, el formulario se bloquea (el conteo se guarda en `sessionStorage`).
- Mensajes de error/éxito en pantalla (sin `alert`), mostrando los intentos restantes.
- Al ingresar correctamente, redirige a `portal-admin.html`.

### 📝 Registro de estudiantes (`formulario.html` + `formulario.js`)
- Formulario con nombres, apellidos, tipo y número de documento, grado, correo y contraseña.
- Aceptación de la política de tratamiento de datos personales.
- **CRUD completo** sobre `localStorage`:
  - **Crear:** registra un nuevo estudiante.
  - **Leer:** lista los estudiantes en una tabla.
  - **Editar:** carga los datos en el formulario para actualizarlos.
  - **Eliminar:** borra el registro.
- Validación para **no repetir el número de documento**.

### 🛠️ Portal del administrador (`portal-admin.html`)
- Pantalla de bienvenida tras iniciar sesión, con opción de cerrar sesión.

---

## 🧰 Tecnologías utilizadas

- **HTML5** — estructura semántica de las páginas.
- **CSS3** — estilos propios con variables CSS, Flexbox/Grid y diseño responsive (`CSS/estilospropios.css`).
- **JavaScript (ES6+)** — validaciones y lógica del navegador.
- **Web Storage API** — `localStorage` (estudiantes) y `sessionStorage` (intentos de login y usuario).
- **Google Fonts** — *Fontdiner Swanky* y *Nunito*.
- **Google Maps Embed** — ubicación del colegio.

---

## 📁 Estructura del proyecto

```
proyecto-integrador-Frontend-main/
├── CSS/
│   └── estilospropios.css      # Estilos de todo el sitio
├── imagenes/                   # Logo, fotos del colegio, profesores y redes
├── video/
│   └── IE San Antonio.mp4      # Video institucional
├── menu.html                   # Página de inicio
├── inicio-sesion.html          # Login
├── inicio-sesion.js            # Lógica del login (3 intentos)
├── formulario.html             # Registro y listado de estudiantes
├── formulario.js               # CRUD con localStorage
├── portal-admin.html           # Portal del administrador
├── Mockup Pagina Web - ....pdf # Diseño de referencia
└── README.md
```

---

## 🚀 Cómo ejecutarlo

1. Clona o descarga el repositorio:
   ```bash
   git clone https://github.com/<tu-usuario>/proyecto-integrador-Frontend.git
   ```
2. Entra a la carpeta del proyecto.
3. Abre **`menu.html`** en tu navegador (doble clic) o usa la extensión **Live Server** de VS Code.

> No requiere instalación ni servidor: es un proyecto 100 % frontend.

---

## 🔑 Credenciales de prueba

| Usuario | Correo             | Contraseña |
|---------|--------------------|------------|
| `admin` | `admin@colegio.com`| `12345`    |

> ⚠️ Son credenciales de demostración. En un sistema real, la autenticación debe hacerse en un servidor y las contraseñas nunca deben guardarse en texto plano.

**Para reiniciar el contador de intentos** tras un bloqueo: cierra la pestaña o borra los datos de sesión desde las herramientas de desarrollador (F12 → Application → Session Storage).

---

## 🗺️ Flujo de navegación

```
menu.html ──► inicio-sesion.html ──► portal-admin.html
                    │
                    └──► formulario.html (registro de estudiantes)
```

---

## 🔮 Mejoras futuras

- Conectar el registro y el login a un **backend con base de datos**.
- Cifrar/hashear contraseñas y manejar sesiones seguras.
- Habilitar los enlaces pendientes del menú: Portal Profesores, Actividades Extra-Curriculares, Notas y Asistencias y Galería.
- Mostrar el nombre del usuario en el portal del administrador.
- Validar que la contraseña tenga mínimo 8 caracteres y coincida con su confirmación.

---

## 👥 Autores

- María Fernanda Montoya Restrepo
- Seleny Meza Suaréz
- Cristian Polo Gutiérrez
