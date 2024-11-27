import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ScrollButtonComponent } from '../../shared/components/scroll-button/scroll-button.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ScrollButtonComponent, LoaderComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  ngOnInit(): void {
    const webTheme = document.querySelector('[data-web-trigger="web-theme"]') as HTMLElement;
    const html = document.querySelector('html') as HTMLElement;

    window.addEventListener('load', () => {
      let theme = localStorage.getItem('TechVision_WebTheme');

      if (theme === 'light') {
        webTheme.innerHTML = '<i class="lni lni-sun"></i>';
      } else if (theme === 'dark') {
        webTheme.innerHTML = '<i class="lni lni-night"></i>';
      } else {
        theme = 'light';
        localStorage.setItem('TechVision_WebTheme', theme);
        webTheme.innerHTML = '<i class="lni lni-night"></i>';
      }

      html.dataset['webTheme'] = theme;
    });

    webTheme.addEventListener('click', () => {
      let theme = localStorage.getItem('TechVision_WebTheme');

      webTheme.innerHTML =
        theme === 'dark' ? '<i class="lni lni-sun"></i>' : '<i class="lni lni-night"></i>';
      theme = theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('TechVision_WebTheme', theme);
      html.dataset['webTheme'] = theme;
    });
  }
}
