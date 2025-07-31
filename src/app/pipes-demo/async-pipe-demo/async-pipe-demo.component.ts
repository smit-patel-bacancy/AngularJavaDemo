import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, interval, Subject, timer } from 'rxjs';
import { take, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-async-pipe-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './async-pipe-demo.component.html',
  styleUrl: './async-pipe-demo.component.scss'
})
export class AsyncPipeDemoComponent implements OnInit, OnDestroy {
  // Observable examples
  promiseValue = new Promise<string>((resolve) => {
    setTimeout(() => resolve('Promise resolved after 2 seconds!'), 2000);
  });

  timerObservable = timer(0, 1000).pipe(
    map(count => `Timer: ${count} seconds`),
    take(10)
  );

  intervalObservable = interval(1500).pipe(
    map(count => `Interval: ${count + 1} seconds`),
    take(5)
  );

  // Subject for manual control
  subjectValue = new Subject<string>();
  subjectCounter = 0;

  // For demonstrating manual subscription vs async pipe
  manualSubscriptionValue = '';
  private destroy$ = new Subject<void>();

  ngOnInit() {
    // Simulate manual subscription
    this.timerObservable.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.manualSubscriptionValue = value;
    });

    // Emit values to subject
    const subjectInterval = setInterval(() => {
      this.subjectCounter++;
      this.subjectValue.next(`Subject value ${this.subjectCounter}`);

      if (this.subjectCounter >= 5) {
        clearInterval(subjectInterval);
        this.subjectValue.complete();
      }
    }, 2000);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Examples for demonstration
  examples = [
    {
      name: 'Promise',
      description: 'Handling Promise values',
      observable: this.promiseValue
    },
    {
      name: 'Timer Observable',
      description: 'Timer that emits every second',
      observable: this.timerObservable
    },
    {
      name: 'Interval Observable',
      description: 'Interval that emits every 1.5 seconds',
      observable: this.intervalObservable
    },
    {
      name: 'Subject',
      description: 'Manual control with Subject',
      observable: this.subjectValue.asObservable()
    }
  ];
}
