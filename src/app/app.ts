import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { LoadingService } from './shared/services/loading.service';
import { routeAnimation } from './core/animations/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, FooterComponent, LoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [routeAnimation]
})
export class App implements OnInit, OnDestroy {
  private routerSub?: Subscription;
  private windowLoadHandler = () => this.onWindowLoad();

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.routerSub = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.loadingService.show();
        setTimeout(() => {
          this.loadingService.hide();
        }, 500);
      });

    if (document.readyState === 'complete') {
      this.onWindowLoad();
    } else {
      window.addEventListener('load', this.windowLoadHandler);
    }
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
    window.removeEventListener('load', this.windowLoadHandler);
  }

  private onWindowLoad() {
    setTimeout(() => {
      this.loadingService.hide();
      this.cdr.detectChanges();
    }, 300);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'] 
      ? outlet.activatedRouteData['animation'] 
      : outlet.isActivated ? outlet.activatedRoute.snapshot.url.join('') : '';
  }
}
