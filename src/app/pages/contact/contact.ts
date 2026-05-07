import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoadingService } from '../../shared/services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements OnInit, AfterViewInit, OnDestroy {
  isDataLoaded = false;
  imagesLoaded = false;
  private destroyed = false;

  // ✅ Form aur state variables
  contactForm!: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  constructor(
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadingService.show();
    this.loadData();
    this.initForm(); // ✅ Form initialize
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
  }

  // ✅ Form initialize karna
  private initForm() {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      companyName: ['', Validators.required],
      industry: ['Automotive', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // ✅ Form submit function - YEH SABSE IMPORTANT HAI
// contact.component.ts

onSubmit(): void {
  if (this.contactForm.invalid) {
    this.contactForm.markAllAsTouched();
    return;
  }

  const formValues = this.contactForm.value;

  const subject = `Inquiry from ${formValues.fullName || 'Website Visitor'}`;

  const body = `
Name: ${formValues.fullName}
Email: ${formValues.email}
Company: ${formValues.companyName}
Industry: ${formValues.industry}
Message: ${formValues.message}
  `;

  const mailtoLink = `mailto:Sales@shanghaimold.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoLink;

  // Optional form reset
  this.contactForm.reset({
    industry: 'Automotive'
  });
}

  // ✅ Getter for easy form validation access
  get f() {
    return this.contactForm.controls;
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
      this.cdr.detectChanges();
    }, 100);
  }
}