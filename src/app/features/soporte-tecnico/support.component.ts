import { Component, OnInit, AfterViewInit } from '@angular/core';

interface VantaConfig {
  el: string | HTMLElement;
  mouseControls: boolean;
  touchControls: boolean;
  gyroControls: boolean;
  minHeight: number;
  minWidth: number;
  scale: number;
  scaleMobile: number;
  color?: number;
  points?: number;
  maxDistance?: number;
}

interface VantaAPI {
  NET: (config: VantaConfig) => void;
  WAVES: (config: VantaConfig) => void;
}

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

declare let VANTA: VantaAPI;
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
  }

  ngAfterViewInit(): void {
    this.initializeVanta();
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

  private initializeVanta(): void {
    VANTA.NET({
      el: '#ba',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x3fc6ff,
      points: 15.0,
      maxDistance: 15.0,
    });

    VANTA.WAVES({
      el: '#b',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
    });
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
}
