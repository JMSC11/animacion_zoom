var imagenPantalla = document.getElementById('imagen-pantalla');
var contenido = document.getElementById('contenido');
var scale = 1;
var maxScale = 1.8; // Máximo zoom permitido
var minScale = 1; // Mínimo zoom permitido
var lastTouchY = 0;

function updateScale(delta) {
    if (delta < 0) {
        scale *= 0.98; // Disminuir el zoom
    } else {
        scale *= 1.02; // Aumentar el zoom
    }

    // Limitar el zoom
    scale = Math.min(maxScale, Math.max(minScale, scale));

    // Actualizar la transformación de la imagen
    imagenPantalla.style.transform = 'scale(' + scale + ')';

    // Mostrar u ocultar el contenido
    contenido.style.opacity = scale === maxScale ? '1' : '0';
}

window.addEventListener('wheel', function(e) {
    updateScale(e.deltaY);
});

window.addEventListener('touchstart', function(e) {
    lastTouchY = e.touches[0].clientY;
});

window.addEventListener('touchmove', function(e) {
    e.preventDefault(); // Prevenir el scroll predeterminado del navegador
    var touchY = e.touches[0].clientY;
    var delta = lastTouchY - touchY;
    lastTouchY = touchY;

    updateScale(delta);
}, { passive: false });
