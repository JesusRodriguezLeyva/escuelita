const API = "https://diagnosis-passive-will-understand.trycloudflare.com/apis/cordova.php";

// En una PWA/Navegador usamos el document ready estándar de jQuery
$(document).ready(function () {

    // 1. Traer los datos de la base de datos inmediatamente
    obtenerSalones();

    // 2. Activar el filtro del buscador en tiempo real
    $("#txt-buscar-salon").on("keyup", function () {
        let valor = $(this).val().toLowerCase();
        $("#tabla-salones-body tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(valor) > -1);
        });
    });
});

function obtenerSalones() {
    $.get(API + "?buscarSalones", function (salones) {
        let filas = "";

        if (salones.length === 0) {
            filas = `<tr><td colspan="4" class="text-center text-muted">No hay salones en la base de datos.</td></tr>`;
        } else {
            salones.forEach(function (salon) {
                filas += `
                    <tr>
                        <td><strong>${salon.id_salon}</strong></td>
                        <td>${salon.nombre_aula}</td>
                        <td class="d-none d-md-table-cell">${salon.edificio}</td>
                        <td class="text-center">
                            <button class="btn btn-sm btn-warning" title="Editar"><i class="bi bi-pencil-square"></i></button>
                            <button class="btn btn-sm btn-danger" title="Eliminar"><i class="bi bi-trash3-fill"></i></button>
                        </td>
                    </tr>
                `;
            });
        }

        $("#tabla-salones-body").html(filas);
    }).fail(function () {
        alert("Error de conexión a la API a través del túnel.");
    });
}