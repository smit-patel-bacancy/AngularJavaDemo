import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, map, filter, switchMap, catchError, debounceTime, distinctUntilChanged, combineLatest } from 'rxjs';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-reactive-parameters',
  standalone: true,
  imports: [],
  templateUrl: './reactive-parameters.component.html',
  styleUrl: './reactive-parameters.component.scss'
})
export class ReactiveParametersComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Example data for demonstration
  currentUser: any = null;
  currentProduct: any = null;
  dashboardData: any = null;

  // Form data for reactive forms example
  userFormData: any = {
    id: '',
    name: '',
    email: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.setupReactiveParameterHandling();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupReactiveParameterHandling() {
    // Example 1: Basic reactive parameter subscription
    this.route.paramMap
      .pipe(
        map(params => Number(params.get('id'))),
        filter(id => !isNaN(id)),
        takeUntil(this.destroy$)
      )
      .subscribe(userId => {
        this.loadUser(userId);
      });

    // Example 2: Multiple parameter handling
    this.route.paramMap
      .pipe(
        map(params => ({
          category: params.get('category'),
          id: Number(params.get('id'))
        })),
        filter(params => !!params.category && !isNaN(params.id)),
        takeUntil(this.destroy$)
      )
      .subscribe(params => {
        this.loadProduct(params.category!, params.id);
      });

    // Example 3: Combined parameter and query parameter streams
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ]).pipe(
      map(([params, queryParams]) => ({
        contentType: params.get('type'),
        category: queryParams.get('category'),
        page: Number(queryParams.get('page')) || 1
      })),
      takeUntil(this.destroy$)
    ).subscribe(filters => {
      this.loadContent(filters);
    });

    // Example 4: Parameter with debouncing
    this.route.paramMap
      .pipe(
        map(params => ({
          view: params.get('view') || 'overview',
          period: params.get('period') || 'week'
        })),
        debounceTime(300),
        distinctUntilChanged((prev, curr) =>
          prev.view === curr.view && prev.period === curr.period
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(params => {
        this.loadDashboard(params.view, params.period);
      });
  }

  // Example methods for demonstration
  private loadUser(userId: number) {
    // Simulate API call
    console.log('Loading user with ID:', userId);
    this.currentUser = {
      id: userId,
      name: `User ${userId}`,
      email: `user${userId}@example.com`
    };
  }

  private loadProduct(category: string, id: number) {
    // Simulate API call
    console.log('Loading product:', category, id);
    this.currentProduct = {
      id: id,
      category: category,
      name: `${category} Product ${id}`,
      price: Math.random() * 100
    };
  }

  private loadContent(filters: any) {
    // Simulate API call
    console.log('Loading content with filters:', filters);
  }

  private loadDashboard(view: string, period: string) {
    // Simulate API call
    console.log('Loading dashboard:', view, period);
    this.dashboardData = {
      view: view,
      period: period,
      data: Math.random() * 1000
    };
  }

  // Example navigation methods
  navigateToUser(userId: number) {
    this.router.navigate(['/user', userId]);
  }

  navigateToProduct(category: string, id: number) {
    this.router.navigate(['/product', category, id]);
  }

  navigateWithQueryParams() {
    this.router.navigate(['/search'], {
      queryParams: {
        query: 'angular',
        page: 1,
        category: 'tutorials'
      }
    });
  }

  // Example form handling
  updateUserForm(userId: number) {
    this.userFormData = {
      id: userId,
      name: `User ${userId}`,
      email: `user${userId}@example.com`
    };
  }
}
