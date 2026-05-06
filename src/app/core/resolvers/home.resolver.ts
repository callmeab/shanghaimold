import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeResolver implements Resolve<any> {
  resolve(): Observable<any> {
    const projects$ = of([
      { title: 'Modern E-commerce Platform', category: 'Development', image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1600' },
      { title: 'AI-Driven Analytics Dashboard', category: 'Design', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600' },
      { title: 'High-End Branding Project', category: 'Branding', image: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&q=80&w=1600' }
    ]).pipe(delay(300));

    const services$ = of([
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
    ]).pipe(delay(300));

    const stats$ = of([
      { label: 'Years of Experience', value: 40, suffix: '+', color: '#F59E0B' },
      { label: 'Manufacturing Facilities', value: 4, suffix: '', color: '#3B82F6' },
      { label: 'Global Clients', value: 500, suffix: '+', color: '#10B981' },
      { label: 'Projects Completed', value: 10000, suffix: '+', color: '#8B5CF6' }
    ]).pipe(delay(300));

    return forkJoin({
      projects: projects$,
      services: services$,
      stats: stats$
    });
  }
}
