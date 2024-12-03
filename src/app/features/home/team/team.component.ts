import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
}

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './team.component.html',
  animations: [
    trigger('memberAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class TeamComponent {
  sectionTitle = 'Equipo';
  mainTitle = 'Conoce a Nuestros Expertos';
  description =
    'Profesionales apasionados por crear soluciones innovadoras y efectivas para nuestros clientes.';

  teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Christopher Porras',
      position: 'UI Designer',
      image: './assets/img/avatar/avatar-1.jpg',
      socialLinks: {
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
      },
    },
    {
      id: 2,
      name: 'Jose Sanchez',
      position: 'Full Stack Developer',
      image: './assets/img/avatar/avatar-2.jpg',
      socialLinks: {
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
      },
    },
    {
      id: 3,
      name: 'Jesus Palomino',
      position: 'UX Designer',
      image: './assets/img/avatar/avatar-3.jpg',
      socialLinks: {
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
      },
    },
    {
      id: 4,
      name: 'Manuel Rodriguez',
      position: 'Project Manager',
      image: './assets/img/avatar/avatar-4.jpg',
      socialLinks: {
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
      },
    },
  ];
}
