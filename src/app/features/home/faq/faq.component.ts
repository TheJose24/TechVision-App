import { CommonModule } from '@angular/common';
import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

interface FaqCategory {
  id: string;
  name: string;
  icon: string;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  icon: string;
  category: string;
  tags: string[];
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ScrollRevealDirective],
  templateUrl: './faq.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class FaqComponent {
  searchTerm = '';
  activeCategory = signal<string>('all');

  categories = signal<FaqCategory[]>([
    { id: 'all', name: 'Todas', icon: 'lni lni-grid-alt' },
    { id: 'services', name: 'Servicios', icon: 'lni lni-cog' },
    { id: 'technical', name: 'Técnico', icon: 'lni lni-code-alt' },
    { id: 'process', name: 'Procesos', icon: 'lni lni-network' },
    { id: 'support', name: 'Soporte', icon: 'lni lni-support' },
  ]);

  faqItems = signal<FaqItem[]>([
    {
      id: '1',
      question: '¿Qué tecnologías y frameworks utilizan en sus desarrollos?',
      answer:
        'Trabajamos con las últimas tecnologías del mercado, incluyendo Angular, React, Node.js, Python, y .NET. Seleccionamos la stack tecnológica más adecuada según los requerimientos específicos de cada proyecto, considerando factores como escalabilidad, rendimiento y mantenibilidad.',
      icon: 'lni lni-code-alt',
      category: 'technical',
      tags: ['Desarrollo Web', 'Frontend', 'Backend', 'Frameworks'],
    },
    {
      id: '2',
      question: '¿Cómo gestionan la seguridad en sus desarrollos?',
      answer:
        'Implementamos las mejores prácticas de seguridad en cada fase del desarrollo, incluyendo autenticación robusta, encriptación de datos, protección contra inyecciones SQL y XSS, además de realizar auditorías de seguridad regulares. Cumplimos con estándares como OWASP y normativas de protección de datos.',
      icon: 'lni lni-shield',
      category: 'technical',
      tags: ['Seguridad', 'Encriptación', 'OWASP', 'Protección de Datos'],
    },
    {
      id: '3',
      question: '¿Cuál es su metodología de trabajo en proyectos?',
      answer:
        'Seguimos una metodología ágil adaptada, con sprints de 2 semanas, reuniones diarias de seguimiento y revisiones periódicas con el cliente. Utilizamos herramientas como Jira para la gestión de proyectos y garantizamos total transparencia en el proceso de desarrollo.',
      icon: 'lni lni-network',
      category: 'process',
      tags: ['Metodología Ágil', 'Scrum', 'Gestión de Proyectos'],
    },
    {
      id: '4',
      question: '¿Qué incluye el servicio de mantenimiento?',
      answer:
        'Nuestro servicio de mantenimiento incluye monitoreo 24/7, actualizaciones de seguridad, optimización de rendimiento, copias de seguridad regulares, soporte técnico prioritario y resolución de incidencias. Ofrecemos diferentes planes según las necesidades de cada cliente.',
      icon: 'lni lni-support',
      category: 'support',
      tags: ['Mantenimiento', 'Soporte', 'Monitoreo', 'Actualizaciones'],
    },
    {
      id: '5',
      question: '¿Qué garantías ofrecen en sus desarrollos?',
      answer:
        'Proporcionamos garantía de 6 meses en todos nuestros desarrollos, cubriendo corrección de bugs, ajustes de funcionalidad y soporte técnico. Además, realizamos pruebas exhaustivas antes de cada entrega para asegurar la calidad del producto.',
      icon: 'lni lni-checkmark-circle',
      category: 'services',
      tags: ['Garantía', 'Calidad', 'Testing', 'Soporte'],
    },
    {
      id: '6',
      question: '¿Cómo manejan la escalabilidad en sus soluciones?',
      answer:
        'Diseñamos arquitecturas escalables utilizando servicios cloud como AWS o Azure, implementando contenedores Docker, balanceadores de carga y bases de datos optimizadas. Realizamos pruebas de carga y stress para garantizar el rendimiento bajo alta demanda.',
      icon: 'lni lni-rocket',
      category: 'technical',
      tags: ['Escalabilidad', 'Cloud', 'Arquitectura', 'Rendimiento'],
    },
  ]);

  filteredFaqs = computed(() => {
    return this.faqItems().filter(item => {
      const matchesSearch =
        item.question.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory =
        this.activeCategory() === 'all' || item.category === this.activeCategory();
      return matchesSearch && matchesCategory;
    });
  });

  setActiveCategory(category: string): void {
    this.activeCategory.set(category);
  }
}
