// Carrusel de pizzas
class Carousel {
    constructor() {
        this.track = document.querySelector('.carousel-track');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.prevBtn = document.querySelector('.carousel-prev');
        this.nextBtn = document.querySelector('.carousel-next');
        this.indicators = document.querySelectorAll('.indicator');
        
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        // Eventos de botones
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // Eventos de indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Click en slides para ir al menú
        this.slides.forEach(slide => {
            slide.addEventListener('click', () => {
                window.location.href = '../html/menu.html';
            });
        });
        
        // Auto-play
        this.startAutoPlay();
        
        // Pausar auto-play al hover
        const carouselWrapper = document.querySelector('.carousel-wrapper');
        carouselWrapper.addEventListener('mouseenter', () => this.stopAutoPlay());
        carouselWrapper.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Touch events para móvil
        this.setupTouchEvents();
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateCarousel();
    }
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateCarousel();
    }
    
    updateCarousel() {
        // Mover el track
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;
        
        // Actualizar indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.next(), 4000);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
    
    setupTouchEvents() {
        let startX = 0;
        let endX = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        });
    }
}

// Inicializar carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.carousel-track')) {
        new Carousel();
    }
});