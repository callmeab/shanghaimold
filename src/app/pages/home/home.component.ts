import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HeroSectionComponent } from '../../shared/components/hero-section/hero-section.component';
import { ImageLoaderDirective } from '../../shared/directives/image-loader.directive';
import { AnimationService } from '../../shared/services/animation.service';
import { LoadingService } from '../../shared/services/loading.service';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Swiper from 'swiper';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, HeroSectionComponent, ImageLoaderDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  isDataLoaded = false;
  imagesLoaded = false;
  private destroyed = false;

  // Hero Data
  heroTitle = 'Precision Engineering & Manufacturing Solutions';
  heroSubtitle = 'Delivering Excellence in Injection Molding Since 1983';
  heroImage = '';
  heroButtons = [
    { text: 'Explore Our Services', link: '/services' },
    { text: 'View Projects', link: '/portfolio' }
  ];

  // Stats Data
  stats = [
    { 
      label: 'Years of Experience', 
      value: 40, 
      suffix: '+', 
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />', 
      color: '#F59E0B' 
    },
    { 
      label: 'Manufacturing Facilities', 
      value: 4, 
      suffix: '', 
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m3-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />', 
      color: '#3B82F6' 
    },
    { 
      label: 'Global Clients', 
      value: 500, 
      suffix: '+', 
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />', 
      color: '#10B981' 
    },
    { 
      label: 'Projects Completed', 
      value: 10000, 
      suffix: '+', 
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />', 
      color: '#8B5CF6' 
    }
  ];

  // Services Data
  services = [
    { 
      title: 'Mold Design & Engineering', 
      description: 'Advanced CAD/CAM design, 3D modeling, and precision tooling for complex injection molds',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />',
      features: ['Custom mold design', 'Rapid prototyping', 'DFM analysis', 'Tool validation']
    },
    { 
      title: 'Injection Molding Manufacturing', 
      description: 'High-precision injection molding services with state-of-the-art equipment and quality control',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m3-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />',
      features: ['Multi-cavity molds', 'Insert molding', 'Overmolding', 'High-volume production']
    },
    { 
      title: 'Quality Assurance & Testing', 
      description: 'Comprehensive quality control with advanced testing equipment and ISO certifications',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />',
      features: ['CMM inspection', 'Material testing', 'Performance validation', 'ISO 9001 certified']
    }
  ];

  // Projects Data
  projects = [
    { title: 'Modern E-commerce Platform', category: 'Development', image: '/home-page-1st.avif' },
    { title: 'AI-Driven Analytics Dashboard', category: 'Design', image: '/home-page-2nd.avif' },
    { title: 'High-End Branding Project', category: 'Branding', image: '/home-page-3rd.avif' }
  ];

  // Testimonials Data
  testimonials = [
    { text: 'Working with this team was a game-changer for our business. Their attention to detail and creative vision is unmatched.', name: 'Sarah Johnson', role: 'CEO, TechFlow', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200' },
    { text: 'The end result exceeded our expectations. Professional, efficient, and highly skilled in every aspect of our collaboration.', name: 'Michael Chen', role: 'Design Director, Innovate', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200' }
  ];

  private swipers: Swiper[] = [];

  constructor(
    private route: ActivatedRoute,
    private animationService: AnimationService,
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      const resolved = data['data'];
      if (resolved) {
        this.projects = resolved.projects ?? this.projects;
        this.services = resolved.services ?? this.services;
        this.stats = resolved.stats ?? this.stats;
        this.cdr.detectChanges();
      }
    });
    this.loadingService.show();
    this.loadData();
  }

  ngAfterViewInit() {
    this.waitForImages().then(() => {
      if (this.destroyed) {
        return;
      }
      this.imagesLoaded = true;
      this.initAnimations();
      this.loadingService.hide();
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.destroyed = true;
    this.animationService.killAll();
    ScrollTrigger.getAll().forEach(t => t.kill());
    this.swipers.forEach(s => s.destroy());
  }

  private loadData() {
    setTimeout(() => {
      if (this.destroyed) {
        return;
      }
      this.isDataLoaded = true;
      this.cdr.detectChanges();
    }, 100);
  }

  private waitForImages(): Promise<void> {
    return new Promise((resolve) => {
      const images = document.querySelectorAll('img');
      if (images.length === 0) {
        resolve();
        return;
      }

      let loadedCount = 0;
      const totalImages = images.length;
      let resolved = false;
      const tryResolve = () => {
        if (!resolved && loadedCount >= totalImages) {
          resolved = true;
          resolve();
        }
      };

      images.forEach((img) => {
        const image = img as HTMLImageElement;
        if (image.complete) {
          loadedCount++;
          tryResolve();
        } else {
          image.addEventListener('load', () => {
            loadedCount++;
            tryResolve();
          }, { once: true });
          image.addEventListener('error', () => {
            loadedCount++;
            tryResolve();
          }, { once: true });
        }
      });

      setTimeout(() => {
        if (!resolved) {
          resolved = true;
          resolve();
        }
      }, 5000);
    });
  }

  private initAnimations() {
    if (this.destroyed) {
      return;
    }

    setTimeout(() => {
      if (this.destroyed) {
        return;
      }
      requestAnimationFrame(() => {
        this.animationService.initScrollAnimations();
        this.animationService.fadeInOnScroll('.hero-text');
        this.animationService.fadeInOnScroll('.about-text');
        this.cdr.detectChanges();
      });
      this.initScrollAnimations();
      this.initSwipers();
      this.cdr.detectChanges();
    }, 100);
  }

  private initScrollAnimations() {
    // 2. About Preview
    gsap.from('.about-text', {
      scrollTrigger: { trigger: '.about-preview', start: 'top 80%' },
      x: -100,
      opacity: 0,
      duration: 1.2,
      ease: 'power2.out'
    });

    gsap.from('.about-image', {
      scrollTrigger: { trigger: '.about-preview', start: 'top 80%' },
      x: 100,
      scale: 1.1,
      opacity: 0,
      duration: 1.2,
      ease: 'power2.out'
    });

    // About Image Overlay Stats Cards
    gsap.fromTo('.stat-overlay', 
      { y: 30, opacity: 0 },
      {
        scrollTrigger: { trigger: '.about-image', start: 'top 50%' },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        onStart: () => {
          const overlays = document.querySelectorAll('.count-overlay');
          overlays.forEach(counter => {
            const target = +counter.getAttribute('data-target')!;
            gsap.fromTo(counter, 
              { innerText: 0 }, 
              { 
                innerText: target,
                duration: 2.5,
                snap: { innerText: 1 },
                ease: 'power2.out'
              }
            );
          });
        }
      }
    );

    // 3. Stats Counter
    ScrollTrigger.create({
      trigger: '.stats-section',
      start: 'top 70%', // 30% visible = trigger logic
      onEnter: () => {
        let completedAnimations = 0;
        const totalCounters = document.querySelectorAll('.count-up').length;

        const counters = document.querySelectorAll('.count-up');
        counters.forEach((counter) => {
          const target = +counter.getAttribute('data-target')!;
          const parentBlock = counter.closest('.stat-card');
          const suffixSpan = parentBlock?.querySelector('.stat-suffix');
          const iconSpan = parentBlock?.querySelector('.stat-icon');

          gsap.to(counter, {
            innerText: target,
            duration: 2.5,
            snap: { innerText: 1 },
            ease: 'power2.out',
            onComplete: () => {
              // Icon Bounce effect
              if (iconSpan) {
                gsap.to(iconSpan, { scale: 1.3, duration: 0.15, yoyo: true, repeat: 1, ease: 'power1.inOut' });
              }
              // Suffix Fade-in effect
              if (suffixSpan) {
                gsap.to(suffixSpan, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' });
              }

              completedAnimations++;
              if (completedAnimations === totalCounters) {
                // Flash glow achievement unlocked
                gsap.fromTo('.stats-section', 
                  { boxShadow: 'inset 0 0 0 rgba(255,255,255,0)' },
                  { boxShadow: 'inset 0 0 50px rgba(245,158,11,0.15)', duration: 1, yoyo: true, repeat: 1 }
                );
              }
            }
          });
        });
      }
    });

    // 4. Services Grid
    gsap.from('.service-card', {
      scrollTrigger: { trigger: '.services-section', start: 'top 80%' },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out'
    });
  }

  private initSwipers() {
    this.swipers.push(new Swiper('.featured-swiper', {
      modules: [Autoplay, Pagination, Navigation],
      slidesPerView: 1,
      loop: true,
      autoplay: { 
        delay: 5000,
        disableOnInteraction: false 
      },
      pagination: { 
        el: '.swiper-pagination', 
        clickable: true 
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    }));

    this.swipers.push(new Swiper('.testimonial-swiper', {
      modules: [Autoplay, EffectFade],
      slidesPerView: 1,
      loop: true,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      autoplay: { delay: 4000 }
    }));
  }
}
