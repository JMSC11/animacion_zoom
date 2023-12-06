var imagenPantalla = document.getElementById('imagen-pantalla');
var contenido = document.getElementById('contenido');
var scale = 1;
var maxScale = 1.8; // Máximo zoom permitido
var minScale = 1; // Mínimo zoom permitido

window.addEventListener('wheel', function(e) {
    if (e.deltaY < 0) {
        // Scroll hacia arriba
        scale *= 0.9;
    } else {
        // Scroll hacia abajo
        scale *= 1.1;
    }

    // Limitar el zoom
    if (scale > maxScale) {
        scale = maxScale;
        contenido.style.opacity = 1; // Muestra el contenido solo cuando se alcanza maxScale
    } else {
        contenido.style.opacity = 0; // Oculta el contenido mientras el zoom no sea maxScale
    }

    if (scale < minScale) {
        scale = minScale;
    }

    imagenPantalla.style.transform = 'scale(' + scale + ')';
});
