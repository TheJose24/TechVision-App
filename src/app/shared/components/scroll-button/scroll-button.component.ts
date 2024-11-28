import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-button',
  standalone: true,
  templateUrl: './scroll-button.component.html',
})
export class ScrollButtonComponent implements OnInit {
  ngOnInit(): void {
    const st = document.querySelector('[data-web-trigger=scroll-top]');

    if (st) {
      window.onscroll = function () {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
          if (st) {
            st.classList.remove('is-hided');
          }
        } else {
          if (st) {
            st.classList.add('is-hided');
          }
        }
      };

      st.addEventListener('click', function () {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });
    }
  }
}
