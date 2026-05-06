import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.scss'
})
export class LoadingScreenComponent implements OnInit {
  isVisible = true;
  isFadingOut = false;

  ngOnInit() {
    // Start fade out after 2 seconds
    setTimeout(() => {
      this.isFadingOut = true;
      
      // Remove from DOM completely after fade out animation (takes 0.8s)
      setTimeout(() => {
        this.isVisible = false;
      }, 800);
      
    }, 2000);
  }
}
