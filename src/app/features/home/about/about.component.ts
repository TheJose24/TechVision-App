import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

interface TabContent {
  id: string;
  title: string;
  content: string[];
  stats?: { label: string; value: string }[];
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './about.component.html',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class AboutComponent {
  activeTab = signal<string>('nuestro-perfil');

  readonly tabs: TabContent[] = [
    {
      id: 'nuestro-perfil',
      title: 'Nuestro Perfil',
      content: [
        'Somos una empresa líder en desarrollo y consultoría de software, especializada en crear soluciones tecnológicas innovadoras que transforman negocios.',
        'Nuestro equipo de expertos combina años de experiencia en la industria con las últimas tecnologías para ofrecer resultados excepcionales.',
      ],
      stats: [
        { label: 'Proyectos Completados', value: '200+' },
        { label: 'Clientes Satisfechos', value: '150+' },
        { label: 'Años de Experiencia', value: '10+' },
      ],
    },
    {
      id: 'nuestra-vision',
      title: 'Nuestra Visión',
      content: [
        'Aspiramos a ser referentes globales en innovación tecnológica, creando soluciones que impulsen el éxito de nuestros clientes y contribuyan al progreso digital.',
        'Nos comprometemos con la excelencia técnica, la sostenibilidad y el desarrollo continuo de nuestro talento.',
      ],
      stats: [
        { label: 'Tasa de Retención', value: '95%' },
        { label: 'Satisfacción Cliente', value: '4.8/5' },
        { label: 'Equipo Global', value: '15 países' },
      ],
    },
    {
      id: 'nuestra-historia',
      title: 'Nuestra Historia',
      content: [
        'Desde nuestra fundación, hemos evolucionado constantemente, adaptándonos a las nuevas tecnologías y necesidades del mercado.',
        'Nuestro compromiso con la innovación y la excelencia nos ha permitido crecer de manera sostenible y establecer relaciones duraderas con nuestros clientes.',
      ],
      stats: [
        { label: 'Fundación', value: '2014' },
        { label: 'Crecimiento Anual', value: '40%' },
        { label: 'Reconocimientos', value: '15+' },
      ],
    },
  ];

  setActiveTab(tabId: string): void {
    this.activeTab.set(tabId);
  }

  isActiveTab(tabId: string): boolean {
    return this.activeTab() === tabId;
  }

  getActiveTabContent(): TabContent | undefined {
    return this.tabs.find(tab => tab.id === this.activeTab());
  }
}
