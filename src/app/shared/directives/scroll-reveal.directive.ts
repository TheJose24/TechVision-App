import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import ScrollReveal from 'scrollreveal';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit {
  @Input() scrollRevealConfig: scrollReveal.ScrollRevealObjectOptions = {};

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    const defaultConfig: scrollReveal.ScrollRevealObjectOptions = {
      origin: 'bottom',
      distance: '16px',
      duration: 1000,
      delay: 0,
      reset: false,
      cleanup: true,
    };

    const sr = ScrollReveal();
    sr.reveal(this.elementRef.nativeElement, {
      ...defaultConfig,
      ...this.scrollRevealConfig,
    });
  }
}
