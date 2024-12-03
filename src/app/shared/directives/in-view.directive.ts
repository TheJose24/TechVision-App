import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appInView]',
  standalone: true,
})
export class InViewDirective implements OnInit, OnDestroy {
  @Output() inView = new EventEmitter<boolean>();
  @Input() threshold = 0.1;
  @Input() rootMargin = '0px';

  private observer?: IntersectionObserver;
  private isIntersecting = false;

  constructor(private element: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const options: IntersectionObserverInit = {
      threshold: this.threshold,
      rootMargin: this.rootMargin,
    };

    this.setupIntersectionObserver(options);
  }

  private setupIntersectionObserver(options: IntersectionObserverInit): void {
    this.observer = new IntersectionObserver(([entry]) => {
      const nowIntersecting = entry.isIntersecting;
      if (this.isIntersecting !== nowIntersecting) {
        this.isIntersecting = nowIntersecting;
        this.inView.emit(nowIntersecting);
      }
    }, options);

    this.observer.observe(this.element.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = undefined;
    }
  }
}
