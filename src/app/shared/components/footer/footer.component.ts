import { Component, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  showBackToTop: boolean = false;

  constructor(
    private viewportScroller: ViewportScroller,
    private cdr: ChangeDetectorRef
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Show back to top button when scrolled down 400px
    this.showBackToTop = window.scrollY > 400;
    this.cdr.detectChanges();
  }

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
