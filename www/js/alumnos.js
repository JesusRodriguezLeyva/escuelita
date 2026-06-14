const API = "https://meetings-protect-nevada-suffering.trycloudflare.com/apis/cordova.php";


$(document).ready(function () {
    console.log("Módulo de alumnos cargado.");

    // 1. Traer los datos de la base de datos inmediatamente
    obtenerAlumnos();

    // 2. Activar el filtro del buscador en tiempo real
    $("#txt-buscar-alumno").on("keyup", function () {
        let valor = $(this).val().toLowerCase();
        $("#tabla-alumnos-body tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(valor) > -1);
        });
    });

    // 3. Capturar el envío del formulario para agregar el alumno sin recargar la página
    $("#form-alumno").on("submit", function (e) {
        e.preventDefault(); // Evita que la página se refresque

        // Recolectamos los datos de los inputs usando sus IDs actuales
        let datosAlumno = {
            "txtMatricula": $("#txt-matricula").val(),
            "txtNombre": $("#txt-nombre").val(),
            "txtApellidoPaterno": $("#txt-apellido-paterno").val(),
            "txtApellidoMaterno": $("#txt-apellido-materno").val(),
            "cboCarrera": $("#txt-carrera").val()
        };

        // Enviamos la petición por POST con la variable agregarAlumno en la URL (GET)
        // tal y como lo valida tu sentencia: if (isset($_GET["agregarAlumno"]))
        $.post(API + "?agregarAlumno", datosAlumno, function (respuesta) {

            // Limpiamos los campos del formulario para que quede vacío
            $("#txt-matricula").val("");
            $("#txt-nombre").val("");
            $("#txt-apellido-paterno").val("");
            $("#txt-apellido-materno").val("");
            $("#txt-carrera").val(""); // Resetea el select

            // Recargamos la lista de alumnos instantáneamente sin refrescar la ventana
            obtenerAlumnos();

        }).fail(function () {
            alert("Error al intentar registrar al alumno mediante el túnel.");
        });
    });

});

function obtenerAlumnos() {
    $.get(API + "?buscarAlumnos", function (alumnos) {
        console.log("Alumnos recibidos:", alumnos);
        let filas = "";

        if (alumnos.length === 0) {
            filas = `<tr><td colspan="4" class="text-center text-muted">No hay alumnos en la base de datos.</td></tr>`;
        } else {
            alumnos.forEach(function (alumno) {
                filas += `
                    <tr>
                        <td><strong>${alumno.matricula}</strong></td>
                        <td>${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno}</td>
                        <td class="d-none d-md-table-cell">${alumno.carrera}</td>
                        <td class="text-center">
                            <button class="btn btn-sm btn-warning" title="Editar"><i class="bi bi-pencil-square"></i></button>
                            <button class="btn btn-sm btn-danger" title="Eliminar"><i class="bi bi-trash3-fill"></i></button>
                        </td>
                    </tr>
                `;
            });
        }

        $("#tabla-alumnos-body").html(filas);
    }).fail(function () {
        alert("Error de conexión a la API a través del túnel.");
    });
}