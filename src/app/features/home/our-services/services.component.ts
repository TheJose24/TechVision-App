import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './services.component.html',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class ServicesComponent {
  readonly services: Service[] = [
    {
      id: 'custom-dev',
      icon: 'lni lni-code',
      title: 'Desarrollo de Software a Medida',
      description:
        'Creamos aplicaciones y sistemas personalizados, adaptados a las necesidades específicas de su negocio para maximizar eficiencia y productividad.',
      features: [
        'Desarrollo web y móvil',
        'Arquitectura escalable',
        'Metodologías ágiles',
        'Testing y QA',
      ],
    },
    {
      id: 'digital-transform',
      icon: 'lni lni-consulting',
      title: 'Consultoría en Transformación Digital',
      description:
        'Asesoramos a su empresa en el proceso de transformación digital, optimizando procesos y adoptando tecnologías innovadoras.',
      features: [
        'Evaluación de procesos',
        'Estrategia digital',
        'Optimización de operaciones',
        'Gestión del cambio',
      ],
    },
    {
      id: 'system-integration',
      icon: 'lni lni-network',
      title: 'Integración de Sistemas',
      description:
        'Conectamos sus sistemas y aplicaciones para mejorar la comunicación y el flujo de información en su organización.',
      features: [
        'APIs y middleware',
        'Integración cloud',
        'Migración de datos',
        'Interoperabilidad',
      ],
    },
    {
      id: 'security',
      icon: 'lni lni-shield',
      title: 'Seguridad y Auditoría de Software',
      description:
        'Realizamos auditorías de seguridad y aseguramos que sus aplicaciones estén protegidas frente a amenazas y vulnerabilidades.',
      features: [
        'Análisis de vulnerabilidades',
        'Pruebas de penetración',
        'Cumplimiento normativo',
        'Seguridad DevOps',
      ],
    },
    {
      id: 'cloud',
      icon: 'lni lni-cloud',
      title: 'Soluciones en la Nube',
      description:
        'Ofrecemos servicios de migración e implementación de soluciones en la nube para facilitar la escalabilidad y flexibilidad de su negocio.',
      features: [
        'Migración cloud',
        'Arquitectura serverless',
        'Optimización de costos',
        'Alta disponibilidad',
      ],
    },
    {
      id: 'data-analytics',
      icon: 'lni lni-database',
      title: 'Análisis de Datos y Business Intelligence',
      description:
        'Ayudamos a su empresa a aprovechar el poder de los datos con análisis avanzado y soluciones de inteligencia empresarial.',
      features: [
        'Dashboard analytics',
        'Machine Learning',
        'Visualización de datos',
        'Predicción y forecasting',
      ],
    },
  ];
}
