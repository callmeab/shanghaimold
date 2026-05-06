import { Routes } from '@angular/router';
import { HomeResolver } from './core/resolvers/home.resolver';
import { ServicesResolver } from './core/resolvers/services.resolver';
import { PortfolioResolver } from './core/resolvers/portfolio.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.Home),
    resolve: { data: HomeResolver },
    data: { preload: true, animation: 'HomePage' }
  },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent), data: { animation: 'AboutPage' } },
  {
    path: 'portfolio',
    loadComponent: () => import('./pages/portfolio/portfolio.component').then(m => m.Portfolio),
    resolve: { data: PortfolioResolver },
    data: { preload: true, animation: 'PortfolioPage' }
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services').then(m => m.ServicesComponent),
    resolve: { data: ServicesResolver },
    data: { preload: true, animation: 'ServicesPage' }
  },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact').then(m => m.ContactComponent), data: { preload: true, animation: 'ContactPage' } },
  { path: '**', redirectTo: '' }
];
