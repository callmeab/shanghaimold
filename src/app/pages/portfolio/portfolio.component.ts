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
  category: 'Medical Molds' | 'Packaging Molds' | 'Personal Care Molds' | 'Electronic Molds' | 'Automotive Molds' | 'Home Appliance Molds' | 'Special Molds';
  client: string;
  image: string;
  description: string;
  year: number;
}

export type FilterCategory = 'All' | 'Medical Molds' | 'Packaging Molds' | 'Personal Care Molds' | 'Electronic Molds' | 'Automotive Molds' | 'Home Appliance Molds' | 'Special Molds';

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
  categories: FilterCategory[] = [
    'All',
    'Medical Molds',
    'Packaging Molds',
    'Personal Care Molds',
    'Electronic Molds',
    'Automotive Molds',
    'Home Appliance Molds',
    'Special Molds'
  ];
  activeFilter = signal<FilterCategory>('All');
  isFiltering = signal(false);

  // ─── Modal State ─────────────────────────────────────────────────────────────
  selectedProject = signal<Project | null>(null);
  isModalOpen = signal(false);

  // ─── Project Data (Based on Your Services) ────────────────────────────────────
allProjects: Project[] = [
  // ================= MEDICAL MOLDS =================
  {
    id: 1,
    title: 'Test Tube Series',
    category: 'Medical Molds',
    client: 'MedTech',
    year: 2024,
    image: '/TestTubeSeries.webp',
    description: '32/64/128 cavity molds with fully hot half valve gate system and large-scale production capability.'
  },
  {
    id: 2,
    title: 'SARS-CoV-2 Test',
    category: 'Medical Molds',
    client: 'BioLab',
    year: 2024,
    image: '/SARS-CoV-2Test.webp',
    description: '32/16 cavity mold with optimized design and successful first-time assembly testing.'
  },
  {
    id: 3,
    title: 'PCR Plate Series',
    category: 'Medical Molds',
    client: 'HealthTech',
    year: 2023,
    image: '/PCRPlateSeries.webp',
    description: '96-tube overflow runner system with 0.25mm thin-wall precision and 100+ mold experience.'
  },
  {
    id: 4,
    title: 'Reaction Cup Series',
    category: 'Medical Molds',
    client: 'LabPro',
    year: 2023,
    image: '/Reaction Cup Series.webp',
    description: '64/32 cavity molds with hot valve gate, zero defects, and industry-leading cycle time.'
  },
  {
    id: 5,
    title: 'Vein Detained Needle',
    category: 'Medical Molds',
    client: 'MedCore',
    year: 2023,
    image: '/Vein Detained Needle.webp',
    description: 'Advanced hot runner technology with 5x higher efficiency and high-temperature material support.'
  },
  {
    id: 6,
    title: 'Safe Blood Collection Set',
    category: 'Medical Molds',
    client: 'SafeMed',
    year: 2024,
    image: '/Safe Blood Collection Set.webp',
    description: 'Quick development molds with low maintenance and fast production cycles.'
  },
  {
    id: 7,
    title: 'Luer Adapter',
    category: 'Medical Molds',
    client: 'PrecisionMed',
    year: 2024,
    image: '/Luer Adapter.webp',
    description: 'High-quality adapter molds with emergency supply capability and high efficiency.'
  },
  {
    id: 8,
    title: 'Urinary Catheter',
    category: 'Medical Molds',
    client: 'CareMed',
    year: 2023,
    image: '/Urinary Catheter.webp',
    description: 'Smart design molds minimizing downtime with reliable production performance.'
  },
  {
    id: 9,
    title: 'Syringes Series',
    category: 'Medical Molds',
    client: 'GlobalMed',
    year: 2024,
    image: '/Syringes Series.webp',
    description: 'Multi-size syringe molds (1ml–60ml) with modular design and high efficiency.'
  },
  {
    id: 10,
    title: 'Safe Needle',
    category: 'Medical Molds',
    client: 'HealthLine',
    year: 2024,
    image: '/Safe Needle.png',
    description: 'Long-life molds with high stability, intensive cooling, and short cycle time.'
  },

  // ================= PACKAGING =================
  {
    id: 11,
    title: 'FT Cap',
    category: 'Packaging Molds',
    client: 'PackPro',
    year: 2024,
    image: '/FT Cap.webp',
    description: '24+24 stack mold with hot runner system and high-speed production.'
  },
  {
    id: 12,
    title: 'Infant Formula Cap',
    category: 'Packaging Molds',
    client: 'NutriPack',
    year: 2023,
    image: '/Infant Formula.webp',
    description: '4 or 4+4 cavity mold with fast version change and optimized cycle time.'
  },
  {
    id: 13,
    title: 'Water & Milk Cap',
    category: 'Packaging Molds',
    client: 'AquaPack',
    year: 2023,
    image: '/Water gallon & Milk cap.jpg',
    description: 'Single and bi-injection molds with fast development capability.'
  },
  {
    id: 14,
    title: 'Juice & Sport Cap',
    category: 'Packaging Molds',
    client: 'FreshCap',
    year: 2024,
    image: '/Juice & Sport cap.webp',
    description: '48+48 cavity stack mold with servo ejection and quick switching.'
  },
  {
    id: 15,
    title: 'Oil Cap with Pull Ring',
    category: 'Packaging Molds',
    client: 'OilPack',
    year: 2023,
    image: '/Oil cap with pull ring.jpg',
    description: '32/48 cavity molds with high-speed production and precision design.'
  },
  {
    id: 16,
    title: 'Full Servo IMC FT Cap',
    category: 'Packaging Molds',
    client: 'AdvancedPack',
    year: 2024,
    image: '/Full servo IMC FT cap.jpg',
    description: 'Servo-based IMC mold with unscrewing and slider integration.'
  },
  {
    id: 17,
    title: 'Flip Top Cap with TE',
    category: 'Packaging Molds',
    client: 'SmartPack',
    year: 2024,
    image: '/Flip Top Cap with TE.webp',
    description: '32 cavity mold with in-mold closing and TE functionality.'
  },

  // ================= PERSONAL CARE =================
  {
    id: 18,
    title: 'Electric Toothbrush',
    category: 'Personal Care Molds',
    client: 'CarePlus',
    year: 2023,
    image: '/Electric toothbrush series.webp',
    description: 'Automated production molds with EOAT integration and precision finishing.'
  },
  {
    id: 19,
    title: 'Shaver Series',
    category: 'Personal Care Molds',
    client: 'GroomTech',
    year: 2023,
    image: '/Shaver series.jpg',
    description: 'Efficient mold design with reduced cycle time and high durability.'
  },
  {
    id: 20,
    title: '2K Mold Series',
    category: 'Personal Care Molds',
    client: 'DualTech',
    year: 2024,
    image: '/2K molds series.webp',
    description: 'Multi-material mold design ensuring strong adhesion and precision.'
  },
  {
    id: 21,
    title: 'Multi-Cavity Series',
    category: 'Personal Care Molds',
    client: 'PrecisionCare',
    year: 2024,
    image: '/Multi Cavities series.jpg',
    description: 'High-precision molds with long lifecycle and consistent output.'
  },

  // ================= ELECTRONICS =================
  {
    id: 22,
    title: 'Case & Cover',
    category: 'Electronic Molds',
    client: 'TechNova',
    year: 2024,
    image: '/Case&Cover.jpg',
    description: 'High precision molds with strict tolerance and dimensional accuracy.'
  },
  {
    id: 23,
    title: 'Sockets',
    category: 'Electronic Molds',
    client: 'ElectroCore',
    year: 2024,
    image: '/Sockets.webp',
    description: 'Multi-cavity socket molds with high consistency and durability.'
  },
  {
    id: 24,
    title: 'Cover Plates',
    category: 'Electronic Molds',
    client: 'PlateTech',
    year: 2023,
    image: '/Cover Plates.webp',
    description: 'High polishing and textured finishing with stack mold expertise.'
  },
  {
    id: 25,
    title: '2K Electronic Mold',
    category: 'Electronic Molds',
    client: 'DualElec',
    year: 2024,
    image: '/2K molds.jpg',
    description: 'Advanced 2K mold design for multi-material electronics.'
  },
  {
    id: 26,
    title: 'High-Temperature Tools',
    category: 'Electronic Molds',
    client: 'HeatTech',
    year: 2024,
    image: '/Multi Cavities&High terperature tools.jpg',
    description: 'Precision molds for high-temperature applications with zero defects.'
  },

  // ================= AUTOMOTIVE =================
  {
    id: 27,
    title: 'Truck Fender',
    category: 'Automotive Molds',
    client: 'AutoBuild',
    year: 2023,
    image: '/Truck Fender.jpg',
    description: 'Heavy-duty molds designed for durability and large automotive parts.'
  },
  {
    id: 28,
    title: 'Instrument Panel',
    category: 'Automotive Molds',
    client: 'AutoTech',
    year: 2023,
    image: '/Instrument Panel.jpg',
    description: 'Complex molds with high surface finish and 100+ project experience.'
  },
  {
    id: 29,
    title: 'Car Cross Beam',
    category: 'Automotive Molds',
    client: 'AutoLight',
    year: 2024,
    image: '/Car Cross Beam.jpg',
    description: 'Lightweight integrated mold solutions for automotive structures.'
  },

  // ================= HOME APPLIANCE =================
  {
    id: 30,
    title: 'Refrigerator Drawer',
    category: 'Home Appliance Molds',
    client: 'ApplianceCorp',
    year: 2024,
    image: '/Refrigerator Drawer.jpg',
    description: 'High transparency molds with perfect finishing and T2 validation.'
  },
  {
    id: 31,
    title: 'Auto Mower',
    category: 'Home Appliance Molds',
    client: 'SmartHome',
    year: 2024,
    image: '/Auto Mower.jpg',
    description: 'Complex structure molds with high precision and surface quality.'
  },
  {
    id: 32,
    title: 'Coffee Machine',
    category: 'Home Appliance Molds',
    client: 'KitchenTech',
    year: 2024,
    image: '/Coffee Machine.jpg',
    description: 'High fitting accuracy molds for complex appliance components.'
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
      // Intentionally skipping resolved.projects to ensure the updated mold-focused local data is used.
    });
    this.loadingService.show();
    this.loadData();
  }

  ngAfterViewInit() {
    this.waitForImages().then(() => {
      if (this.destroyed) return;
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
        this.cdr.detectChanges();

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
      'Medical Molds': '<i class="bi bi-bandaid"></i>',
      'Packaging Molds': '<i class="bi bi-box-seam"></i>',
      'Personal Care Molds': '<i class="bi bi-person-heart"></i>',
      'Electronic Molds': '<i class="bi bi-cpu"></i>',
      'Automotive Molds': '<i class="bi bi-car-front"></i>',
      'Home Appliance Molds': '<i class="bi bi-house-heart"></i>',
      'Special Molds': '<i class="bi bi-nut"></i>'
    };
    return icons[cat] || '<i class="bi bi-grid"></i>';
  }

  getBorderColor(cat: string): string {
    const borders: Record<string, string> = {
      'Medical Molds': 'hover:border-t-sky-500',
      'Packaging Molds': 'hover:border-t-orange-500',
      'Personal Care Molds': 'hover:border-t-pink-500',
      'Electronic Molds': 'hover:border-t-blue-500',
      'Automotive Molds': 'hover:border-t-emerald-500',
      'Home Appliance Molds': 'hover:border-t-amber-600',
      'Special Molds': 'hover:border-t-purple-500'
    };
    return borders[cat] || 'hover:border-t-gray-500';
  }

  trackByProject(_i: number, project: Project) {
    return project.id;
  }

  private loadData() {
    setTimeout(() => {
      if (this.destroyed) return;
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
    if (this.destroyed) return;

    setTimeout(() => {
      if (this.destroyed) return;
      gsap.fromTo('.project-card',
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
      );
      this.cdr.detectChanges();
    }, 100);
  }
}