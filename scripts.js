var imagenPantalla = document.getElementById('imagen-pantalla');
var contenido = document.getElementById('contenido');
var fondoOscurecedor = document.querySelector('.fondo-oscurecedor');

var scale = 1;
var maxScale = 1.8; // Máximo zoom permitido
var minScale = 1; // Mínimo zoom permitido
var lastTouchY = 0;

function updateScale(delta) {
    if (delta < 0) {
        // Scroll hacia arriba
        scale *= 0.98;
    } else {
        // Scroll hacia abajo
        scale *= 1.02;
    }

    // Limitar el zoom
    scale = Math.min(maxScale, Math.max(minScale, scale));

    imagenPantalla.style.transform = 'scale(' + scale + ')';
    contenido.style.opacity = scale === maxScale ? '1' : '0';

    // Actualizar la opacidad del fondo oscurecedor
    var opacity = (scale - 1) / (maxScale - 1);
    fondoOscurecedor.style.opacity = opacity;
}

window.addEventListener('wheel', function(e) {
    updateScale(e.deltaY);
});

window.addEventListener('touchstart', function(e) {
    lastTouchY = e.touches[0].clientY;
}, { passive: false });

window.addEventListener('touchmove', function(e) {
    var touchY = e.touches[0].clientY;
    var delta = lastTouchY - touchY;
    lastTouchY = touchY;

    updateScale(delta);
}, { passive: false });

// IntersectionObserver como respaldo
var observerOptions = {
  root: null,
  threshold: 0.5
};

var observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      imagenPantalla.style.transform = 'scale(' + maxScale + ')';
      contenido.style.opacity = 1;
      fondoOscurecedor.style.opacity = (maxScale - 1) / (maxScale - 1);
    } else {
      imagenPantalla.style.transform = 'scale(1)';
      contenido.style.opacity = 0;
      fondoOscurecedor.style.opacity = 0;
    }
  });
}, observerOptions);

observer.observe(document.querySelector('.contenedor-principal'));
