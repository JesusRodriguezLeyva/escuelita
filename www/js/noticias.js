const API_NOTICIAS = "https://diagnosis-passive-will-understand.trycloudflare.com/apis/cordova.php";


$(document).ready(function () {
    console.log("Módulo de noticias cargado.");
    obtenerNoticias();

    $("#txt-buscar-noticia").on("keyup", function () {
        let valor = $(this).val().toLowerCase();
        $(".noticia-card").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(valor) > -1);
        });
    });
});

function obtenerNoticias() {
    $.get(API_NOTICIAS + "?buscarNoticias", function (noticias) {
        console.log("Noticias recibidas:", noticias);
        let tarjetas = "";

        if (noticias.length === 0) {
            tarjetas = `<div class="col-12 text-center text-muted">No hay noticias en la base de datos.</div>`;
        } else {
            noticias.forEach(function (noticia) {
                const imagen = noticia.imagen
                    ? `<img src="https://diagnosis-passive-will-understand.trycloudflare.com/apis/uploads/${noticia.imagen}" class="img-fluid p-2" style="cursor: pointer;" alt="${noticia.titulo}">`
                    : `<div class="bg-secondary text-white text-center py-5">Sin imagen</div>`;

                tarjetas += `
                    <div class="col noticia-card">
                        <div class="card h-100 shadow-sm">
                            ${imagen}
                            <div class="card-body">
                                <h5 class="card-title">${noticia.titulo}</h5>
                                <p class="card-text text-muted small">${noticia.resumen}</p>
                                <p class="card-text">${noticia.contenido}</p>
                            </div>
                            <div class="card-footer d-flex justify-content-between align-items-center">
                                <small class="text-muted">Por: ${noticia.autor} · ${noticia.fecha_publicacion}</small>
                                <div>
                                    <button class="btn btn-sm btn-warning">✏️</button>
                                    <button class="btn btn-sm btn-danger">🗑️</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        $("#noticias-container").html(tarjetas);
    }).fail(function (xhr) {
        alert("Error de conexión: " + xhr.status + " - " + xhr.statusText);
    });
}