import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({
  ease: 'power2.out',
  duration: 0.8
});

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
