import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-redirects-wildcards',
  standalone: true,
  imports: [],
  templateUrl: './redirects-wildcards.component.html',
  styleUrl: './redirects-wildcards.component.scss'
})
export class RedirectsWildcardsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Example data for demonstration
  currentUrl: string = '';
  navigationHistory: string[] = [];
  errorCount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.setupNavigationTracking();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupNavigationTracking() {
    // Track current URL
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        if (event.type === 1) { // NavigationEnd
          this.currentUrl = this.router.url;
          this.navigationHistory.push(this.currentUrl);

          // Keep only last 10 entries
          if (this.navigationHistory.length > 10) {
            this.navigationHistory.shift();
          }
        }
      });
  }

  // Example redirect methods
  redirectToHome() {
    this.router.navigate(['/home']);
  }

  redirectToNewPage() {
    this.router.navigate(['/new-page']);
  }

  redirectWithQueryParams() {
    this.router.navigate(['/products'], {
      queryParams: {
        category: 'electronics',
        brand: 'apple'
      }
    });
  }

  redirectWithFragment() {
    this.router.navigate(['/documentation'], {
      fragment: 'getting-started'
    });
  }

  // Example conditional redirects
  conditionalRedirect(userRole: string) {
    if (userRole === 'admin') {
      this.router.navigate(['/admin/dashboard']);
    } else if (userRole === 'user') {
      this.router.navigate(['/user/profile']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  sourceBasedRedirect(source: string) {
    if (source === 'email') {
      this.router.navigate(['/welcome/email']);
    } else if (source === 'social') {
      this.router.navigate(['/welcome/social']);
    } else {
      this.router.navigate(['/welcome/default']);
    }
  }

  // Example wildcard handling
  handleWildcardRoute() {
    // Simulate accessing a non-existent route
    this.router.navigate(['/non-existent-route']);
  }

  handle404Error() {
    this.errorCount++;
    console.log('404 Error count:', this.errorCount);

    // Log analytics
    this.log404Error(this.router.url);
  }

  private log404Error(url: string) {
    console.log('404 Error for URL:', url);
    // In a real app, you would send this to an analytics service
  }

  // Example dynamic redirects
  addDynamicRoute(path: string) {
    // In a real app, you would add routes dynamically
    console.log('Adding dynamic route:', path);
  }

  removeDynamicRoute(path: string) {
    // In a real app, you would remove routes dynamically
    console.log('Removing dynamic route:', path);
  }

  // Example navigation history
  goBack() {
    if (this.navigationHistory.length > 1) {
      this.navigationHistory.pop(); // Remove current
      const previousUrl = this.navigationHistory[this.navigationHistory.length - 1];
      this.router.navigateByUrl(previousUrl);
    }
  }

  // Example route guard simulation
  simulateRouteGuard(requiresAuth: boolean) {
    if (requiresAuth) {
      // Simulate authentication check
      const isAuthenticated = Math.random() > 0.5;

      if (!isAuthenticated) {
        this.router.navigate(['/login']);
        return false;
      }
    }
    return true;
  }

  // Example error handling
  handleNavigationError() {
    this.router.navigate(['/invalid-route'])
      .then(() => {
        console.log('Navigation successful');
      })
      .catch(error => {
        console.error('Navigation failed:', error);
        this.router.navigate(['/error']);
      });
  }

  // Example analytics tracking
  trackPageView(url: string) {
    console.log('Page view tracked:', url);
    // In a real app, you would send this to Google Analytics or similar
  }

  // Example route data handling
  handleRouteData() {
    this.route.data.subscribe(data => {
      console.log('Route data:', data);
    });
  }

  // Example route parameter handling
  handleRouteParams() {
    this.route.paramMap.subscribe(params => {
      console.log('Route parameters:', params);
    });
  }

  // Example query parameter handling
  handleQueryParams() {
    this.route.queryParamMap.subscribe(params => {
      console.log('Query parameters:', params);
    });
  }

  // Example fragment handling
  handleFragment() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        console.log('Fragment:', fragment);
        this.scrollToSection(fragment);
      }
    });
  }

  private scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
