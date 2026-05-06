import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { LoadingService } from '../../shared/services/loading.service';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements OnInit, AfterViewInit, OnDestroy {
  isDataLoaded = false;
  imagesLoaded = false;
  private destroyed = false;

  constructor(
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
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

    setTimeout(() => {
      if (this.destroyed) {
        return;
      }
      this.cdr.detectChanges();
    }, 100);
  }
}
