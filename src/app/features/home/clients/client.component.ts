import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

interface Client {
  name: string;
  logo: string;
  industry: string;
  description: string;
  year: number;
}

interface IndustryStats {
  industry: string;
  count: number;
  icon: string;
}

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './client.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class ClientComponent {
  clients = signal<Client[]>([
    {
      name: 'Airbnb',
      logo: './assets/img/brand/airbnb.svg',
      industry: 'Travel & Hospitality',
      description: 'Optimización de plataforma de reservas y experiencias',
      year: 2022,
    },
    {
      name: 'Coca-Cola',
      logo: './assets/img/brand/coca-cola.svg',
      industry: 'Beverages & FMCG',
      description: 'Sistema de gestión de distribución y ventas',
      year: 2021,
    },
    {
      name: 'Facebook',
      logo: './assets/img/brand/facebook.svg',
      industry: 'Social Media',
      description: 'Desarrollo de integraciones y análisis de datos',
      year: 2022,
    },
    {
      name: 'Bank Mandiri',
      logo: './assets/img/brand/mandiri.svg',
      industry: 'Banking',
      description: 'Modernización de servicios bancarios digitales',
      year: 2021,
    },
    {
      name: 'Shopware',
      logo: './assets/img/brand/shopware.svg',
      industry: 'E-commerce',
      description: 'Personalización e integración de plataforma',
      year: 2023,
    },
    {
      name: 'Spotify',
      logo: './assets/img/brand/spotify.svg',
      industry: 'Music & Entertainment',
      description: 'Desarrollo de características premium y analytics',
      year: 2022,
    },
    {
      name: 'Tunnel',
      logo: './assets/img/brand/tunnel-id.svg',
      industry: 'Digital Identity',
      description: 'Sistema de autenticación y seguridad',
      year: 2023,
    },
    {
      name: 'Walmart',
      logo: './assets/img/brand/walmart.svg',
      industry: 'Retail',
      description: 'Optimización de cadena de suministro y e-commerce',
      year: 2022,
    },
  ]);

  // Actualizar estadísticas según industrias reales
  industryStats = signal<IndustryStats[]>([
    { industry: 'E-commerce & Retail', count: 28, icon: 'fas fa-shopping-cart' },
    { industry: 'Banking & Finance', count: 22, icon: 'fas fa-landmark' },
    { industry: 'Technology', count: 25, icon: 'fas fa-microchip' },
    { industry: 'Entertainment', count: 15, icon: 'fas fa-play-circle' },
  ]);
}
