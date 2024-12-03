import { Component, OnInit } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './our-services/services.component';
import { VideoIntroComponent } from './video-intro/video-intro.component';
import { ProjectsComponent } from './projects/projects.component';
import { TeamComponent } from './team/team.component';
import { FaqComponent } from './faq/faq.component';
import { ClientComponent } from './clients/client.component';
import { SEOService } from '../../core/services/seo.services';
import { TestimonialComponent } from './testimonials/testimonial.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    VideoIntroComponent,
    ProjectsComponent,
    TeamComponent,
    TestimonialComponent,
    FaqComponent,
    ClientComponent,
  ],
})
export class HomeComponent implements OnInit {
  constructor(private seoService: SEOService) {}

  ngOnInit(): void {
    this.seoService.updateTags({
      title: 'Tech Vision | Consultoría y Desarrollo de Software',
      description:
        'Empresa líder en consultoría y desarrollo de software. Soluciones tecnológicas innovadoras para empresas.',
      keywords:
        'desarrollo software, consultoría IT, aplicaciones web, desarrollo móvil, tech vision',
    });
    this.seoService.setCanonicalLink();
  }
}
