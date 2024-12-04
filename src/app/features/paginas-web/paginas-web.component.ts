import {
  Component,
  AfterViewInit,
  ElementRef,
  HostListener,
  ViewChildren,
  QueryList,
  Renderer2,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginas-web',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginas-web.component.html',
  styleUrl: './paginas-web.component.css',
})
export class PaginasWebComponent implements AfterViewInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    const cards = this.el.nativeElement.querySelectorAll('.fade-in-card');
    const canvases = this.el.nativeElement.querySelectorAll('.particleCanvas');
    canvases.forEach((canvas: HTMLCanvasElement) => {
      this.initializeParticles(canvas);
    });

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const card = entry.target;

            // Determina el tipo de animación basado en la clase
            if (card.classList.contains('fade-in-normal')) {
              this.renderer.addClass(card, 'visible'); // Aplica el fade-in normal
            } else if (card.classList.contains('fade-in-blend')) {
              this.renderer.addClass(card, 'visible'); // Aplica el fade-in conservando mix-blend-mode
            }

            // Escucha el evento `transitionend` para aplicar estilos finales
            const handleTransitionEnd: () => void = () => {
              this.renderer.addClass(card, 'transition-end');
              card.removeEventListener('transitionend', handleTransitionEnd);
            };

            card.addEventListener('transitionend', handleTransitionEnd);

            // Deja de observar el elemento
            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.2 } // Se activa cuando el 20% del elemento es visible
    );

    // Observa cada tarjeta
    cards.forEach((card: Element) => {
      observer.observe(card);
    });
  }

  private initializeParticles(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('No se pudo obtener el contexto 2D del canvas.');
      return;
    }

    const particles: Particle[] = [];
    const colors = ['#00bcd4', '#ff9800', '#ff5722', '#03a9f4'];

    function resizeCanvas(): void {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      velocityX: number;
      velocityY: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 3 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.velocityX = (Math.random() - 0.5) * 2;
        this.velocityY = (Math.random() - 0.5) * 2;
      }

      draw(): void {
        if (!ctx) {
          console.error('No se pudo obtener el contexto 2D del canvas.');
          return;
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      }

      update(): void {
        this.x += this.velocityX;
        this.y += this.velocityY;

        if (this.x < 0 || this.x > canvas.width) this.velocityX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.velocityY *= -1;

        this.draw();
      }
    }

    for (let i = 0; i < 100; i++) {
      particles.push(new Particle());
    }

    function animate(): void {
      if (!ctx) {
        console.error('No se pudo obtener el contexto 2D del canvas.');
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => particle.update());
      requestAnimationFrame(animate);
    }

    animate();
  }

  @ViewChildren('animatedBox') animatedBoxes!: QueryList<ElementRef>;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.checkVisibility();
  }

  checkVisibility(): void {
    this.animatedBoxes.forEach(box => {
      const element = box.nativeElement;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Detectar si el elemento está en la vista
      if (rect.top >= 0 && rect.top <= windowHeight) {
        element.classList.add('visible'); // Activar la animación
      } else {
        element.classList.remove('visible'); // Ocultar si está fuera de vista
      }
    });
  }
}
