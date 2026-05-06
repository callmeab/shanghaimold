import { Component, OnInit, HostListener, ElementRef, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import gsap from 'gsap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, AfterViewInit {
  isScrolled = false;
  isMenuOpen = false;

  menuItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Contact', path: '/contact' }
  ];

  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
    this.cdr.detectChanges();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.initialAnimations();
    this.cdr.detectChanges();
  }

  initialAnimations() {
    const tl = gsap.timeline();

    // Fade in navbar from top
    tl.from('.navbar', {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: 'power4.out'
    });

    // Stagger menu items
    tl.from('.menu-item', {
      y: -20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    }, '-=0.4');
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.cdr.detectChanges();

    if (this.isMenuOpen) {
      setTimeout(() => {
        gsap.from('.mobile-menu', {
          x: '100%',
          duration: 0.5,
          ease: 'power2.out'
        });

        gsap.from('.mobile-menu-item', {
          x: 50,
          opacity: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.2
        });
        this.cdr.detectChanges();
      }, 0);
    }
  }
}

