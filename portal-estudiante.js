const $ = (s) => document.querySelector(s);

if (requerirRol("estudiante")) iniciarEstudiante();

function iniciarEstudiante() {
    $("#salir").addEventListener("click", cerrarSesion);

    const est = leer(CLAVES.est, []).find((e) => e.documento === sessionStorage.getItem("idUsuario"));
    if (!est) {   // el estudiante fue eliminado mientras tenía la sesión abierta
        cerrarSesion();
        window.location.replace("inicio-sesion.html");
        return;
    }

    $("#saludo").textContent = `Hola, ${est.nombres}`;
    $("#datosEst").textContent = `Grado ${est.grado}°, ${est.tipoDocumento} ${est.documento}`;

    const n = resumenNotas(est.documento);
    const a = resumenAsistencia(est.documento);

    /* --- Tarjetas --- */
    const tarjeta = (valor, texto, clase = "") => `<div class="dato ${clase}"><strong>${valor}</strong><span>${texto}</span></div>`;
    $("#tarjetas").innerHTML =
        tarjeta(fmt(n.general), "Promedio general", n.hayNotas && n.general < NOTA_MINIMA ? "alerta" : "") +
        tarjeta(fmtPct(a.pct), "Asistencia") +
        tarjeta(a.ausentes, "Inasistencias sin excusa", a.ausentes > 2 ? "alerta" : "") +
        tarjeta(n.enRiesgo, "Materias en riesgo", n.enRiesgo > 0 ? "alerta" : "");

    if (!n.hayNotas) {
        $("#avisoNotas").textContent = "Todavía no tienes notas registradas. Tus docentes las publicarán al cerrar cada período.";
    }

    /* --- Notas --- */
    $("#tablaNotas").innerHTML = n.filas.map((f) => {
        const celdas = f.periodos.map((p) => `<td>${typeof p === "number" ? p.toFixed(1) : "—"}</td>`).join("");
        const estado = f.def === null ? '<span class="chip neutro">Sin notas</span>'
            : f.def < NOTA_MINIMA ? '<span class="chip riesgo">En riesgo</span>'
            : '<span class="chip ok">Aprobando</span>';
        return `<tr><td class="izq">${f.materia}</td>${celdas}<td><strong>${fmt(f.def)}</strong></td><td>${estado}</td></tr>`;
    }).join("");

    /* --- Asistencia --- */
    if (a.total === 0) {
        $("#bloqueAsistencia").innerHTML = '<p class="vacio">Aún no hay clases registradas para ti.</p>';
        return;
    }
    const nombres = { P: ["ok", "Presente"], A: ["riesgo", "Ausente"], E: ["excusa", "Excusa"] };
    $("#bloqueAsistencia").innerHTML = `
        <div class="barra" role="img" aria-label="Asistencia ${fmtPct(a.pct)}"><i style="width:${a.pct}%"></i></div>
        <div class="barra-texto"><span>${a.presentes} de ${a.total} clases</span><span>${a.excusas} con excusa</span></div>
        <p><strong>Últimas clases</strong></p>
        <div class="dias" style="margin-top:8px">${a.dias.slice(-10).map((d) =>
            `<span class="chip ${nombres[d.estado][0]}">${fechaCorta(d.fecha)} ${nombres[d.estado][1]}</span>`).join("")}</div>`;
}
