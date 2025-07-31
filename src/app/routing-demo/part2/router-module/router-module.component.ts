import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Subject, takeUntil, filter } from 'rxjs';

@Component({
  selector: 'app-router-module',
  standalone: true,
  imports: [],
  templateUrl: './router-module.component.html',
  styleUrl: './router-module.component.scss'
})
export class RouterModuleComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Example data for demonstration
  loading = false;
  navigationHistory: any[] = [];
  routeAnalytics: any[] = [];
  errorLog: any[] = [];
  routerConfig: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.setupRouterMonitoring();
    this.analyzeRouterConfig();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupRouterMonitoring() {
    // Monitor router events
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          this.loading = true;
          console.log('Navigation started:', event.url);
        }

        if (event instanceof NavigationEnd) {
          this.loading = false;
          this.trackPageView(event.urlAfterRedirects);
          console.log('Navigation completed:', event.urlAfterRedirects);
        }

        if (event instanceof NavigationCancel) {
          this.loading = false;
          console.log('Navigation cancelled:', event.reason);
        }

        if (event instanceof NavigationError) {
          this.loading = false;
          this.logNavigationError(event);
          console.error('Navigation error:', event.error);
        }
      });
  }

  private analyzeRouterConfig() {
    // Analyze current router configuration
    this.routerConfig = {
      routes: this.router.config.length,
      lazyLoadedRoutes: this.router.config.filter(route => route.loadChildren).length,
      guardedRoutes: this.router.config.filter(route => route.canActivate).length,
      redirectRoutes: this.router.config.filter(route => route.redirectTo).length
    };

    console.log('Router configuration:', this.routerConfig);
  }

  private trackPageView(url: string) {
    const pageView = {
      url: url,
      timestamp: new Date(),
      userAgent: navigator.userAgent
    };

    this.routeAnalytics.push(pageView);

    // Keep only last 50 entries
    if (this.routeAnalytics.length > 50) {
      this.routeAnalytics.shift();
    }

    console.log('Page view tracked:', pageView);
  }

  private logNavigationError(error: NavigationError) {
    const errorLog = {
      url: error.url,
      error: error.error,
      timestamp: new Date()
    };

    this.errorLog.push(errorLog);

    // Keep only last 20 entries
    if (this.errorLog.length > 20) {
      this.errorLog.shift();
    }
  }

  // Example router configuration methods
  enableTracing() {
    console.log('Router tracing enabled');
    // In a real app, you would enable router tracing
  }

  disableTracing() {
    console.log('Router tracing disabled');
    // In a real app, you would disable router tracing
  }

  useHashRouting() {
    console.log('Hash routing enabled');
    // In a real app, you would configure hash routing
  }

  useHistoryRouting() {
    console.log('History routing enabled');
    // In a real app, you would configure history routing
  }

  // Example lazy loading methods
  preloadAllModules() {
    console.log('Preloading all modules');
    // In a real app, you would implement preloading strategy
  }

  preloadSelectedModules() {
    console.log('Preloading selected modules');
    // In a real app, you would implement selective preloading
  }

  // Example route guard methods
  addRouteGuard(route: string, guard: any) {
    console.log('Adding route guard to:', route);
    // In a real app, you would add guards to routes
  }

  removeRouteGuard(route: string) {
    console.log('Removing route guard from:', route);
    // In a real app, you would remove guards from routes
  }

  // Example router event handling
  handleNavigationStart(url: string) {
    console.log('Navigation starting to:', url);
    this.loading = true;
  }

  handleNavigationEnd(url: string) {
    console.log('Navigation completed to:', url);
    this.loading = false;
  }

  handleNavigationError(error: any) {
    console.error('Navigation error:', error);
    this.loading = false;
    this.router.navigate(['/error']);
  }

  // Example analytics methods
  trackCustomEvent(eventName: string, data: any) {
    const event = {
      name: eventName,
      data: data,
      timestamp: new Date(),
      url: this.router.url
    };

    console.log('Custom event tracked:', event);
    // In a real app, you would send this to analytics service
  }

  getAnalyticsReport() {
    const report = {
      totalPageViews: this.routeAnalytics.length,
      uniqueUrls: [...new Set(this.routeAnalytics.map(pv => pv.url))].length,
      errorCount: this.errorLog.length,
      averageLoadTime: this.calculateAverageLoadTime()
    };

    console.log('Analytics report:', report);
    return report;
  }

  private calculateAverageLoadTime(): number {
    // Simulate load time calculation
    return Math.random() * 1000 + 500; // 500-1500ms
  }

  // Example router configuration testing
  testRouterConfiguration() {
    const testRoutes = [
      '/home',
      '/products',
      '/admin',
      '/user/123',
      '/non-existent'
    ];

    testRoutes.forEach((route, index) => {
      setTimeout(() => {
        this.router.navigate([route]);
      }, index * 2000);
    });
  }

  // Example performance monitoring
  monitorRouterPerformance() {
    const startTime = performance.now();

    this.router.navigate(['/test-route'])
      .then(() => {
        const endTime = performance.now();
        const loadTime = endTime - startTime;

        console.log(`Route navigation took ${loadTime.toFixed(2)}ms`);

        if (loadTime > 1000) {
          console.warn('Slow navigation detected');
        }
      })
      .catch(error => {
        console.error('Navigation failed:', error);
      });
  }

  // Example route caching
  cacheRouteData(route: string, data: any) {
    console.log('Caching route data:', route, data);
    // In a real app, you would implement route data caching
  }

  getCachedRouteData(route: string): any {
    console.log('Getting cached route data:', route);
    // In a real app, you would retrieve cached route data
    return null;
  }

  clearRouteCache() {
    console.log('Clearing route cache');
    // In a real app, you would clear the route cache
  }

  // Example router optimization
  optimizeRouterConfig() {
    console.log('Optimizing router configuration');

    // Analyze route order
    const routes = this.router.config;
    const optimizedRoutes = this.sortRoutesBySpecificity(routes);

    console.log('Optimized routes:', optimizedRoutes);
  }

  private sortRoutesBySpecificity(routes: any[]): any[] {
    return routes.sort((a, b) => {
      const aSpecificity = this.calculateRouteSpecificity(a.path || '');
      const bSpecificity = this.calculateRouteSpecificity(b.path || '');

      return bSpecificity - aSpecificity; // More specific routes first
    });
  }

  private calculateRouteSpecificity(path: string): number {
    const segments = path.split('/').filter(s => s.length > 0);
    let specificity = segments.length * 10; // Base specificity

    segments.forEach(segment => {
      if (segment.startsWith(':')) {
        specificity -= 5; // Parameter segments are less specific
      } else if (segment === '**') {
        specificity -= 10; // Wildcard is least specific
      } else {
        specificity += 5; // Static segments are more specific
      }
    });

    return specificity;
  }

  // Example router debugging
  enableRouterDebugging() {
    console.log('Router debugging enabled');
    // In a real app, you would enable detailed router logging
  }

  disableRouterDebugging() {
    console.log('Router debugging disabled');
    // In a real app, you would disable detailed router logging
  }

  // Example route validation
  validateRouteConfiguration() {
    const routes = this.router.config;
    const issues: string[] = [];

    routes.forEach((route, index) => {
      if (!route.path && !route.redirectTo) {
        issues.push(`Route at index ${index} has no path or redirect`);
      }

      if (route.path === '**' && index !== routes.length - 1) {
        issues.push('Wildcard route is not at the end');
      }

      if (route.children && route.children.length > 0) {
        route.children.forEach((child, childIndex) => {
          if (!child.path && !child.redirectTo) {
            issues.push(`Child route at index ${childIndex} has no path or redirect`);
          }
        });
      }
    });

    if (issues.length > 0) {
      console.warn('Route configuration issues:', issues);
    } else {
      console.log('Route configuration is valid');
    }

    return issues;
  }
}
