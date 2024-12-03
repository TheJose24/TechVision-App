import { AfterViewInit, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import GLightbox from 'glightbox';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

interface Project {
  id: number;
  title: string;
  description: string;
  category: 'web' | 'mobile' | 'cloud' | 'consulting' | 'enterprise';
  imageUrl: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements AfterViewInit {
  private projects = signal<Project[]>([
    {
      id: 1,
      title: 'Sistema ERP Empresarial',
      description: 'Desarrollo de sistema integral de gestión empresarial con Angular y .NET Core',
      category: 'enterprise',
      imageUrl: './assets/img/portfolio/portfolio-1.jpg',
    },
    {
      id: 2,
      title: 'App de Delivery',
      description: 'Aplicación móvil multiplataforma desarrollada con Flutter',
      category: 'mobile',
      imageUrl: './assets/img/portfolio/portfolio-2.jpg',
    },
    {
      id: 3,
      title: 'Plataforma E-learning',
      description: 'Sistema LMS con microservicios y arquitectura serverless',
      category: 'web',
      imageUrl: './assets/img/portfolio/portfolio-3.jpg',
    },
    {
      id: 4,
      title: 'Migración a la Nube',
      description: 'Transformación de infraestructura legacy a AWS Cloud',
      category: 'cloud',
      imageUrl: './assets/img/portfolio/portfolio-4.jpg',
    },
    {
      id: 5,
      title: 'Consultoría DevOps',
      description: 'Implementación de CI/CD y cultura DevOps',
      category: 'consulting',
      imageUrl: './assets/img/portfolio/portfolio-5.jpg',
    },
    {
      id: 6,
      title: 'Sistema de Gestión Financiera',
      description: 'Plataforma fintech con integración de APIs bancarias',
      category: 'enterprise',
      imageUrl: './assets/img/portfolio/portfolio-6.jpg',
    },
  ]);

  filters = [
    { value: 'all', label: 'Todos los Proyectos' },
    { value: 'web', label: 'Desarrollo Web' },
    { value: 'mobile', label: 'Apps Móviles' },
    { value: 'cloud', label: 'Cloud & DevOps' },
    { value: 'consulting', label: 'Consultoría' },
    { value: 'enterprise', label: 'Software Empresarial' },
  ];

  activeFilter = signal<string>('all');

  filteredProjects(): Project[] {
    return this.activeFilter() === 'all'
      ? this.projects()
      : this.projects().filter(project => project.category === this.activeFilter());
  }

  setActiveFilter(filter: string): void {
    this.activeFilter.set(filter);
  }

  showProject(project: Project): boolean {
    return this.activeFilter() === 'all' || project.category === this.activeFilter();
  }

  getFilterButtonClass(filter: string): string {
    const baseClasses =
      'rounded-md px-5 py-2 font-semibold text-body-light-11 hover:bg-primary hover:text-primary-color focus:bg-primary focus:text-primary-color dark:text-body-dark-11';
    return filter === this.activeFilter()
      ? `${baseClasses} bg-primary text-primary-color`
      : baseClasses;
  }

  ngAfterViewInit(): void {
    GLightbox({
      selector: '.portfolio-box',
      type: 'image',
      width: 900,
    });
  }
}
