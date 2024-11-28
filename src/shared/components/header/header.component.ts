import { NgIf } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  showDropdown = false;
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const navbar: HTMLElement = this.el.nativeElement.querySelector('.ic-navbar');
    const navbarToggler: HTMLElement | null = navbar.querySelector(
      '[data-web-toggle="navbar-collapse"]'
    );

    if (navbarToggler) {
      this.renderer.listen(navbarToggler, 'click', () => {
        const dataTarget = navbarToggler.getAttribute('data-web-target');
        const targetElement = document.getElementById(dataTarget || '');
        const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';

        if (!targetElement) {
          return;
        }

        if (navbar.classList.contains('menu-show')) {
          this.renderer.removeClass(navbar, 'menu-show');
        } else {
          this.renderer.addClass(navbar, 'menu-show');
        }
        navbarToggler.setAttribute('aria-expanded', (!isExpanded).toString());
        navbarToggler.innerHTML = navbar.classList.contains('menu-show')
          ? '<i class="lni lni-close"></i>'
          : '<i class="lni lni-menu"></i>';
      });

      window.addEventListener('scroll', () => {
        if (window.scrollY >= 72) {
          this.renderer.addClass(navbar, 'sticky');
        } else {
          this.renderer.removeClass(navbar, 'sticky');
        }
      });
    }
  }
}
