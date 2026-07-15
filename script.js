// ==========================================
// CONTROL DEL MODAL REPRODUCTOR DE VIDEO
// ==========================================
function openVideoModal(videoSrc) {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    
    if (modal && video) {
        video.src = videoSrc;
        modal.classList.add('open');
        video.muted = false;
        
        video.play().catch(error => {
            console.log("El navegador bloqueó el autoplay, esperando acción del usuario.", error);
        });
    }
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    
    if (modal && video) {
        modal.classList.remove('open');
        video.pause();
        video.src = ""; // Limpieza de memoria
    }
}

// ==========================================
// INTERACCIONES GENERALES DE LA PÁGINA
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

    // Cerrar modal al hacer clic en las zonas negras
    const videoModal = document.getElementById('videoModal');
    if (videoModal) {
        videoModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeVideoModal();
            }
        });
    }

    // Menu Móvil (Cortina)
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const sideNav = document.getElementById('side-nav');
    const mobileLinks = document.querySelectorAll('#side-nav a, .nav-close-btn');

    if (menuToggle && sideNav) {
        menuToggle.addEventListener('click', () => {
            sideNav.classList.add('open');
            document.body.style.overflow = 'hidden'; // Evita scroll de fondo
        });
    }

    if (menuClose && sideNav) {
        menuClose.addEventListener('click', () => {
            sideNav.classList.remove('open');
            document.body.style.overflow = '';
        });
    }
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (sideNav) sideNav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Cambiar tamaño del Header al hacer scroll
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('top-nav');
        if (nav) {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    });

    // Animaciones de Aparición (Intersection Observer Natico)
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Carrusel de Testimonios
    const slides = document.querySelectorAll('.testimonial-slide');
    const nextBtn = document.getElementById('next-testimonial');
    const prevBtn = document.getElementById('prev-testimonial');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;
        
        if (slides[currentSlide]) {
            slides[currentSlide].classList.add('active');
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide++;
            showSlide(currentSlide);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide--;
            showSlide(currentSlide);
        });
    }
});