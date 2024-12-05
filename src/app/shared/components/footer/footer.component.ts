import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './footer.component.html',
  styles: [
    `
      :host {
        display: block;
      }

      .submit-button {
        position: relative;
        overflow: hidden;
      }

      .button-content {
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s ease;
      }

      .success .button-content {
        transform: translateY(-100%);
      }

      .button-states {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        height: 200%;
      }

      .button-state {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .loading-state .svg-wrapper-1 .svg-wrapper {
        animation: fly-1 0.6s ease-in-out infinite alternate;
      }

      .loading-state .svg-wrapper-1 .svg-wrapper svg {
        transform: translateX(-2.5em) rotate(45deg) scale(1.1);
      }

      .loading-state span {
        transform: translateX(15em);
      }

      @keyframes fly-1 {
        from {
          transform: translateY(0.15em);
        }
        to {
          transform: translateY(-0.15em);
        }
      }

      @keyframes checkmark {
        0% {
          transform: scale(0);
        }
        60% {
          transform: scale(1.2);
        }
        100% {
          transform: scale(1);
        }
      }

      .success-state svg {
        animation: checkmark 0.4s ease-in-out forwards;
      }
    `,
  ],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  isLoading = false;
  isSuccess = false;

  newsletterForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  socialLinks = [
    { icon: 'lni lni-facebook-fill', url: 'https://facebook.com' },
    { icon: 'lni lni-twitter-original', url: 'https://twitter.com' },
    { icon: 'lni lni-linkedin-original', url: 'https://linkedin.com' },
    { icon: 'lni lni-github-original', url: 'https://github.com' },
  ];

  companyLinks = [
    { label: 'Blog', path: '/blog' },
    { label: 'Contacto', path: '/contacto' },
  ];

  services = [
    { label: 'Apps Móviles', path: '/app-moviles' },
    { label: 'Páginas Web', path: '/paginas-web' },
    { label: 'Soporte Técnico', path: '/soporte-tecnico' },
  ];

  legalLinks = [
    { label: 'Política de Privacidad', path: '/politica-privacidad' },
    { label: 'Noticias Legales', path: '/noticias-legales' },
    { label: 'Términos de Servicio', path: '/terminos-servicio' },
  ];

  async onSubscribe(): Promise<void> {
    if (this.newsletterForm.invalid || this.isLoading) return;

    this.isLoading = true;
    try {
      await new Promise(resolve => setTimeout(resolve, 4000));
      this.isSuccess = true;
    } catch (error) {
      alert('Error al suscribirse. Inténtalo de nuevo.');
    } finally {
      setTimeout(() => {
        this.resetForm();
      }, 2000);
      this.isLoading = false;
    }
  }

  private resetForm(): void {
    this.isSuccess = false;
    this.newsletterForm.reset();
  }
}
