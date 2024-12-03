import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SEOService {
  private readonly baseUrl = 'https://tech-vision.devbyjose.studio';
  private readonly defaultImage = '/assets/img/og-image.webp';

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router
  ) {}

  updateTags(config: SEOConfig): void {
    const url = config.url || `${this.baseUrl}${this.router.url}`;
    const image = config.image || `${this.baseUrl}${this.defaultImage}`;

    // Basic SEO tags
    this.title.setTitle(config.title);
    this.meta.updateTag({ name: 'description', content: config.description });
    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });

    // Twitter
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:url', content: url });
    this.meta.updateTag({ name: 'twitter:image', content: image });
  }

  setCanonicalLink(): void {
    const link: HTMLLinkElement = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', `${this.baseUrl}${this.router.url}`);
    document.head.appendChild(link);
  }
}
