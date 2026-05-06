import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../shared/services/loading.service';

interface Service {
  icon: string;
  image?: string;
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
      icon: 'bi-bandaid',
      image: 'assets/images/services/medical-mold.webp',
      title: 'Medical Molds',
      description: 'High-precision components for the medical and healthcare sectors, maintaining strict regulatory standards.',
      features: [
        'Test Tube Series',
        'Syringes & Needles',
        'Pipette Tips',
        'Petri Dishes',
        'Medical Device Housings',
        'Blood Collection Tubes',
        'Cavities: 128, 64, 32',
        'Fully hot half valve gate',
        'Capability for large-scale project management (up to 12 molds+)'
      ]
    },
    {
      icon: 'bi-box-seam',
      image: 'assets/images/services/packaging-mold.webp',
      title: 'Packaging Molds',
      description: 'Advanced mold solutions for high-volume packaging applications, ensuring efficiency and consistency.',
      features: [
        'FT Cap',
        'Thin-wall Containers',
        'Beverage Caps & Closures',
        'Cosmetics Packaging',
        'Food & Beverage Containers',
        'Cavities: 24+24 stack mold',
        'Full hot side gate',
        'Industry-leading cycle time',
        'Oval inserts made using profile grinding machines'
      ]
    },
    {
      icon: 'bi-person-heart',
      image: 'assets/images/services/personal-care-mold.webp',
      title: 'Personal Care Molds',
      description: 'Aesthetic and durable molds for personal care and grooming products.',
      features: [
        'Electric Toothbrush Series',
        'Razor Handles & Components',
        'Shampoo & Body Wash Bottles',
        'Lotion Pumps & Dispensers',
        'Hair Dryer Components',
        'Epilator Housings',
        'Soap Dispensers',
        'Comb & Brush Molds',
        'Deodorant Casings'
      ]
    },
    {
      icon: 'bi-cpu',
      image: 'assets/images/services/electronic-mold.webp',
      title: 'Electronic Molds',
      description: 'Precision engineering for consumer and professional electronic device enclosures.',
      features: [
        'Case & Cover (Smartphones/Tablets)',
        'Connectors & Plugs',
        'Enclosures for Routers',
        'Keypads & Buttons',
        'Smart Home Device Housings',
        'Wearable Device Components',
        'Earbud Cases',
        'Power Bank Housings',
        'Laptop & Keyboard Components'
      ]
    },
    {
      icon: 'bi-car-front',
      image: 'assets/images/services/automotive-mold.webp',
      title: 'Automotive Molds',
      description: 'Heavy-duty & highly durable injection molds for the automotive industry.',
      features: [
        'Truck Fender',
        'Car Bumpers',
        'Dashboard Panels',
        'Door Handles & Interior Trim',
        'HVAC Components',
        'Lighting & Headlamp Housings',
        'Front Grilles',
        'Side Mirror Housings',
        'Engine Bay Components'
      ]
    },
    {
      icon: 'bi-house-heart',
      image: 'assets/images/services/home-appliance-mold.webp',
      title: 'Home Appliance Molds',
      description: 'Reliable mold designs for both structural and cosmetic appliance parts.',
      features: [
        'Refrigerator Drawer',
        'Washing Machine Control Panels',
        'Air Conditioner Fascias',
        'Microwave Oven Doors',
        'Blender & Mixer Housings',
        'Vacuum Cleaner Components',
        'Coffee Maker Parts',
        'Fan Blades & Housings',
        'Rice Cooker Casings'
      ]
    },
    {
      icon: 'bi-nut',
      image: 'assets/images/services/special-mold.webp',
      title: 'Special Molds',
      description: 'Custom-engineered, highly technical molding solutions for demanding applications.',
      features: [
        'Multi-component (2K/3K) Molds',
        'Insert & Overmolding',
        'Gas-assisted Injection Molds',
        'High-temperature Molds (PEEK/PEI)',
        'Liquid Silicone Rubber (LSR)',
        'Micro-molding',
        'Stack Molds',
        'Tandem Molds',
        'Thin-wall Injection Molds'
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