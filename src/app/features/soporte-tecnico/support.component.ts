import { Component, OnInit, AfterViewInit } from '@angular/core';

interface SwiperConfig {
  slidesPerView: number;
  spaceBetween: number;
  breakpoints?: {
    [key: number]: {
      slidesPerView: number;
      spaceBetween: number;
    };
  };
}

interface SwiperConstructor {
  new (selector: string, config: SwiperConfig): unknown;
}

declare let Swiper: SwiperConstructor;

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
})
export class SupportComponent implements OnInit, AfterViewInit {
  currentIndex = 0;

  ngOnInit(): void {
    this.initializeCarousel();
    this.initScrollAnimation();
  }

  ngAfterViewInit(): void {
    this.initializeSwiper();
  }

  private initializeCarousel(): void {
    const slides = document.getElementById('carousel-slides');
    const indicators = document.querySelectorAll('[data-slide]');

    const goToSlide = (index: number): void => {
      this.currentIndex = index;
      slides!.style.transform = `translateX(-${index * 100}%)`;

      indicators.forEach((indicator, i) => {
        indicator.classList.toggle('opacity-100', i === index);
        indicator.classList.toggle('opacity-50', i !== index);
      });
    };

    // Auto-slide
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % indicators.length;
      goToSlide(this.currentIndex);
    }, 5000);

    // Click handlers
    indicators.forEach((indicator, i) => {
      indicator.addEventListener('click', () => goToSlide(i));
    });

    // Iniciar carrusel
    goToSlide(0);
  }
  private initializeSwiper(): void {
    // Inicializar Swiper para testimonios
    new Swiper('.testimonial-carousel', {
      slidesPerView: 1,
      spaceBetween: 30,
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });
  }
  private initScrollAnimation(): void {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observar todos los elementos con la clase scroll-revealed
    document.querySelectorAll('.scroll-revealed').forEach(element => {
      observer.observe(element);
    });
  }
}
