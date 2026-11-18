const $ = (s) => document.querySelector(s);

if (requerirRol("docente")) iniciarDocente();

function iniciarDocente() {
    $("#salir").addEventListener("click", cerrarSesion);

    const docente = leer(CLAVES.doc, []).find((d) => d.usuario === sessionStorage.getItem("idUsuario"));
    if (!docente) {
        cerrarSesion();
        window.location.replace("inicio-sesion.html");
        return;
    }

    $("#saludo").textContent = `Hola, profe ${docente.nombre.split(" ")[0]}`;
    $("#datosDoc").textContent = `${docente.materia}, grados ${docente.grados.map(etiquetaGrado).join(", ")}`;
    $("#fotoDoc").src = docente.foto;
    $("#fotoDoc").alt = `Foto de ${docente.nombre}`;

    const selGrado = $("#selGrado"), selPeriodo = $("#selPeriodo"), inFecha = $("#inFecha");
    selGrado.innerHTML = docente.grados.map((g) => `<option value="${esc(g)}">${esc(etiquetaGrado(g))}</option>`).join("");
    inFecha.value = hoyISO();
    inFecha.max = hoyISO();

    // "Todas las áreas" (docentes de primaria): se califica en Matemáticas por defecto
    const materia = MATERIAS.includes(docente.materia) ? docente.materia : MATERIAS[0];

    const estudiantesDe = (grado) => leer(CLAVES.est, [])
        .filter((e) => e.grado === grado)
        .sort((x, y) => x.apellidos.localeCompare(y.apellidos));
    const aviso = (id, texto, tipo) => { $(id).textContent = texto; $(id).className = "aviso " + tipo; };

    /* --- Tarjetas (todos los grados del docente) --- */
    const pintarTarjetas = () => {
        const mios = leer(CLAVES.est, []).filter((e) => docente.grados.includes(e.grado));
        const defs = mios.map((e) => definitiva(notasDe(e.documento)[materia])).filter((d) => d !== null);
        const hoy = leer(CLAVES.asis, {})[hoyISO()] || {};
        const hoyMios = mios.map((e) => hoy[e.documento]).filter(Boolean);
        const tarjeta = (v, t, c = "") => `<div class="dato ${c}"><strong>${v}</strong><span>${t}</span></div>`;
        const riesgo = defs.filter((d) => d < NOTA_MINIMA).length;
        $("#tarjetas").innerHTML =
            tarjeta(mios.length, "Estudiantes a cargo") +
            tarjeta(fmt(promedio(defs)), `Promedio en ${materia}`) +
            tarjeta(riesgo, "En riesgo en tu materia", riesgo > 0 ? "alerta" : "") +
            tarjeta(hoyMios.length ? fmtPct(hoyMios.filter((x) => x === "P").length / hoyMios.length * 100) : "—", "Asistencia de hoy");
    };

    /* --- Notas --- */
    const pintarNotas = () => {
        const lista = estudiantesDe(selGrado.value), p = Number(selPeriodo.value);
        $("#tablaNotas").innerHTML = lista.length ? lista.map((e, i) => {
            const periodos = notasDe(e.documento)[materia] || [];
            const v = typeof periodos[p] === "number" ? periodos[p].toFixed(1) : "";
            return `<tr><td class="izq">${esc(nombreCompleto(e))}</td>
                <td><input type="number" class="input-nota" data-i="${i}" min="1" max="5" step="0.1" value="${v}" aria-label="Nota de ${esc(nombreCompleto(e))}"></td>
                <td>${fmt(definitiva(periodos))}</td></tr>`;
        }).join("") : '<tr><td colspan="3" class="vacio">Todavía no hay estudiantes registrados en este grado.</td></tr>';
        $("#guardarNotas").disabled = !lista.length;
        aviso("#avisoNotas", "", "");
    };

    $("#guardarNotas").addEventListener("click", () => {
        const lista = estudiantesDe(selGrado.value), p = Number(selPeriodo.value);
        const campos = [...document.querySelectorAll(".input-nota")];
        let hayError = false;
        const valores = campos.map((c) => {
            const t = c.value.trim();
            const n = t === "" ? null : Number(t);
            const malo = n !== null && (isNaN(n) || n < 1 || n > 5);
            c.classList.toggle("invalido", malo);
            hayError = hayError || malo;
            return n;
        });
        if (hayError) { aviso("#avisoNotas", "Revisa las casillas en rojo: la nota debe estar entre 1,0 y 5,0.", "error"); return; }

        const notas = leer(CLAVES.notas, {});
        lista.forEach((e, i) => {
            notas[e.documento] = notas[e.documento] || {};
            const arr = notas[e.documento][materia] || [null, null, null, null];
            arr[p] = valores[i] === null ? null : Math.round(valores[i] * 10) / 10;
            notas[e.documento][materia] = arr;
        });
        guardar(CLAVES.notas, notas);
        pintarNotas(); pintarTarjetas();
        aviso("#avisoNotas", `Notas guardadas: ${materia}, grado ${etiquetaGrado(selGrado.value)}, período ${p + 1}.`, "exito");
    });

    /* --- Asistencia --- */
    const pintarAsistencia = () => {
        const lista = estudiantesDe(selGrado.value);
        const guardadas = leer(CLAVES.asis, {})[inFecha.value] || {};
        $("#tablaAsistencia").innerHTML = lista.length ? lista.map((e, i) => {
            const actual = guardadas[e.documento] || "P";
            const op = (v, t) => `<label class="opcion-asistencia"><input type="radio" name="as${i}" value="${v}" ${actual === v ? "checked" : ""}> ${t}</label>`;
            return `<tr><td class="izq">${esc(nombreCompleto(e))}</td><td>${op("P", "Presente")}${op("A", "Ausente")}${op("E", "Excusa")}</td></tr>`;
        }).join("") : '<tr><td colspan="2" class="vacio">Todavía no hay estudiantes registrados en este grado.</td></tr>';
        $("#guardarAsistencia").disabled = !lista.length;
        aviso("#avisoAsistencia", "", "");
    };

    $("#guardarAsistencia").addEventListener("click", () => {
        if (!inFecha.value) { aviso("#avisoAsistencia", "Elige la fecha de la clase.", "error"); return; }
        const lista = estudiantesDe(selGrado.value);
        const asis = leer(CLAVES.asis, {});
        asis[inFecha.value] = asis[inFecha.value] || {};
        lista.forEach((e, i) => {
            asis[inFecha.value][e.documento] = document.querySelector(`input[name="as${i}"]:checked`).value;
        });
        guardar(CLAVES.asis, asis);
        pintarTarjetas();
        aviso("#avisoAsistencia", `Asistencia guardada: grado ${etiquetaGrado(selGrado.value)}, ${fechaCorta(inFecha.value)}.`, "exito");
    });

    const pintarTodo = () => { pintarNotas(); pintarAsistencia(); };
    selGrado.addEventListener("change", pintarTodo);
    selPeriodo.addEventListener("change", pintarNotas);
    inFecha.addEventListener("change", pintarAsistencia);
    pintarTarjetas();
    pintarTodo();
}
