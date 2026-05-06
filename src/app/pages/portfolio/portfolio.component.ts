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
  category: 'Flying Cars' | 'Robotics' | 'Food Processing' | 'Mining' | 'Battery Tech' | 'Battery Recycling' | 'Mold Design' | 'Injection Molding' | 'Quality Control' | 'Tool Maintenance' | 'Secondary Ops' | 'Logistics';
  client: string;
  image: string;
  description: string;
  year: number;
}

export type FilterCategory = 'All' | 'Flying Cars' | 'Robotics' | 'Food Processing' | 'Mining' | 'Battery Tech' | 'Battery Recycling' | 'Mold Design' | 'Injection Molding' | 'Quality Control' | 'Tool Maintenance' | 'Secondary Ops' | 'Logistics';

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
    'Flying Cars',
    'Robotics',
    'Food Processing',
    'Mining',
    'Battery Tech',
    'Battery Recycling',
    'Mold Design',
    'Injection Molding',
    'Quality Control',
    'Tool Maintenance',
    'Secondary Ops',
    'Logistics'
  ];
  activeFilter = signal<FilterCategory>('All');
  isFiltering = signal(false);

  // ─── Modal State ─────────────────────────────────────────────────────────────
  selectedProject = signal<Project | null>(null);
  isModalOpen = signal(false);

  // ─── Project Data (Based on Your Services) ────────────────────────────────────
  allProjects: Project[] = [
    {
      id: 1,
      title: 'Electric VTOL Aircraft Development',
      category: 'Flying Cars',
      client: 'Arabian Flying Cars',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=900&q=80',
      description: 'AI-powered electric flying car with advanced aerospace engineering, autonomous navigation systems, and sustainable propulsion technology for urban air mobility.'
    },
    {
      id: 2,
      title: 'AI Robot Security System',
      category: 'Robotics',
      client: 'SecureBot Inc',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80',
      description: 'Autonomous police robot with facial recognition, threat detection, and real-time surveillance capabilities for enhanced security operations.'
    },
    {
      id: 3,
      title: 'Hotel Service Robot Suite',
      category: 'Robotics',
      client: 'Smart Hotels Group',
      year: 2023,
      image: 'https://images.unsplash.com/photo-1563207153-f403bf289096?auto=format&fit=crop&w=900&q=80',
      description: 'Integrated cleaning and delivery robots for hospitality industry with autonomous navigation, room service delivery, and sanitization systems.'
    },
    {
      id: 4,
      title: 'Industrial Seasoning System',
      category: 'Food Processing',
      client: 'SP Foods',
      year: 2023,
      image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=900&q=80',
      description: 'Automated flavor coating and seasoning machinery with precision dosing, hygiene compliance, and high-speed production capabilities.'
    },
    {
      id: 5,
      title: 'Laser Coding Machinery Line',
      category: 'Food Processing',
      client: 'PackTech Solutions',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=80',
      description: 'High-speed coding and marking systems for food packaging with batch tracking, expiry date printing, and quality assurance.'
    },
    {
      id: 6,
      title: 'Mineral Extraction Plant',
      category: 'Mining',
      client: 'GeoMinerals Corp',
      year: 2023,
      image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=900&q=80',
      description: 'Advanced ore processing facility with crushing, grinding, and separation systems for efficient mineral extraction and refinement.'
    },
    {
      id: 7,
      title: 'Lithium Battery Manufacturing Hub',
      category: 'Battery Tech',
      client: 'PowerCell Industries',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1609146835228-d0f0b5f9d79a?auto=format&fit=crop&w=900&q=80',
      description: 'Complete technology transfer for sodium-ion battery production with cleanroom facilities, electrode coating, and cell assembly lines.'
    },
    {
      id: 8,
      title: 'Battery Recycling Facility',
      category: 'Battery Recycling',
      client: 'EcoRecycle Ltd',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&q=80',
      description: 'Eco-friendly recycling plant for lead-acid, lithium, and cobalt batteries with material recovery rates exceeding 95% efficiency.'
    },
    {
      id: 9,
      title: 'Automotive Dashboard Tooling',
      category: 'Mold Design',
      client: 'Auto Components Inc',
      year: 2023,
      image: 'https://images.unsplash.com/photo-1581092918484-8313e1f7e8c4?auto=format&fit=crop&w=900&q=80',
      description: 'Complex multi-cavity mold design with advanced CAD/CAM engineering, Moldflow analysis, and DFM optimization for automotive interiors.'
    },
    {
      id: 10,
      title: 'Medical Device Components',
      category: 'Injection Molding',
      client: 'MedTech Solutions',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1579154204845-c5a9ab0a07aa?auto=format&fit=crop&w=900&q=80',
      description: 'ISO-certified cleanroom injection molding of surgical-grade components with two-shot molding and Class 8 environmental controls.'
    },
    {
      id: 11,
      title: 'Precision CMM Inspection Lab',
      category: 'Quality Control',
      client: 'QualityFirst Manufacturing',
      year: 2023,
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=80',
      description: 'State-of-the-art quality validation facility with coordinate measuring machines, SPC monitoring, and IATF 16949 compliance.'
    },
    {
      id: 12,
      title: 'Tool Room Maintenance Center',
      category: 'Tool Maintenance',
      client: 'Precision Tooling Group',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=80',
      description: 'In-house tool maintenance facility with laser welding repair, predictive maintenance systems, and tool life extension programs.'
    },
    {
      id: 13,
      title: 'Ultrasonic Welding Assembly',
      category: 'Secondary Ops',
      client: 'Assembly Tech Ltd',
      year: 2023,
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=80',
      description: 'Value-added secondary operations including ultrasonic welding, pad printing, mechanical assembly, and custom packaging solutions.'
    },
    {
      id: 14,
      title: 'Global JIT Distribution Network',
      category: 'Logistics',
      client: 'Tradebone Group LLC',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=900&q=80',
      description: 'Just-in-time delivery system with KANBAN inventory management, VMI integration, and multi-region export/import compliance.'
    },
    {
      id: 15,
      title: 'Urban Air Mobility Platform',
      category: 'Flying Cars',
      client: 'SkyTech Innovations',
      year: 2025,
      image: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=900&q=80',
      description: 'Next-generation eVTOL infrastructure with AI flight management, charging stations, and air traffic integration systems.'
    },
    {
      id: 16,
      title: 'Mineral Processing Automation',
      category: 'Mining',
      client: 'SmartMine Technologies',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=80',
      description: 'Automated mineral processing with AI-powered sorting, quality analysis, and environmental monitoring for sustainable mining operations.'
    },
    {
      id: 17,
      title: 'Solid-State Battery R&D Lab',
      category: 'Battery Tech',
      client: 'NextGen Energy',
      year: 2025,
      image: 'https://images.unsplash.com/photo-1602524201926-4e9f4fddc3b7?auto=format&fit=crop&w=900&q=80',
      description: 'Advanced solid-state battery research facility with improved energy density, safety, and long lifecycle performance.'
    },
    {
      id: 18,
      title: 'EV Battery Recycling Line',
      category: 'Battery Recycling',
      client: 'GreenCycle Systems',
      year: 2025,
      image: 'https://images.unsplash.com/photo-1593941707882-a5bba2f3c5b2?auto=format&fit=crop&w=900&q=80',
      description: 'Automated recycling line for electric vehicle batteries with material recovery optimization and environmental safety compliance.'
    },
    {
      id: 19,
      title: 'Consumer Electronics Mold Design',
      category: 'Mold Design',
      client: 'TechPlast Industries',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=900&q=80',
      description: 'High-precision mold design for mobile and consumer electronics with micro-tolerance engineering and rapid prototyping.'
    },
    {
      id: 20,
      title: 'Automotive Plastic Parts Production',
      category: 'Injection Molding',
      client: 'AutoForm Ltd',
      year: 2025,
      image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=900&q=80',
      description: 'Mass production of automotive plastic components with high-speed injection molding machines and quality consistency.'
    },
    {
      id: 21,
      title: 'AI Vision Inspection System',
      category: 'Quality Control',
      client: 'VisionTech QA',
      year: 2025,
      image: 'https://images.unsplash.com/photo-1581091012184-7f0c5c4d85d0?auto=format&fit=crop&w=900&q=80',
      description: 'AI-based defect detection system with real-time inspection, reducing human error and improving production quality.'
    },
    {
      id: 22,
      title: 'Predictive Tool Monitoring System',
      category: 'Tool Maintenance',
      client: 'SmartTools Inc',
      year: 2025,
      image: 'https://images.unsplash.com/photo-1581092334439-2f30e2f76b3c?auto=format&fit=crop&w=900&q=80',
      description: 'IoT-based predictive maintenance system for tools with real-time wear monitoring and lifecycle tracking.'
    },
    {
      id: 23,
      title: 'Automated Assembly Line Integration',
      category: 'Secondary Ops',
      client: 'AssemblyPro Systems',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1581091870627-3f9c9c1a64e4?auto=format&fit=crop&w=900&q=80',
      description: 'End-to-end automation of assembly lines including robotic arms, conveyor systems, and packaging integration.'
    },
    {
      id: 24,
      title: 'Cold Chain Logistics System',
      category: 'Logistics',
      client: 'FreshLink Logistics',
      year: 2025,
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80',
      description: 'Temperature-controlled logistics system for perishable goods with real-time tracking and compliance monitoring.'
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
      'Flying Cars': '<i class="bi bi-airplane-engines"></i>',
      'Robotics': '<i class="bi bi-robot"></i>',
      'Food Processing': '<i class="bi bi-gear-wide-connected"></i>',
      'Mining': '<i class="bi bi-minecart-loaded"></i>',
      'Battery Tech': '<i class="bi bi-battery-charging"></i>',
      'Battery Recycling': '<i class="bi bi-recycle"></i>',
      'Mold Design': '<i class="bi bi-pencil-square"></i>',
      'Injection Molding': '<i class="bi bi-stack"></i>',
      'Quality Control': '<i class="bi bi-shield-check"></i>',
      'Tool Maintenance': '<i class="bi bi-tools"></i>',
      'Secondary Ops': '<i class="bi bi-box-seam"></i>',
      'Logistics': '<i class="bi bi-truck"></i>'
    };
    return icons[cat] || '<i class="bi bi-grid"></i>';
  }

  getBorderColor(cat: string): string {
    const borders: Record<string, string> = {
      'Flying Cars': 'hover:border-t-sky-500',
      'Robotics': 'hover:border-t-purple-500',
      'Food Processing': 'hover:border-t-orange-500',
      'Mining': 'hover:border-t-amber-600',
      'Battery Tech': 'hover:border-t-green-500',
      'Battery Recycling': 'hover:border-t-emerald-500',
      'Mold Design': 'hover:border-t-blue-500',
      'Injection Molding': 'hover:border-t-indigo-500',
      'Quality Control': 'hover:border-t-red-500',
      'Tool Maintenance': 'hover:border-t-yellow-500',
      'Secondary Ops': 'hover:border-t-pink-500',
      'Logistics': 'hover:border-t-cyan-500'
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