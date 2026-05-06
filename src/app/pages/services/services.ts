import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../shared/services/loading.service';

interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent implements OnInit, AfterViewInit, OnDestroy {
  isDataLoaded = false;
  imagesLoaded = false;
  private destroyed = false;

  // Services data from image
  services: Service[] = [
    {
      icon: 'bi-airplane-engines',
      title: 'AI Powered Electric Flying Cars Aerospace Industry',
      description: 'Advanced aerospace solutions for next-generation electric flying vehicles with AI integration.',
      features: [
        'Electric Propulsion Systems',
        'AI Flight Control',
        'Lightweight Materials',
        'Safety Compliance'
      ]
    },
    {
      icon: 'bi-robot',
      title: 'AI Robot Police / AI Robot Cleaning & Delivery Robot for Hotel Industry',
      description: 'Intelligent robotic solutions for security, cleaning, and hospitality services.',
      features: [
        'Autonomous Navigation',
        'Smart Surveillance',
        'Automated Cleaning',
        'Delivery Services'
      ]
    },
    {
      icon: 'bi-gear-wide-connected',
      title: 'Flavor, Seasoning, Food Processing Machinery & Coding Machinery',
      description: 'Complete food processing and packaging machinery solutions.',
      features: [
        'Seasoning Systems',
        'Coding & Marking',
        'Quality Control',
        'Hygiene Standards'
      ]
    },
    {
      icon: 'bi-minecart-loaded',
      title: 'Mines & Minerals Processing Factory',
      description: 'Advanced mineral processing and extraction equipment and solutions.',
      features: [
        'Ore Processing',
        'Extraction Technology',
        'Quality Analysis',
        'Environmental Compliance'
      ]
    },
    {
      icon: 'bi-battery-charging',
      title: 'Lithium Sodium Battery Technology Transfer',
      description: 'Complete battery technology transfer and manufacturing setup.',
      features: [
        'Technology Transfer',
        'Manufacturing Setup',
        'Quality Standards',
        'Technical Support'
      ]
    },
    {
      icon: 'bi-recycle',
      title: 'Lead-Acid, Cobalt, Nickel & Lithium Battery Recycling Factory',
      description: 'Eco-friendly battery recycling solutions for sustainable manufacturing.',
      features: [
        'Battery Collection',
        'Material Recovery',
        'Environmental Safety',
        'Compliance Standards'
      ]
    },
    {
      icon: 'bi-pencil-square',
      title: 'Mold Design & Engineering',
      description: 'Advanced CAD/CAM/CAE systems for optimized tool design and flow analysis.',
      features: [
        'DFM & Flow Analysis',
        '3D Part & Tool Design',
        'Rapid Prototyping (SLA/SLS)',
        'Material Selection Guidance'
      ]
    },
    {
      icon: 'bi-stack',
      title: 'Precision Injection Molding',
      description: 'Operating over 100 high-speed electric and hydraulic machines ranging from 50 to 1,200 tons.',
      features: [
        'Multi-Cavity Tooling',
        'Two-Shot & Overmolding',
        'Insert Molding',
        'Clean Room Molding (Class 8)'
      ]
    },
    {
      icon: 'bi-shield-check',
      title: 'Quality & Validation',
      description: 'Rigorous validation processes ensuring compliance with IATF 16949 and medical-grade standards.',
      features: [
        'CMM 3D Inspection',
        'SPC Real-time Monitoring',
        'First Article Inspection',
        'IQ/OQ/PQ Validation'
      ]
    },
    {
      icon: 'bi-tools',
      title: 'Tool Maintenance',
      description: 'In-house tool room dedicated to preventative maintenance and rapid repair of high-precision molds.',
      features: [
        'Predictive Maintenance',
        'Laser Welding Repair',
        'Tool Life Extension',
        'Spare Part Management'
      ]
    },
    {
      icon: 'bi-box-seam',
      title: 'Secondary Operations',
      description: 'Value-added services providing fully finished components ready for final product integration.',
      features: [
        'Ultrasonic Welding',
        'Pad Printing & Silk Screen',
        'Mechanical Assembly',
        'Custom Packaging'
      ]
    },
    {
      icon: 'bi-truck',
      title: 'Global Logistics',
      description: 'Regional manufacturing hubs and direct-to-destination shipping for medical and automotive OEMs.',
      features: [
        'JIT (Just-In-Time) Delivery',
        'KANBAN Inventory',
        'VMI Systems',
        'Export/Import Compliance'
      ]
    }
  ];

  processSteps: ProcessStep[] = [
    {
      number: '01',
      title: 'Consultation',
      description: 'In-depth DFM and feasibility study of your project requirements.'
    },
    {
      number: '02',
      title: 'Engineering',
      description: 'Precision mold design and advanced simulation flow analysis.'
    },
    {
      number: '03',
      title: 'Tooling',
      description: 'CNC and EDM manufacturing of high-durability steel molds.'
    },
    {
      number: '04',
      title: 'Production',
      description: 'High-speed injection molding and validation of master samples.'
    },
    {
      number: '05',
      title: 'Delivery',
      description: 'Final QC inspection and global shipping to your facility.'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      const resolved = data['data'];
      if (resolved?.services) {
        // Merge with existing services if needed
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

    // Initialize AOS or other animations
    setTimeout(() => {
      if (this.destroyed) {
        return;
      }
      // Trigger any animations here
      this.cdr.detectChanges();
    }, 100);
  }
}