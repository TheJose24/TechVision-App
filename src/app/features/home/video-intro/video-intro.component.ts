// video-intro.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import GLightbox from 'glightbox';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-video-intro',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './video-intro.component.html',
})
export class VideoIntroComponent implements OnInit {
  thumbnailUrl: string = '/assets/img/intro-video.webp';
  videoTitle: string = 'Video Introductorio';
  videoUrl: string = 'https://www.youtube.com/watch?v=5MBYlYSczGg';

  ngOnInit(): void {
    this.initializeLightbox();
  }

  private initializeLightbox(): void {
    GLightbox({
      selector: '.video-popup',
      href: this.videoUrl,
      type: 'video',
      source: 'youtube',
      width: '900',
      autoplayVideos: true,
    });
  }
}
