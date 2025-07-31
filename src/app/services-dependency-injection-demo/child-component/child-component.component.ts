import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { DataService, User, Product } from '../../services/data.service';
import { LoggerService } from '../../services/logger.service';
import { CommunicationService } from '../../services/communication.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-child-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.scss']
})
export class ChildComponent implements OnInit, OnDestroy {
  public users: User[] = [];
  public products: Product[] = [];
  public serviceInstances: Record<string, string> = {};

  private destroy$ = new Subject<void>();

  constructor(
    private dataService: DataService,
    private loggerService: LoggerService,
    private communicationService: CommunicationService,
    private analyticsService: AnalyticsService
  ) {
    // Track service instances to demonstrate they're the same as parent
    this.serviceInstances = {
      'DataService': this.dataService.getInstanceId(),
      'LoggerService': this.loggerService.getInstanceId(),
      'CommunicationService': this.communicationService.getInstanceId(),
      'AnalyticsService': this.analyticsService.getInstanceId()
    };

    // Log component creation
    this.loggerService.info('ChildComponent created', 'ChildComponent');
    this.communicationService.sendInfo('ChildComponent', 'Parent', 'Child component initialized');
    this.analyticsService.trackEvent('child_component_created', 'ChildComponent');
  }

  ngOnInit(): void {
    this.setupSubscriptions();
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.loggerService.info('ChildComponent destroyed', 'ChildComponent');
  }

  private setupSubscriptions(): void {
    // Subscribe to data service observables
    this.dataService.users$.pipe(takeUntil(this.destroy$)).subscribe(users => {
      this.users = users;
      this.analyticsService.trackEvent('child_users_updated', 'ChildComponent', { count: users.length });
    });

    this.dataService.products$.pipe(takeUntil(this.destroy$)).subscribe(products => {
      this.products = products;
      this.analyticsService.trackEvent('child_products_updated', 'ChildComponent', { count: products.length });
    });
  }

  private loadData(): void {
    this.users = this.dataService.getUsers();
    this.products = this.dataService.getProducts();
  }

  // Child component actions
  public addSampleUser(): void {
    const newUser = this.dataService.addUser({
      name: 'Child User',
      email: 'child@example.com',
      role: 'user'
    });
    this.loggerService.info(`Child component added user: ${newUser.name}`, 'ChildComponent');
    this.communicationService.sendSuccess('ChildComponent', 'Parent', `Added user: ${newUser.name}`);
  }

  public addSampleProduct(): void {
    const newProduct = this.dataService.addProduct({
      name: 'Child Product',
      price: 99.99,
      category: 'Child Category'
    });
    this.loggerService.info(`Child component added product: ${newProduct.name}`, 'ChildComponent');
    this.communicationService.sendSuccess('ChildComponent', 'Parent', `Added product: ${newProduct.name}`);
  }

  public sendMessageToParent(): void {
    this.communicationService.sendInfo('ChildComponent', 'Parent', 'Hello from child component!');
    this.loggerService.info('Child component sent message to parent', 'ChildComponent');
  }

  public broadcastChildEvent(): void {
    this.communicationService.broadcastEvent('ChildComponent', 'child_action', { timestamp: new Date() });
    this.loggerService.info('Child component broadcasted event', 'ChildComponent');
  }

  public getServiceInstanceId(serviceName: string): string {
    return this.serviceInstances[serviceName] || 'Unknown';
  }

  public demonstrateHierarchy(): void {
    this.loggerService.info('Child component demonstrating hierarchical injection', 'ChildComponent');
    this.communicationService.sendInfo('ChildComponent', 'System', 'Demonstrating service inheritance');
    this.analyticsService.trackEvent('hierarchy_demonstration', 'ChildComponent');
  }
}
