import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-router-links',
  standalone: true,
  imports: [],
  templateUrl: './router-links.component.html',
  styleUrl: './router-links.component.scss'
})
export class RouterLinksComponent {

  // Example data for demonstration
  userId: number = 123;
  productId: number = 456;
  category: string = 'electronics';
  searchQuery: string = 'angular';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Example navigation methods
  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToUser() {
    this.router.navigate(['/user', this.userId]);
  }

  navigateToProduct() {
    this.router.navigate(['/product', this.category, this.productId]);
  }

  navigateWithQueryParams() {
    this.router.navigate(['/search'], {
      queryParams: {
        query: this.searchQuery,
        page: 1
      }
    });
  }

  navigateWithFragment() {
    this.router.navigate(['/page'], {
      fragment: 'section1'
    });
  }

  navigateRelative() {
    this.router.navigate(['./child'], { relativeTo: this.route });
  }

  navigateToParent() {
    this.router.navigate(['../parent'], { relativeTo: this.route });
  }

  // Example button navigation
  navigateWithButton() {
    this.router.navigate(['/dashboard']);
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

  // Example navigation with multiple query params
  navigateWithMultipleParams() {
    this.router.navigate(['/products'], {
      queryParams: {
        category: 'electronics',
        brand: 'apple',
        price: '100-500',
        sortBy: 'name'
      }
    });
  }

  // Example navigation with fragment and query params
  navigateWithFragmentAndParams() {
    this.router.navigate(['/documentation'], {
      queryParams: { version: 'latest' },
      fragment: 'installation'
    });
  }

  // Example navigation with preserved query params
  navigatePreserveParams() {
    this.router.navigate(['/new-page'], {
      queryParamsHandling: 'preserve'
    });
  }

  // Example navigation with merged query params
  navigateMergeParams() {
    this.router.navigate(['/search'], {
      queryParams: { category: 'electronics' },
      queryParamsHandling: 'merge'
    });
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
    console.log('Starting navigation...');
    this.router.navigate(['/dashboard'])
      .then(() => {
        console.log('Navigation completed');
      })
      .catch(error => {
        console.error('Navigation failed:', error);
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
    if (this.userId && this.userId > 0) {
      this.router.navigate(['/user', this.userId]);
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
}
