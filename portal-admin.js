const $ = (s) => document.querySelector(s);

if (requerirRol("admin")) iniciarAdmin();

function iniciarAdmin() {
    $("#salir").addEventListener("click", cerrarSesion);
    $("#saludo").textContent = "Hola, administrador";

    const estudiantes = leer(CLAVES.est, []);
    const docentes = leer(CLAVES.doc, []);

    // Datos de cada estudiante, calculados una sola vez
    const filas = estudiantes.map((e) => {
        const n = resumenNotas(e.documento), a = resumenAsistencia(e.documento);
        return { e, n, a };
    });

    /* --- Tarjetas --- */
    const generales = filas.filter((f) => f.n.hayNotas).map((f) => f.n.general);
    const todas = filas.flatMap((f) => f.a.dias);
    const pctInst = todas.length ? (todas.filter((d) => d.estado === "P").length / todas.length) * 100 : null;
    const enRiesgo = filas.filter((f) => f.n.enRiesgo > 0).length;

    const tarjeta = (valor, texto, clase = "") => `<div class="dato ${clase}"><strong>${valor}</strong><span>${texto}</span></div>`;
    $("#tarjetas").innerHTML =
        tarjeta(estudiantes.length, "Estudiantes registrados") +
        tarjeta(docentes.length, "Docentes") +
        tarjeta(fmt(promedio(generales)), "Promedio institucional") +
        tarjeta(fmtPct(pctInst), "Asistencia institucional") +
        tarjeta(enRiesgo, "Estudiantes con materias en riesgo", enRiesgo > 0 ? "alerta" : "");

    /* --- Estudiantes por grado --- */
    const grados = ["6", "7", "8", "9", "10", "11"];
    const max = Math.max(1, ...grados.map((g) => estudiantes.filter((e) => e.grado === g).length));
    $("#barrasGrado").innerHTML = grados.map((g) => {
        const c = estudiantes.filter((e) => e.grado === g).length;
        return `<div class="fila-barra"><span>${g}°</span><div class="barra"><i style="width:${(c / max) * 100}%"></i></div><span>${c}</span></div>`;
    }).join("");

    /* --- Tabla de estudiantes con buscador --- */
    const pintarEstudiantes = () => {
        const q = $("#buscar").value.trim().toLowerCase();
        const visibles = filas.filter(({ e }) => `${nombreCompleto(e)} ${e.documento} ${e.grado}`.toLowerCase().includes(q));
        $("#tablaEstudiantes").innerHTML = visibles.length ? visibles.map(({ e, n, a }) => {
            const estado = !n.hayNotas ? '<span class="chip neutro">Sin notas</span>'
                : n.enRiesgo > 0 ? `<span class="chip riesgo">${n.enRiesgo} en riesgo</span>`
                : '<span class="chip ok">Al día</span>';
            return `<tr><td class="izq">${esc(nombreCompleto(e))}</td><td>${esc(e.documento)}</td><td>${esc(e.grado)}°</td>
                <td class="izq">${esc(e.correo)}</td><td>${fmt(n.general)}</td><td>${fmtPct(a.pct)}</td><td>${estado}</td></tr>`;
        }).join("") : '<tr><td colspan="7" class="vacio">No hay estudiantes que coincidan con la búsqueda.</td></tr>';
    };
    $("#buscar").addEventListener("input", pintarEstudiantes);
    pintarEstudiantes();

    /* --- Tabla de docentes --- */
    $("#tablaDocentes").innerHTML = docentes.map((d) =>
        `<tr><td class="izq">${esc(d.nombre)}</td><td>${esc(d.materia)}</td><td>${d.grados.map((g) => esc(etiquetaGrado(g))).join(", ")}</td><td class="izq">${esc(d.correo)}</td></tr>`
    ).join("");
}
