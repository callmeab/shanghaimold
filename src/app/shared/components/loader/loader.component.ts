import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="loading$ | async" class="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div class="loader-container">
        <div class="spinner"></div>
        <p class="text-white mt-4 text-xl">Loading...</p>
      </div>
    </div>
  `,
  styles: [`
    .spinner {
      border: 4px solid rgba(255, 255, 255, 0.1);
      border-left-color: #F59E0B;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class LoaderComponent {
  loading$;

  constructor(private loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$;
  }
}
