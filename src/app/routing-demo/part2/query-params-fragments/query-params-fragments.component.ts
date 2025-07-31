import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, map, filter, debounceTime, distinctUntilChanged, combineLatest } from 'rxjs';

@Component({
  selector: 'app-query-params-fragments',
  standalone: true,
  imports: [],
  templateUrl: './query-params-fragments.component.html',
  styleUrl: './query-params-fragments.component.scss'
})
export class QueryParamsFragmentsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Example data for demonstration
  currentFilters: any = {
    category: '',
    brand: '',
    price: '',
    sortBy: 'name'
  };

  currentPagination: any = {
    page: 1,
    size: 10,
    sortBy: 'id',
    sortOrder: 'asc'
  };

  currentFragment: string = '';
  currentDocumentation: any = {
    version: 'latest',
    section: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.setupQueryParameterHandling();
    this.setupFragmentHandling();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupQueryParameterHandling() {
    // Example 1: Basic query parameter subscription
    this.route.queryParamMap
      .pipe(
        map(params => ({
          category: params.get('category'),
          brand: params.get('brand'),
          price: params.get('price')
        })),
        filter(filters => !!filters.category),
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe(filters => {
        this.applyFilters(filters);
      });

    // Example 2: Pagination query parameters
    this.route.queryParamMap
      .pipe(
        map(params => ({
          page: Number(params.get('page')) || 1,
          size: Number(params.get('size')) || 10,
          sortBy: params.get('sortBy') || 'id',
          sortOrder: params.get('sortOrder') || 'asc'
        })),
        takeUntil(this.destroy$)
      )
      .subscribe(pagination => {
        this.loadData(pagination);
      });

    // Example 3: Dashboard configuration
    this.route.queryParamMap
      .pipe(
        map(params => ({
          view: params.get('view') || 'overview',
          period: params.get('period') || 'week',
          theme: params.get('theme') || 'light'
        })),
        distinctUntilChanged((prev, curr) =>
          prev.view === curr.view &&
          prev.period === curr.period &&
          prev.theme === curr.theme
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(config => {
        this.configureDashboard(config);
      });
  }

  private setupFragmentHandling() {
    // Handle fragment changes
    this.route.fragment
      .pipe(takeUntil(this.destroy$))
      .subscribe(fragment => {
        if (fragment) {
          this.scrollToSection(fragment);
          this.currentFragment = fragment;
        }
      });

    // Handle documentation with query params and fragments
    combineLatest([
      this.route.queryParamMap,
      this.route.fragment
    ]).pipe(
      map(([queryParams, fragment]) => ({
        version: queryParams.get('version') || 'latest',
        section: fragment || ''
      })),
      takeUntil(this.destroy$)
    ).subscribe(docConfig => {
      this.loadDocumentation(docConfig);
    });
  }

  // Example methods for demonstration
  private applyFilters(filters: any) {
    console.log('Applying filters:', filters);
    this.currentFilters = { ...this.currentFilters, ...filters };
  }

  private loadData(pagination: any) {
    console.log('Loading data with pagination:', pagination);
    this.currentPagination = pagination;
  }

  private configureDashboard(config: any) {
    console.log('Configuring dashboard:', config);
  }

  private scrollToSection(sectionId: string) {
    console.log('Scrolling to section:', sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  private loadDocumentation(docConfig: any) {
    console.log('Loading documentation:', docConfig);
    this.currentDocumentation = docConfig;
  }

  // Example navigation methods
  navigateWithQueryParams() {
    this.router.navigate(['/products'], {
      queryParams: {
        category: 'electronics',
        brand: 'apple',
        price: '100-500'
      }
    });
  }

  navigateWithFragment() {
    this.router.navigate(['/documentation'], {
      fragment: 'getting-started'
    });
  }

  navigateWithQueryParamsAndFragment() {
    this.router.navigate(['/documentation'], {
      queryParams: { version: 'latest' },
      fragment: 'installation'
    });
  }

  preserveQueryParams() {
    this.router.navigate(['/products'], {
      queryParams: { category: 'electronics' },
      queryParamsHandling: 'preserve'
    });
  }

  mergeQueryParams() {
    this.router.navigate(['/products'], {
      queryParams: { brand: 'apple' },
      queryParamsHandling: 'merge'
    });
  }

  updateFilters(filterType: string, value: any) {
    const currentParams = this.route.snapshot.queryParamMap;
    const newParams = { ...currentParams, [filterType]: value };

    this.router.navigate([], {
      queryParams: newParams,
      queryParamsHandling: 'merge'
    });
  }

  changePage(page: number) {
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }

  // Example validation methods
  private validateQueryParams(params: any) {
    const category = params.get('category');
    const price = params.get('price');

    if (!category || !this.isValidCategory(category)) {
      return { isValid: false };
    }

    return {
      isValid: true,
      data: { category, price }
    };
  }

  private isValidCategory(category: string): boolean {
    const validCategories = ['electronics', 'clothing', 'books', 'sports'];
    return validCategories.includes(category);
  }

  // Example URL management methods
  encodeQueryParams() {
    this.router.navigate(['/search'], {
      queryParams: {
        query: encodeURIComponent('angular & typescript'),
        category: 'programming'
      }
    });
  }

  decodeQueryParams() {
    this.route.queryParamMap.subscribe(params => {
      const query = decodeURIComponent(params.get('query') || '');
      console.log('Decoded query:', query);
    });
  }
}
