import { Component, OnInit, OnDestroy, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, of, from, interval, timer, throwError, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { map, filter, take, catchError, tap, switchMap, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-observables-signals-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './observables-signals-demo.component.html',
  styleUrls: ['./observables-signals-demo.component.scss']
})
export class ObservablesSignalsDemoComponent implements OnInit, OnDestroy {
  // Signals
  public count = signal(0);
  public userInput = signal('');
  public users = signal<User[]>([]);
  public isLoading = signal(false);
  public error = signal<string | null>(null);

  // Computed signals
  public doubleCount = computed(() => this.count() * 2);
  public filteredUsers = computed(() =>
    this.users().filter(user =>
      user.name.toLowerCase().includes(this.userInput().toLowerCase())
    )
  );

  // Observable properties
  public observableData: string[] = [];
  public promiseData: string[] = [];
  public customObservableData: number[] = [];
  public errorData: string[] = [];
  public completionData: string[] = [];

  // Observable streams
  private dataStream$ = new BehaviorSubject<string>('');
  private userStream$ = new ReplaySubject<User>(3);
  private destroy$ = new Subject<void>();

  // UI state
  public activeTab = signal<'observables' | 'signals' | 'comparison' | 'custom' | 'errors'>('observables');
  public searchTerm = signal('');
  public tabs: ('observables' | 'signals' | 'comparison' | 'custom' | 'errors')[] = ['observables', 'signals', 'comparison', 'custom', 'errors'];

  constructor() {
    // Effect to log count changes
    effect(() => {
      console.log(`Count changed to: ${this.count()}`);
    });

    // Effect to handle search
    effect(() => {
      const term = this.searchTerm();
      if (term) {
        this.performSearch(term);
      }
    });
  }

  ngOnInit(): void {
    this.setupObservables();
    this.setupCustomObservable();
    this.setupErrorHandling();
    this.setupCompletionHandling();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ===== SIGNALS DEMO =====
  public incrementCount(): void {
    this.count.update(count => count + 1);
  }

  public decrementCount(): void {
    this.count.update(count => Math.max(0, count - 1));
  }

  public resetCount(): void {
    this.count.set(0);
  }

  public updateUserInput(input: string): void {
    this.userInput.set(input);
  }

  public addUser(name: string, email: string): void {
    const newUser: User = {
      id: Date.now(),
      name,
      email
    };
    this.users.update(users => [...users, newUser]);
  }

  public removeUser(id: number): void {
    this.users.update(users => users.filter(user => user.id !== id));
  }

  // ===== OBSERVABLES DEMO =====
  private setupObservables(): void {
    // Basic Observable
    const basicObservable$ = of('Hello', 'World', 'from', 'Observable');
    basicObservable$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.observableData.push(data);
    });

    // Interval Observable
    const interval$ = interval(1000).pipe(
      take(5),
      map(value => `Interval: ${value}`),
      takeUntil(this.destroy$)
    );
    interval$.subscribe(data => {
      this.observableData.push(data);
    });

    // From array Observable
    const arrayObservable$ = from([1, 2, 3, 4, 5]).pipe(
      map(value => `Array value: ${value}`),
      takeUntil(this.destroy$)
    );
    arrayObservable$.subscribe(data => {
      this.observableData.push(data);
    });
  }

  // ===== PROMISES VS OBSERVABLES =====
  public demonstratePromiseVsObservable(): void {
    // Promise example
    const promise = new Promise<string>((resolve) => {
      setTimeout(() => resolve('Promise resolved'), 1000);
    });
    promise.then(data => this.promiseData.push(data));

    // Observable equivalent
    const observable = new Observable<string>(observer => {
      setTimeout(() => {
        observer.next('Observable emitted');
        observer.complete();
      }, 1000);
    });
    observable.pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => this.promiseData.push(data));
  }

  // ===== CUSTOM OBSERVABLE =====
  private setupCustomObservable(): void {
    const customObservable$ = new Observable<number>(observer => {
      let count = 0;
      const interval = setInterval(() => {
        count++;
        observer.next(count);
        if (count >= 5) {
          observer.complete();
          clearInterval(interval);
        }
      }, 500);
    });

    customObservable$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (value) => this.customObservableData.push(value),
      error: (error) => console.error('Custom observable error:', error),
      complete: () => this.customObservableData.push(-1) // -1 indicates completion
    });
  }

  // ===== ERROR HANDLING =====
  private setupErrorHandling(): void {
    // Observable that throws an error
    const errorObservable$ = throwError(() => new Error('This is a test error'));

    errorObservable$.pipe(
      catchError(error => {
        this.errorData.push(`Caught error: ${error.message}`);
        return of('Recovered from error');
      }),
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.errorData.push(`After error: ${data}`);
    });

    // Observable with error handling
    const riskyObservable$ = new Observable<number>(observer => {
      let count = 0;
      const interval = setInterval(() => {
        count++;
        if (count === 3) {
          observer.error(new Error('Intentional error at count 3'));
          clearInterval(interval);
        } else {
          observer.next(count);
        }
      }, 300);
    });

    riskyObservable$.pipe(
      catchError(error => {
        this.errorData.push(`Risky observable error: ${error.message}`);
        return of(0);
      }),
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.errorData.push(`Risky observable data: ${data}`);
    });
  }

  // ===== COMPLETION HANDLING =====
  private setupCompletionHandling(): void {
    const completionObservable$ = new Observable<string>(observer => {
      observer.next('First value');
      observer.next('Second value');
      observer.next('Third value');
      observer.complete();
    });

    completionObservable$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (value) => this.completionData.push(value),
      error: (error) => this.completionData.push(`Error: ${error.message}`),
      complete: () => this.completionData.push('Observable completed!')
    });
  }

  // ===== ADVANCED OBSERVABLE PATTERNS =====
  public setupAdvancedPatterns(): void {
    // Debounced search
    const searchInput$ = new Subject<string>();

    searchInput$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(term => term.length > 2),
      switchMap(term => this.performSearch(term)),
      takeUntil(this.destroy$)
    ).subscribe(results => {
      console.log('Search results:', results);
    });
  }

  private performSearch(term: string): Observable<User[]> {
    // Simulate API call
    return of([
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ]).pipe(
      map(users => users.filter(user =>
        user.name.toLowerCase().includes(term.toLowerCase())
      ))
    );
  }

  // ===== UTILITY METHODS =====
  public clearData(): void {
    this.observableData = [];
    this.promiseData = [];
    this.customObservableData = [];
    this.errorData = [];
    this.completionData = [];
  }

  public setActiveTab(tab: 'observables' | 'signals' | 'comparison' | 'custom' | 'errors'): void {
    this.activeTab.set(tab);
  }

  public simulateLoading(): void {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 2000);
  }

  public simulateError(): void {
    this.error.set('This is a simulated error');
    setTimeout(() => {
      this.error.set(null);
    }, 3000);
  }
}
