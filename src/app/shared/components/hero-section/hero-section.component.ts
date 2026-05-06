import { Component, Input, OnInit, AfterViewInit, ElementRef, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImageLoaderDirective } from '../../directives/image-loader.directive';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterLink, ImageLoaderDirective],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() title: string = 'Welcome to My Portfolio';
  @Input() subtitle: string = 'Crafting digital experiences through code and design.';
  @Input() backgroundImage: string = '';
  @Input() ctaButtons: {text: string, link: string}[] = [];

  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.initHeroAnimations();
      this.initParallax();
      this.cdr.detectChanges();
    }, 100);
  }

  ngOnDestroy() {
    ScrollTrigger.getAll().forEach(t => t.kill());
  }

  private initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });

    // Heading: fade in + slide up (delay: 0.5s)
    tl.from('.hero-title', {
      y: 50,
      opacity: 0,
    }, 0.5);

    // Subheading: fade in
    tl.from('.hero-subtitle', {
      y: 20,
      opacity: 0,
    }, 0.8);

    // Buttons: fade in + slide up with stagger limit
    tl.from('.cta-btn', {
      y: 30,
      opacity: 0,
      stagger: 0.3
    }, 1.1);
  }

  private initParallax() {
    gsap.to('.hero-bg', {
      yPercent: 50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-container',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  scrollToNext() {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  }
}
