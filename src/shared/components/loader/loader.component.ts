import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  templateUrl: './loader.component.html',
})
export class LoaderComponent implements OnInit {
  ngOnInit(): void {
    const pageLoading = document.querySelector('.page-loading') as HTMLElement;

    if (pageLoading) {
      window.addEventListener('load', () => {
        pageLoading.classList.add('hide');

        setTimeout(() => {
          pageLoading.style.display = 'none';
        }, 1000);
      });
    }
  }
}
