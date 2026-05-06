import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import AOS from 'aos';
import { ImageLoaderDirective } from '../../shared/directives/image-loader.directive';
import { LoadingService } from '../../shared/services/loading.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ImageLoaderDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  isDataLoaded = false;
  imagesLoaded = false;
  private destroyed = false;

  heroTitle = '40 Years of Manufacturing Excellence';
  heroSubtitle = 'A legacy of precision engineering and industrial innovation since 1983.';

  mission = {
    title: 'Our Mission',
    content: 'To empower global industries through high-precision injection molding solutions that redefine quality and manufacturing efficiency.'
  };

  vision = {
    title: 'Our Vision',
    content: 'To be the undisputed leader in industrial precision molding, bridging the gap between engineering complexity and tangible production perfection.'
  };

  ceo = {
    name: 'Mian Abbad Farooq',
    role: 'CEO & Co-Founder',
    company: 'Tradebone Group LLC',
  
    phones: {
      dubai: '+971 50 197 6265',
      china: '+86 190 0665 2617'
    },
  
    email: 'info@tradebone.com',
    website: 'www.tradebone.com',
  
    image: '/CEO.png', // 👈 replace with your uploaded image path
  
    message: `
    At Tradebone Group LLC, our mission is to lead innovation across multiple industrial sectors by delivering cutting-edge solutions in automation, manufacturing, and advanced engineering. 
    From AI-powered robotics to battery technology and precision molding, we are committed to building sustainable, high-performance systems that empower global industries.
    
    With a strong international presence and a focus on quality, reliability, and long-term partnerships, we continue to expand our capabilities and redefine excellence in modern manufacturing.
    `,
  
    services: [
      'AI Powered Electric Flying Cars Aerospace Industry',
      'AI Robot Police / Cleaning & Delivery Systems',
      'Flavor, Seasoning & Food Processing Machinery',
      'Mines & Minerals Processing Factory',
      'Lithium & Sodium Battery Technology Transfer',
      'Battery Recycling (Lead, Cobalt, Nickel, Lithium)'
    ],
  
    offices: [
      {
        country: 'USA',
        type: 'Head Office',
        address: '510 Clint Ln, Fredericksburg, VA 22406, USA'
      },
      {
        country: 'China',
        type: 'Office',
        address: 'Building F Office 604, Development Business Center, Park Road, Baoan District, Shenzhen'
      },
      {
        country: 'Dubai',
        type: 'UAE Office',
        address: 'Al Qusais Industrial Area First, Dubai, UAE'
      },
      {
        country: 'Saudi Arabia',
        type: 'Office',
        address: 'Postal Code 23846, District Office No. 8, Building 2292, Al Mulaihem Street, Aziziyah, Jeddah'
      },
      {
        country: 'Afghanistan',
        type: 'Office',
        address: 'Shahr-e-Naw, Kabul, Afghanistan'
      },
      {
        country: 'United Kingdom',
        type: 'Office',
        address: '61 Broomfield Road, 3809 Sheffield, United Kingdom'
      },
      {
        country: 'Lahore',
        type: 'Office',
        address: '140-B Allama Iqbal Town Industrial Estate, Kot Lakhpat Lahore, Pakistan'
      }
    ]
  };

  timeline = [
    { year: '1983', title: 'The Genesis', description: 'Founded in Shanghai, focusing on precision tool and die manufacturing.' },
    { year: '1995', title: 'Global Standards', description: 'Achieved first ISO 9001 certification and expanded to international automotive clients.' },
    { year: '2010', title: 'Smart Expansion', description: 'Inaugurated our 4th manufacturing facility with advanced automated molding systems.' },
    { year: '2024', title: 'Future Ready', description: 'Integrating AI-driven predictive maintenance and real-time quality monitoring across all plants.' },
  ];

  values = [
    { icon: 'bi-gear-fill', title: 'Precision', description: 'Micron-level accuracy is our standard for every mold and component we produce.' },
    { icon: 'bi-shield-check', title: 'Certification', description: 'Operating under rigorous IATF 16949 and ISO standards for absolute compliance.' },
    { icon: 'bi-globe', title: 'Global Reach', description: 'Supplying top-tier automotive and medical partners across four continents.' },
    { icon: 'bi-lightning-charge-fill', title: 'Efficiency', description: 'Optimized production cycles delivering high-volume output without quality compromise.' },
  ];

  constructor(
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadingService.show();
    this.loadData();
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-in-out-cubic'
    });
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

  onValueHover(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    const icon = card.querySelector('.value-card__icon') as HTMLElement;
    if (icon) {
      icon.classList.remove('rotate-icon');
      // Force reflow to restart the animation
      void icon.offsetWidth;
      icon.classList.add('rotate-icon');
    }
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
      AOS.refresh();
      this.cdr.detectChanges();
    }, 100);
  }
}
