// script.js
const track = document.getElementById("image-track");
let loaderText = document.getElementById('loader-text');
let preloader = document.getElementById('preloader');
let loadProgress = 0;

// Inicializar la posición en el centro al cargar la página
track.dataset.prevPercentage = -50; // Iniciar al centro
track.style.transform = `translate(${track.dataset.prevPercentage}%, -50%)`;

// Simular el proceso de carga
let interval = setInterval(() => {
    loadProgress += 8; // 8 en 8
    if (loadProgress > 100) loadProgress = 100; // Evitar que exceda 100
    loaderText.textContent = loadProgress + '%';

    if (loadProgress === 100) {
        clearInterval(interval);
        setTimeout(() => {
            preloader.style.display = 'none'; // Ocultar el preloader
            // Mostrar el contenido
            track.style.display = 'flex'; 
            setTimeout(() => {
                track.style.opacity = 1; // Animación de aparición
            }, 500); // Retraso para la animación de aparición
        }, 200); // Añadir un pequeño retraso para que se vea el 100% cargado
    }
}, 100); // Intervalo de 0,1 segundos para la carga

// Evento de desplazamiento (wheel) para mover horizontalmente
window.addEventListener('wheel', e => {
    const delta = e.deltaY || e.deltaX;
    const maxDelta = window.innerWidth / 2;

    // Ajustar el factor para hacer el desplazamiento más pesado
    const factor = 0.2; // Disminuir este valor hará el desplazamiento más lento
    const percentage = (delta / maxDelta) * -100 * factor;
    
    let nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

    // Limitar el movimiento a los extremos
    nextPercentage = Math.max(Math.min(nextPercentage, 0), -100);

    // Guardar la nueva posición
    track.dataset.prevPercentage = nextPercentage;

    // Mover la galería
    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    // Ajustar la posición de las imágenes
    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
    }
});
