import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { register } from 'swiper/element/bundle';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  signal,
  ViewEncapsulation,
} from '@angular/core';

register();

interface Testimonial {
  content: string;
  author: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  projectType: 'web' | 'mobile' | 'consultoria' | 'empresarial';
}

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(0)' })),
      ]),
    ]),
  ],
  templateUrl: './testimonial.component.html',
  styles: [
    `
      :host {
        display: block;
      }

      swiper-container {
        padding: 20px 0;
        width: 100%;
        height: 100%;
      }

      swiper-slide {
        height: auto;
      }
    `,
  ],
})
export class TestimonialComponent {
  currentFilter = signal<string>('todo');
  projectFilters = ['todo', 'web', 'mobile', 'consultoria', 'empresarial'];

  statistics = signal([
    { value: '98%', label: 'Satisfacción del Cliente' },
    { value: '150+', label: 'Proyectos Completados' },
    { value: '12+', label: 'Años de Experiencia' },
    { value: '50+', label: 'Empresas Fortune 500' },
  ]);

  testimonials = signal<Testimonial[]>([
    {
      content:
        'La implementación del sistema ERP personalizado ha transformado completamente nuestra eficiencia operativa. El equipo demostró un profundo conocimiento técnico y una excelente capacidad de entender nuestras necesidades específicas.',
      author: 'Carlos Ramírez',
      role: 'CTO',
      company: 'TechnovaMex',
      image: './assets/img/avatar/avatar-4.webp',
      rating: 5,
      projectType: 'empresarial',
    },
    {
      content:
        'El desarrollo de nuestra aplicación móvil superó todas las expectativas. La atención al detalle y la capacidad de resolver problemas complejos fue excepcional. Ahora tenemos una base de usuarios en constante crecimiento.',
      author: 'Luis Salazar',
      role: 'Product Manager',
      company: 'FinTech Solutions',
      image: './assets/img/avatar/avatar-5.webp',
      rating: 5,
      projectType: 'mobile',
    },
    {
      content:
        'La consultoría en transformación digital nos ayudó a identificar oportunidades clave y establecer una hoja de ruta clara. Su experiencia en el sector financiero fue fundamental para nuestro éxito.',
      author: 'Miguel Ángel Torres',
      role: 'Director de Innovación',
      company: 'Banco Progreso',
      image: './assets/img/avatar/avatar-6.webp',
      rating: 4,
      projectType: 'consultoria',
    },
    {
      content:
        'El rediseño de nuestra plataforma web ha incrementado significativamente nuestras conversiones. La integración de tecnologías modernas y la optimización del rendimiento fueron ejecutadas de manera brillante.',
      author: 'Marcos Sánchez',
      role: 'E-commerce Manager',
      company: 'Retail Plus',
      image: './assets/img/avatar/avatar-7.webp',
      rating: 5,
      projectType: 'web',
    },
  ]);

  filteredTestimonials = computed(() => {
    return this.testimonials().filter(
      t => this.currentFilter() === 'todo' || t.projectType === this.currentFilter()
    );
  });

  swiperConfig = {
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  };

  setActiveFilter(filter: string): void {
    this.currentFilter.set(filter);
  }
}
