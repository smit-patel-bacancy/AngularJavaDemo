import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-path-matching',
  standalone: true,
  imports: [],
  templateUrl: './path-matching.component.html',
  styleUrl: './path-matching.component.scss'
})
export class PathMatchingComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Example data for demonstration
  currentRoute: string = '';
  matchedRoute: string = '';
  routeParameters: any = {};
  routeOrder: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.setupRouteTracking();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupRouteTracking() {
    // Track current route
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        if (event.type === 1) { // NavigationEnd
          this.currentRoute = this.router.url;
          this.analyzeRoute(this.currentRoute);
        }
      });

    // Track route parameters
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.routeParameters = {};
        params.keys.forEach(key => {
          this.routeParameters[key] = params.get(key);
        });
      });
  }

  private analyzeRoute(url: string) {
    console.log('Analyzing route:', url);

    // Determine which route pattern matches
    if (url.includes('/admin/users/')) {
      this.matchedRoute = 'User Detail Route';
    } else if (url.includes('/admin/users')) {
      this.matchedRoute = 'Users List Route';
    } else if (url.includes('/admin')) {
      this.matchedRoute = 'Admin Route';
    } else if (url.includes('/products/')) {
      this.matchedRoute = 'Product Route';
    } else {
      this.matchedRoute = 'Unknown Route';
    }
  }

  // Example path matching methods
  testFullPathMatch() {
    this.router.navigate(['/admin']);
  }

  testPrefixPathMatch() {
    this.router.navigate(['/admin/dashboard']);
  }

  testParameterMatching() {
    this.router.navigate(['/user', 123]);
  }

  testMultipleParameters() {
    this.router.navigate(['/product', 'electronics', 456]);
  }

  testOptionalParameters() {
    this.router.navigate(['/search', 'angular']);
  }

  testRegexMatching() {
    this.router.navigate(['/user', 123]); // Should match \d+ pattern
  }

  // Example route precedence testing
  testRoutePrecedence() {
    // Test specific routes first
    this.router.navigate(['/admin/users/123']);
    setTimeout(() => {
      this.router.navigate(['/admin/users/new']);
    }, 1000);
    setTimeout(() => {
      this.router.navigate(['/admin/users']);
    }, 2000);
    setTimeout(() => {
      this.router.navigate(['/admin']);
    }, 3000);
  }

  // Example parameter validation
  validateRouteParameters() {
    const params = this.route.snapshot.paramMap;

    params.keys.forEach(key => {
      const value = params.get(key);
      console.log(`Parameter ${key}: ${value}`);

      // Validate parameter format
      if (key === 'id' && value) {
        if (!/^\d+$/.test(value)) {
          console.error('Invalid ID format');
          this.router.navigate(['/error']);
        }
      }

      if (key === 'category' && value) {
        const validCategories = ['electronics', 'clothing', 'books'];
        if (!validCategories.includes(value)) {
          console.error('Invalid category');
          this.router.navigate(['/error']);
        }
      }
    });
  }

  // Example dynamic route matching
  addDynamicRoute(path: string, component: any) {
    console.log('Adding dynamic route:', path);
    // In a real app, you would add routes to the router configuration
  }

  removeDynamicRoute(path: string) {
    console.log('Removing dynamic route:', path);
    // In a real app, you would remove routes from the router configuration
  }

  // Example route pattern testing
  testRoutePatterns() {
    const testRoutes = [
      '/admin/users/123',
      '/admin/users/new',
      '/admin/users',
      '/admin',
      '/products/electronics/456',
      '/products/electronics',
      '/products',
      '/user/123',
      '/search/angular/tutorials',
      '/search/angular',
      '/search'
    ];

    testRoutes.forEach((route, index) => {
      setTimeout(() => {
        this.router.navigate([route]);
      }, index * 1000);
    });
  }

  // Example route validation
  validateRoute(route: string): boolean {
    // Basic route validation
    if (!route || route.length === 0) {
      return false;
    }

    // Check for valid characters
    if (!/^[a-zA-Z0-9\/\-_]+$/.test(route)) {
      return false;
    }

    // Check for consecutive slashes
    if (route.includes('//')) {
      return false;
    }

    return true;
  }

  // Example route transformation
  transformRoute(route: string): string {
    // Convert to lowercase
    let transformed = route.toLowerCase();

    // Replace spaces with hyphens
    transformed = transformed.replace(/\s+/g, '-');

    // Remove special characters
    transformed = transformed.replace(/[^a-z0-9\/\-]/g, '');

    return transformed;
  }

  // Example route comparison
  compareRoutes(route1: string, route2: string): number {
    const segments1 = route1.split('/').filter(s => s.length > 0);
    const segments2 = route2.split('/').filter(s => s.length > 0);

    // More specific routes come first
    if (segments1.length !== segments2.length) {
      return segments2.length - segments1.length;
    }

    // Compare segments
    for (let i = 0; i < segments1.length; i++) {
      const seg1 = segments1[i];
      const seg2 = segments2[i];

      // Static segments come before parameter segments
      if (seg1.startsWith(':') && !seg2.startsWith(':')) {
        return 1;
      }
      if (!seg1.startsWith(':') && seg2.startsWith(':')) {
        return -1;
      }

      // Compare alphabetically
      if (seg1 !== seg2) {
        return seg1.localeCompare(seg2);
      }
    }

    return 0;
  }

  // Example route analysis
  analyzeRoutePattern(route: string) {
    const segments = route.split('/').filter(s => s.length > 0);
    const analysis = {
      depth: segments.length,
      hasParameters: segments.some(s => s.startsWith(':')),
      hasWildcards: segments.some(s => s === '**'),
      parameterCount: segments.filter(s => s.startsWith(':')).length,
      staticSegments: segments.filter(s => !s.startsWith(':') && s !== '**'),
      parameterSegments: segments.filter(s => s.startsWith(':'))
    };

    console.log('Route analysis:', analysis);
    return analysis;
  }

  // Example route generation
  generateRoutePattern(basePath: string, parameters: string[]): string {
    let pattern = basePath;

    parameters.forEach(param => {
      pattern += `/:${param}`;
    });

    return pattern;
  }

  // Example route testing
  testRouteMatch(pattern: string, url: string): boolean {
    const patternSegments = pattern.split('/').filter(s => s.length > 0);
    const urlSegments = url.split('/').filter(s => s.length > 0);

    if (patternSegments.length !== urlSegments.length) {
      return false;
    }

    for (let i = 0; i < patternSegments.length; i++) {
      const patternSeg = patternSegments[i];
      const urlSeg = urlSegments[i];

      if (patternSeg.startsWith(':')) {
        // Parameter segment - always matches
        continue;
      }

      if (patternSeg === '**') {
        // Wildcard - always matches
        return true;
      }

      if (patternSeg !== urlSeg) {
        return false;
      }
    }

    return true;
  }
}
