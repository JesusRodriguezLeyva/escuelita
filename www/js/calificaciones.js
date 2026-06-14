const API_CALIFICACIONES = "https://diagnosis-passive-will-understand.trycloudflare.com/apis/cordova.php";
// En una PWA/Navegador usamos el document ready estándar de jQuery
$(document).ready(function () {
    console.log("Módulo de calificaciones cargado.");
    // 1. Traer los datos de la base de datos inmediatamente
    obtenerCalificaciones();
    // 2. Activar el filtro del buscador en tiempo real
    $("#txt-buscar-calificacion").on("keyup", function () {
        let valor = $(this).val().toLowerCase();
        $("#tabla-calificaciones-body tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(valor) > -1);
        });
    });
});
function obtenerCalificaciones() {
    $.get(API_CALIFICACIONES + "?buscarCalificaciones", function (calificaciones) {
        console.log("Calificaciones recibidas:", calificaciones);
        let filas = "";
        if (calificaciones.length === 0) {

            filas = `<tr><td colspan="4" class="text-center text-muted">No hay calificaciones en la base de datos.</td></tr>`;
        } else {
            calificaciones.forEach(function (calificacion) {
                filas += `
                <tr>
                        <td><strong>${calificacion.id_calificacion}</strong></td>
                        <td>${calificacion.alumno_nombre}</td> 
                        <td>${calificacion.id_materia}</td>
                        <td>${calificacion.calificacion}</td>
                        <td class="text-center">
                            <button class="btn btn-sm btn-warning">✏️</button>
                            <button class="btn btn-sm btn-danger">🗑️</button>
                        </td>
                </tr>
                `;
            });
        }
        $("#tabla-calificaciones-body").html(filas);
    }).fail(function () {
        alert("Error de conexión a la API a través del túnel.");
    });
}