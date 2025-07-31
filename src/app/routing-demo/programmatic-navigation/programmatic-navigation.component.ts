import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Subject, takeUntil, filter } from 'rxjs';

@Component({
  selector: 'app-programmatic-navigation',
  standalone: true,
  imports: [],
  templateUrl: './programmatic-navigation.component.html',
  styleUrl: './programmatic-navigation.component.scss'
})
export class ProgrammaticNavigationComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Example data for demonstration
  loading = false;
  navigationHistory: string[] = [];
  currentUser: any = { id: 123, role: 'user' };
  selectedProduct: any = { id: 456, category: 'electronics' };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.setupNavigationMonitoring();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupNavigationMonitoring() {
    // Monitor navigation events
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          this.loading = true;
          console.log('Navigation started:', event.url);
        }

        if (event instanceof NavigationEnd) {
          this.loading = false;
          this.navigationHistory.push(event.urlAfterRedirects);
          console.log('Navigation completed:', event.urlAfterRedirects);
        }

        if (event instanceof NavigationCancel) {
          this.loading = false;
          console.log('Navigation cancelled:', event.reason);
        }

        if (event instanceof NavigationError) {
          this.loading = false;
          console.error('Navigation error:', event.error);
        }
      });
  }

  // Example basic navigation methods
  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToUser() {
    this.router.navigate(['/user', this.currentUser.id]);
  }

  navigateToProduct() {
    this.router.navigate(['/product', this.selectedProduct.category, this.selectedProduct.id]);
  }

  // Example navigation with parameters
  navigateWithParameters(params: any) {
    this.router.navigate(['/search'], {
      queryParams: params
    });
  }

  navigateWithFragment() {
    this.router.navigate(['/page'], {
      fragment: 'section1'
    });
  }

  // Example relative navigation
  navigateRelative() {
    this.router.navigate(['./child'], { relativeTo: this.route });
  }

  navigateToParent() {
    this.router.navigate(['../parent'], { relativeTo: this.route });
  }

  navigateToGrandparent() {
    this.router.navigate(['../../grandparent'], { relativeTo: this.route });
  }

  // Example advanced navigation techniques
  navigateWithState() {
    this.router.navigate(['/details'], {
      state: { data: this.selectedProduct }
    });
  }

  navigatePreserveParams() {
    this.router.navigate(['/new-page'], {
      queryParamsHandling: 'preserve'
    });
  }

  navigateMergeParams() {
    this.router.navigate(['/search'], {
      queryParams: { category: 'electronics' },
      queryParamsHandling: 'merge'
    });
  }

  // Example conditional navigation
  navigateConditionally() {
    if (this.currentUser.role === 'admin') {
      this.router.navigate(['/admin/dashboard']);
    } else if (this.currentUser.role === 'user') {
      this.router.navigate(['/user/profile']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  // Example navigation with error handling
  navigateWithErrorHandling() {
    this.router.navigate(['/invalid-route'])
      .then(() => {
        console.log('Navigation successful');
      })
      .catch(error => {
        console.error('Navigation failed:', error);
        this.router.navigate(['/error']);
      });
  }

  // Example navigation with loading state
  navigateWithLoading() {
    this.loading = true;
    this.router.navigate(['/dashboard'])
      .then(() => {
        console.log('Navigation completed');
        this.loading = false;
      })
      .catch(error => {
        console.error('Navigation failed:', error);
        this.loading = false;
      });
  }

  // Example navigation with timeout
  navigateWithTimeout() {
    setTimeout(() => {
      this.router.navigate(['/delayed-page']);
    }, 2000);
  }

  // Example navigation with confirmation
  navigateWithConfirmation() {
    if (confirm('Are you sure you want to navigate?')) {
      this.router.navigate(['/confirmed-page']);
    }
  }

  // Example navigation with data validation
  navigateWithValidation() {
    if (this.currentUser.id && this.currentUser.id > 0) {
      this.router.navigate(['/user', this.currentUser.id]);
    } else {
      console.error('Invalid user ID');
    }
  }

  // Example navigation with custom logic
  navigateWithCustomLogic() {
    const currentTime = new Date().getHours();

    if (currentTime < 12) {
      this.router.navigate(['/morning']);
    } else if (currentTime < 18) {
      this.router.navigate(['/afternoon']);
    } else {
      this.router.navigate(['/evening']);
    }
  }

  // Example navigation history
  goBack() {
    if (this.navigationHistory.length > 1) {
      this.navigationHistory.pop(); // Remove current
      const previousUrl = this.navigationHistory[this.navigationHistory.length - 1];
      this.router.navigateByUrl(previousUrl);
    }
  }

  goForward() {
    // In a real app, you would implement forward navigation
    console.log('Forward navigation not implemented');
  }

  // Example navigation service pattern
  navigateToProductById(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  navigateToUserProfile(userId: number) {
    this.router.navigate(['/user', userId, 'profile']);
  }

  navigateToAdmin() {
    if (this.currentUser.role === 'admin') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/access-denied']);
    }
  }

  // Example deep linking
  handleDeepLink(url: string) {
    const segments = url.split('/');
    if (segments[1] === 'product') {
      this.router.navigate(['/product', segments[2]]);
    } else if (segments[1] === 'user') {
      this.router.navigate(['/user', segments[2]]);
    }
  }

  // Example navigation with analytics
  navigateWithAnalytics(route: string) {
    console.log('Navigating to:', route);
    // In a real app, you would send analytics data
    this.router.navigate([route]);
  }

  // Example navigation with guards
  navigateWithGuard(route: string) {
    // Simulate guard check
    if (this.canNavigate(route)) {
      this.router.navigate([route]);
    } else {
      this.router.navigate(['/unauthorized']);
    }
  }

  private canNavigate(route: string): boolean {
    // Simulate permission check
    if (route.startsWith('/admin') && this.currentUser.role !== 'admin') {
      return false;
    }
    return true;
  }

  // Example navigation with resolvers
  navigateWithResolver(route: string) {
    // In a real app, you would use route resolvers
    this.router.navigate([route]);
  }

  // Example navigation with child routes
  navigateToChildRoute(parentRoute: string, childRoute: string) {
    this.router.navigate([parentRoute, childRoute]);
  }

  // Example navigation with named outlets
  navigateToNamedOutlet(outletName: string, route: string) {
    this.router.navigate([
      { outlets: { [outletName]: [route] } }
    ]);
  }

  // Example navigation with multiple outlets
  navigateToMultipleOutlets() {
    this.router.navigate([
      { outlets: {
        primary: ['dashboard'],
        sidebar: ['sidebar'],
        modal: ['modal']
      } }
    ]);
  }

  // Example navigation with replace URL
  navigateReplace() {
    this.router.navigate(['/new-page'], { replaceUrl: true });
  }

  // Example navigation with skip location change
  navigateSkipLocation() {
    this.router.navigate(['/internal-page'], { skipLocationChange: true });
  }

  // Example navigation with custom state
  navigateWithCustomState() {
    this.router.navigate(['/details'], {
      state: {
        data: this.selectedProduct,
        timestamp: new Date(),
        source: 'programmatic'
      }
    });
  }
}
