import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: 'img[appImageLoader]',
  standalone: true
})
export class ImageLoaderDirective implements OnInit {
  @Input() appImageLoader: string = '';
  @Input() fallbackImage: string = '/building-bg.png';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    const img = this.el.nativeElement as HTMLImageElement;

    this.renderer.addClass(img, 'image-loading');
    this.renderer.setAttribute(img, 'src', this.fallbackImage);

    if (!this.appImageLoader) {
      this.renderer.removeClass(img, 'image-loading');
      this.renderer.addClass(img, 'image-error');
      return;
    }

    const actualImg = new Image();
    actualImg.src = this.appImageLoader;

    actualImg.onload = () => {
      this.renderer.setAttribute(img, 'src', this.appImageLoader);
      this.renderer.removeClass(img, 'image-loading');
      this.renderer.addClass(img, 'image-loaded');
    };

    actualImg.onerror = () => {
      this.renderer.removeClass(img, 'image-loading');
      this.renderer.addClass(img, 'image-error');
    };
  }
}
