import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
  signal,
  computed,
  HostListener,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import gsap from 'gsap';
import { ImageLoaderDirective } from '../../shared/directives/image-loader.directive';
import { LoadingService } from '../../shared/services/loading.service';

export interface Project {
  id: number;
  title: string;
  category: 'Automotive' | 'Medical' | 'Electronics' | 'Consumer Products';
  client: string;
  image: string;
  description: string;
  year: number;
}

export type FilterCategory = 'All' | 'Automotive' | 'Medical' | 'Electronics' | 'Consumer Products';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, ImageLoaderDirective],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Portfolio implements OnInit, AfterViewInit, OnDestroy {
  isDataLoaded = false;
  imagesLoaded = false;
  private destroyed = false;

  // ─── Filter State ────────────────────────────────────────────────────────────
  categories: FilterCategory[] = ['All', 'Automotive', 'Medical', 'Electronics', 'Consumer Products'];
  activeFilter = signal<FilterCategory>('All');
  isFiltering = signal(false);

  // ─── Modal State ─────────────────────────────────────────────────────────────
  selectedProject = signal<Project | null>(null);
  isModalOpen = signal(false);

  // ─── Project Data ────────────────────────────────────────────────────────────
  allProjects: Project[] = [
    {
      id: 1,
      title: 'Automotive Dashboard Component',
      category: 'Automotive',
      client: 'BMW Group',
      year: 2023,
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80',
      description: 'High-precision injection molded dashboard component integrating seamless mounting clips requiring extreme structural tolerances.'
    },
    {
      id: 2,
      title: 'Surgical Toolkit Casing',
      category: 'Medical',
      client: 'MedTech Solutions',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80',
      description: 'ISO-certified cleanroom manufacturing of complex polycarbonate surgical components allowing high-heat sterilization.'
    },
    {
      id: 3,
      title: 'Smart Home Hub Shielding',
      category: 'Electronics',
      client: 'Alpha Electronics',
      year: 2023,
      image: 'https://images.unsplash.com/photo-1558346490-a72e53ae5003?auto=format&fit=crop&w=900&q=80',
      description: 'Custom conductive overmolding shielding vital internal PCB components from external RF interference successfully.'
    },
    {
      id: 4,
      title: 'Luxury Kitchen Appliance Base',
      category: 'Consumer Products',
      client: 'ChefLine Pro',
      year: 2022,
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80',
      description: 'High-gloss exterior appliance mold integrating thick-wall cooling techniques ensuring zero-sink aesthetic limits.'
    },
    {
      id: 5,
      title: 'EV Battery Housing',
      category: 'Automotive',
      client: 'Tesla Motors',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=80',
      description: 'Heavy duty, flame-retardant injection molded structural battery containment unit with advanced cooling channels.'
    },
    {
      id: 6,
      title: 'Insulin Delivery Pen',
      category: 'Medical',
      client: 'BioPharma Inc',
      year: 2023,
      image: 'https://images.unsplash.com/photo-1628348070830-4e365ad4830b?auto=format&fit=crop&w=900&q=80',
      description: 'Multi-cavity high volume micro-molding ensuring exceptional dose accuracy for portable insulin delivery pens.'
    }
  ];

  // ─── Computed Filtered Projects ───────────────────────────────────────────────
  filteredProjects = computed(() => {
    const cat = this.activeFilter();
    return cat === 'All'
      ? this.allProjects
      : this.allProjects.filter(p => p.category === cat);
  });

  constructor(
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {}

  // ─── Lifecycle ────────────────────────────────────────────────────────────────
  ngOnInit() {
    this.route.data.subscribe((data) => {
      const resolved = data['data'];
      if (resolved?.projects?.length) {
        this.allProjects = resolved.projects;
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
    gsap.killTweensOf('.project-card');
  }

  // ─── Filter Logic ─────────────────────────────────────────────────────────────
  setFilter(category: FilterCategory) {
    if (this.activeFilter() === category || this.isFiltering()) return;
    this.isFiltering.set(true);

    gsap.to('.project-card', {
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        this.activeFilter.set(category);
        this.cdr.detectChanges(); // Trigger Angular to render new items

        setTimeout(() => {
          gsap.fromTo('.project-card', 
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.5)', clearProps: 'all' }
          );
          this.isFiltering.set(false);
          this.cdr.detectChanges();
        }, 0);
      }
    });
  }

  // ─── Modal Logic ──────────────────────────────────────────────────────────────
  openModal(project: Project) {
    this.selectedProject.set(project);
    this.isModalOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen.set(false);
    setTimeout(() => {
      this.selectedProject.set(null);
      document.body.style.overflow = '';
      this.cdr.detectChanges();
    }, 300);
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isModalOpen()) this.closeModal();
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────────
  getCategoryIcon(cat: FilterCategory | string): string {
    const icons: Record<string, string> = {
      'Automotive': '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 002 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>',
      'Medical': '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19.5 10.5c.35-1.65-.25-3.41-1.61-4.47a4.9 4.9 0 00-6.07-.3L12 5.9l.18-.17a4.9 4.9 0 00-6.07.3c-1.36 1.06-1.96 2.82-1.61 4.47V12l7.5 7.5L19.5 12v-1.5z"/></svg>',
      'Electronics': '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>',
      'Consumer Products': '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>'
    };
    return icons[cat] || '';
  }

  getBorderColor(cat: string): string {
    const borders: Record<string, string> = {
      'Automotive': 'hover:border-t-blue-500',
      'Medical': 'hover:border-t-green-500',
      'Electronics': 'hover:border-t-purple-500',
      'Consumer Products': 'hover:border-t-orange-500'
    };
    return borders[cat] || '';
  }

  trackByProject(_i: number, project: Project) {
    return project.id;
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
      gsap.fromTo('.project-card',
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
      );
      this.cdr.detectChanges();
    }, 100);
  }
}
