// Función para cargar componentes HTML
function cargarComponente(url, elementoId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementoId).innerHTML = data;
            
            // Si es la navbar, activar el enlace correspondiente a la página actual
            if (elementoId === 'navbar-container') {
                activarEnlaceActual();
            }
        })
        .catch(error => console.error('Error al cargar el componente:', error));
}

// Función para activar el enlace correspondiente a la página actual
function activarEnlaceActual() {
    // Obtener el nombre del archivo actual
    const rutaActual = window.location.pathname;
    const archivoActual = rutaActual.split('/').pop();
    
    // Mapeo de archivos a IDs de navegación
    const mapeoNavegacion = {
        'dashboard.html': 'nav-dashboard',
        'evidenciariesgos.html': 'nav-riesgos',
        'module10.html': 'nav-riesgos', // Este también es parte de gestión de riesgos
        'checklist.html': 'nav-checklist',
        'flujoaprobacion.html': 'nav-conductores',
        'profile.html': 'nav-conductores', // Este también es parte de conductores
        'registroevent.html': 'nav-eventos',
        'adminpanel.html': 'nav-admin'
    };
    
    // Eliminar cualquier enlace activo anterior
    const enlaces = document.querySelectorAll('#navbar-container nav a');
    enlaces.forEach(enlace => {
        enlace.classList.remove('text-blue-600', 'font-semibold', 'border-b-2', 'border-blue-600');
        enlace.classList.add('hover:text-blue-600', 'transition-colors');
    });
    
    // Activar el enlace correspondiente
    const idEnlaceActivo = mapeoNavegacion[archivoActual];
    if (idEnlaceActivo) {
        const enlaceActivo = document.getElementById(idEnlaceActivo);
        if (enlaceActivo) {
            enlaceActivo.classList.remove('hover:text-blue-600');
            enlaceActivo.classList.add('text-blue-600', 'font-semibold', 'border-b-2', 'border-blue-600');
        }
    }
}

// Cargar los componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Cargar navbar y footer si existen los contenedores
    if (document.getElementById('navbar-container')) {
        cargarComponente('./components/navbar.html', 'navbar-container');
    }
    
    if (document.getElementById('footer-container')) {
        cargarComponente('./components/footer.html', 'footer-container');
    }
});
