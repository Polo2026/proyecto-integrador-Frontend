const nombre = document.getElementById ("nombre1")
const telefono = document.getElementById ("telefono1")
const correo = document.getElementById ("correo")
const solicitud = []

const solicitudInformacion = document.getElementById("solcitudInformacion")

solicitudInformacion.addEventListener('submit', function(event){
    event.preventDefault()

    const nuevaSolicitud = {
        nombre: nombre.value.trim(), 
        telefono: telefono.value.trim(), 
        correo: correo.value.trim(), 
    }
    solicitud.push(nuevaSolicitud)
    localStorage.setItem('solicitud', JSON.stringify(nuevaSolicitud))
})
