var imagenPantalla = document.getElementById('imagen-pantalla');
var contenido = document.getElementById('contenido');
var scale = 1;
var maxScale = 1.8; // Máximo zoom permitido
var minScale = 1; // Mínimo zoom permitido
var lastTouchY = 0;

function updateScale(delta) {
    // Ajusta el zoom basado en la dirección del scroll o el desplazamiento táctil
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

// Evento de scroll para computadoras
window.addEventListener('wheel', function(e) {
    updateScale(e.deltaY);
});

// Eventos táctiles para dispositivos móviles
window.addEventListener('touchstart', function(e) {
    lastTouchY = e.touches[0].clientY;
});

window.addEventListener('touchmove', function(e) {
    var touchY = e.touches[0].clientY;
    var delta = lastTouchY - touchY;
    lastTouchY = touchY;

    updateScale(delta);
}, { passive: false });

// IntersectionObserver para un efecto adicional o de respaldo
var observerOptions = {
  root: null,
  threshold: 0.5
};

var observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Aplicar el zoom máximo cuando el elemento es visible
      imagenPantalla.style.transform = 'scale(' + maxScale + ')';
      contenido.style.opacity = 1;
    } else {
      // Restablecer cuando no es visible
      imagenPantalla.style.transform = 'scale(1)';
      contenido.style.opacity = 0;
    }
  });
}, observerOptions);

observer.observe(document.querySelector('.contenedor-principal'));
