import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navigation-paths',
  standalone: true,
  imports: [],
  templateUrl: './navigation-paths.component.html',
  styleUrl: './navigation-paths.component.scss'
})
export class NavigationPathsComponent {

  // Example data for demonstration
  userId: number = 123;
  productId: number = 456;
  category: string = 'electronics';
  searchQuery: string = 'angular';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Example absolute path navigation
  navigateAbsolute() {
    this.router.navigate(['/home']);
  }

  navigateAbsoluteWithParams() {
    this.router.navigate(['/user', this.userId]);
  }

  navigateAbsoluteWithMultipleParams() {
    this.router.navigate(['/product', this.category, this.productId]);
  }

  // Example relative path navigation
  navigateRelative() {
    this.router.navigate(['./child'], { relativeTo: this.route });
  }

  navigateToParent() {
    this.router.navigate(['../parent'], { relativeTo: this.route });
  }

  navigateToGrandparent() {
    this.router.navigate(['../../grandparent'], { relativeTo: this.route });
  }

  // Example root-relative path navigation
  navigateRootRelative() {
    this.router.navigate(['/']);
  }

  navigateRootRelativeWithPath() {
    this.router.navigate(['/dashboard']);
  }

  // Example path construction
  constructPathWithParams() {
    const path = ['/user', this.userId];
    this.router.navigate(path);
  }

  constructPathWithMultipleParams() {
    const path = ['/product', this.category, this.productId];
    this.router.navigate(path);
  }

  constructPathWithQueryParams() {
    this.router.navigate(['/search'], {
      queryParams: {
        query: this.searchQuery,
        page: 1
      }
    });
  }

  // Example path resolution
  resolvePath(path: string) {
    if (path.startsWith('/')) {
      // Absolute path
      this.router.navigate([path]);
    } else if (path.startsWith('./')) {
      // Relative path
      this.router.navigate([path], { relativeTo: this.route });
    } else {
      // Root-relative path
      this.router.navigate(['/' + path]);
    }
  }

  // Example path validation
  validatePath(path: string): boolean {
    // Basic path validation
    if (!path || path.length === 0) {
      return false;
    }

    // Check for valid characters
    if (!/^[a-zA-Z0-9\/\-_]+$/.test(path)) {
      return false;
    }

    // Check for consecutive slashes
    if (path.includes('//')) {
      return false;
    }

    return true;
  }

  // Example path transformation
  transformPath(path: string): string {
    // Convert to lowercase
    let transformed = path.toLowerCase();

    // Replace spaces with hyphens
    transformed = transformed.replace(/\s+/g, '-');

    // Remove special characters
    transformed = transformed.replace(/[^a-z0-9\/\-]/g, '');

    return transformed;
  }

  // Example path comparison
  comparePaths(path1: string, path2: string): number {
    const segments1 = path1.split('/').filter(s => s.length > 0);
    const segments2 = path2.split('/').filter(s => s.length > 0);

    // More specific paths come first
    if (segments1.length !== segments2.length) {
      return segments2.length - segments1.length;
    }

    // Compare segments
    for (let i = 0; i < segments1.length; i++) {
      const seg1 = segments1[i];
      const seg2 = segments2[i];

      if (seg1 !== seg2) {
        return seg1.localeCompare(seg2);
      }
    }

    return 0;
  }

  // Example path analysis
  analyzePath(path: string) {
    const segments = path.split('/').filter(s => s.length > 0);
    const analysis = {
      depth: segments.length,
      hasParameters: segments.some(s => s.startsWith(':')),
      hasWildcards: segments.some(s => s === '**'),
      parameterCount: segments.filter(s => s.startsWith(':')).length,
      staticSegments: segments.filter(s => !s.startsWith(':') && s !== '**'),
      parameterSegments: segments.filter(s => s.startsWith(':'))
    };

    console.log('Path analysis:', analysis);
    return analysis;
  }

  // Example path generation
  generatePath(basePath: string, parameters: string[]): string {
    let path = basePath;

    parameters.forEach(param => {
      path += `/:${param}`;
    });

    return path;
  }

  // Example path testing
  testPathMatch(pattern: string, url: string): boolean {
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

  // Example navigation patterns
  navigateEcommerce() {
    this.router.navigate(['/products']);
  }

  navigateUserManagement() {
    this.router.navigate(['/admin/users']);
  }

  navigateMobileApp() {
    this.router.navigate(['/home']);
  }

  // Example path with matrix parameters
  navigateWithMatrixParams() {
    this.router.navigate(['/products'], {
      queryParams: {
        category: 'electronics',
        brand: 'apple'
      }
    });
  }

  // Example path with fragment
  navigateWithFragment() {
    this.router.navigate(['/page'], {
      fragment: 'section1'
    });
  }

  // Example path with preserved query params
  navigatePreserveQueryParams() {
    this.router.navigate(['/new-page'], {
      queryParamsHandling: 'preserve'
    });
  }

  // Example path with merged query params
  navigateMergeQueryParams() {
    this.router.navigate(['/search'], {
      queryParams: { category: 'electronics' },
      queryParamsHandling: 'merge'
    });
  }

  // Example conditional navigation
  navigateConditionally(isAdmin: boolean) {
    if (isAdmin) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/user']);
    }
  }

  // Example navigation with state
  navigateWithState() {
    this.router.navigate(['/details'], {
      state: { data: { id: 123, name: 'Example' } }
    });
  }
}
