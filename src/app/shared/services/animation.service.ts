import { Injectable, OnDestroy } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({
  providedIn: 'root'
})
export class AnimationService implements OnDestroy {
  private triggers: ScrollTrigger[] = [];

  constructor() {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load'
    });
  }

  initScrollAnimations() {
    ScrollTrigger.refresh();
  }

  fadeInOnScroll(selector: string, options = {}) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) {
      return;
    }

    elements.forEach((element) => {
      const trigger = ScrollTrigger.create({
        trigger: element,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            ...options
          });
        },
        once: true
      });
      this.triggers.push(trigger);
    });
  }

  killAll() {
    this.triggers.forEach((trigger) => trigger.kill());
    this.triggers = [];
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }

  ngOnDestroy() {
    this.killAll();
  }
}
