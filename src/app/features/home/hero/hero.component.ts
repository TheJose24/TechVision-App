// hero.component.ts
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { InViewDirective } from '../../../shared/directives/in-view.directive';
import { GlobeComponent } from '../globe.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, InViewDirective, GlobeComponent],
  templateUrl: './hero.component.html',
  animations: [
    trigger('fadeIn', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden => visible', animate('1s ease-out')),
    ]),
    trigger('fadeInUp', [
      state('hidden', style({ opacity: 0, transform: 'translateY(20px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden => visible', animate('0.6s ease-out')),
    ]),
  ],
  styles: [
    `
      @keyframes float {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
      }
    `,
  ],
})
export class HeroComponent implements OnInit, OnDestroy {
  @ViewChild('particleCanvas', { static: true }) particleCanvas!: ElementRef<HTMLCanvasElement>;

  isVisible = false;
  private animationFrameId?: number;
  private particles: Array<{ x: number; y: number; speed: number; size: number }> = [];

  constructor(@Inject(PLATFORM_ID) private platformId: NonNullable<unknown>) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && this.particleCanvas) {
      this.initParticles();
    }
  }

  onInView(inView: boolean): void {
    this.isVisible = inView;
  }

  private initParticles(): void {
    const canvas = this.particleCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Crear partículas
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 0.5 + 0.2,
        size: Math.random() * 2 + 1,
      });
    }

    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      this.particles.forEach(particle => {
        particle.y -= particle.speed;
        if (particle.y < 0) {
          particle.y = canvas.height;
          particle.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99, 102, 241, 0.2)';
        ctx.fill();
      });

      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
