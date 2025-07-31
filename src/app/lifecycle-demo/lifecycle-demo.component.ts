import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked, SimpleChanges, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lifecycle-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lifecycle-demo.component.html',
  styleUrls: ['./lifecycle-demo.component.scss']
})
export class LifecycleDemoComponent implements
  OnInit,
  OnDestroy,
  OnChanges,
  AfterViewInit,
  AfterViewChecked,
  AfterContentInit,
  AfterContentChecked {

  @Input() demoInput: string = 'Initial Value';
  @ViewChild('viewChildElement') viewChildElement!: ElementRef;

  lifecycleLogs: string[] = [];
  counter: number = 0;
  showChild: boolean = true;
  private intervalId: any;

  constructor(private cdr: ChangeDetectorRef) {
    this.logLifecycle('Constructor called');
  }

  ngOnInit(): void {
    this.logLifecycle('ngOnInit called');
    this.startCounter();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.logLifecycle('ngOnChanges called');
    if (changes['demoInput']) {
      this.logLifecycle(`Input changed from "${changes['demoInput'].previousValue}" to "${changes['demoInput'].currentValue}"`);
    }
  }

  ngAfterContentInit(): void {
    this.logLifecycle('ngAfterContentInit called');
  }

  ngAfterContentChecked(): void {
    this.logLifecycle('ngAfterContentChecked called');
  }

  ngAfterViewInit(): void {
    this.logLifecycle('ngAfterViewInit called');
    if (this.viewChildElement) {
      this.logLifecycle(`ViewChild element found: ${this.viewChildElement.nativeElement.textContent}`);
    }
  }

  ngAfterViewChecked(): void {
    this.logLifecycle('ngAfterViewChecked called');
  }

  ngOnDestroy(): void {
    this.logLifecycle('ngOnDestroy called');
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private logLifecycle(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    console.log(logMessage);
    this.lifecycleLogs.unshift(logMessage);

    // Keep only last 20 logs
    if (this.lifecycleLogs.length > 20) {
      this.lifecycleLogs = this.lifecycleLogs.slice(0, 20);
    }
  }

  private startCounter(): void {
    this.intervalId = setInterval(() => {
      this.counter++;
      this.cdr.detectChanges();
    }, 2000);
  }

  updateInput(): void {
    this.demoInput = `Updated at ${new Date().toLocaleTimeString()}`;
  }

  toggleChild(): void {
    this.showChild = !this.showChild;
  }

  clearLogs(): void {
    this.lifecycleLogs = [];
  }
}
