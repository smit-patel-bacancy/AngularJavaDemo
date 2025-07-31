import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ChildComponent } from './child-component/child-component.component';

import { DataService, User, Product } from '../services/data.service';
import { LoggerService, LogEntry } from '../services/logger.service';
import { CommunicationService, Message, ComponentEvent } from '../services/communication.service';
import { AnalyticsService, AnalyticsEvent } from '../services/analytics.service';

@Component({
  selector: 'app-services-dependency-injection-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ChildComponent],
  templateUrl: './services-dependency-injection-demo.component.html',
  styleUrls: ['./services-dependency-injection-demo.component.scss']
})
export class ServicesDependencyInjectionDemoComponent implements OnInit, OnDestroy {
  // UI State
  public activeTab = signal<'overview' | 'data' | 'logging' | 'communication' | 'analytics' | 'hierarchy' | 'instances'>('overview');
  public tabs = ['overview', 'data', 'logging', 'communication', 'analytics', 'hierarchy', 'instances'] as const;

  // Data
  public users = signal<User[]>([]);
  public products = signal<Product[]>([]);
  public logs = signal<LogEntry[]>([]);
  public messages = signal<Message[]>([]);
  public analyticsEvents = signal<AnalyticsEvent[]>([]);
  public componentEvents = signal<ComponentEvent[]>([]);

  // Form data
  public newUser = signal<Omit<User, 'id'>>({ name: '', email: '', role: 'user' });
  public newProduct = signal<Omit<Product, 'id'>>({ name: '', price: 0, category: '' });
  public searchQuery = signal('');

  // Service instance tracking
  public serviceInstances = signal<Record<string, string>>({});

  // Computed values
  public filteredUsers = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.users().filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  public filteredProducts = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.products().filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  });

  public statistics = computed(() => ({
    userCount: this.users().length,
    productCount: this.products().length,
    logCount: this.logs().length,
    messageCount: this.messages().length,
    analyticsCount: this.analyticsEvents().length
  }));

  private destroy$ = new Subject<void>();

  constructor(
    private dataService: DataService,
    private loggerService: LoggerService,
    private communicationService: CommunicationService,
    private analyticsService: AnalyticsService
  ) {
    // Track service instances
    this.serviceInstances.set({
      'DataService': this.dataService.getInstanceId(),
      'LoggerService': this.loggerService.getInstanceId(),
      'CommunicationService': this.communicationService.getInstanceId(),
      'AnalyticsService': this.analyticsService.getInstanceId()
    });

    // Log component creation
    this.loggerService.info('ServicesDependencyInjectionDemoComponent created', 'ServicesDependencyInjectionDemoComponent');
    this.communicationService.sendInfo('ServicesDependencyInjectionDemoComponent', 'System', 'Component initialized');
    this.analyticsService.trackEvent('component_created', 'ServicesDependencyInjectionDemoComponent');
  }

  ngOnInit(): void {
    this.setupSubscriptions();
    this.loadInitialData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.loggerService.info('ServicesDependencyInjectionDemoComponent destroyed', 'ServicesDependencyInjectionDemoComponent');
  }

  private setupSubscriptions(): void {
    // Subscribe to data service observables
    this.dataService.users$.pipe(takeUntil(this.destroy$)).subscribe(users => {
      this.users.set(users);
      this.analyticsService.trackEvent('users_updated', 'ServicesDependencyInjectionDemoComponent', { count: users.length });
    });

    this.dataService.products$.pipe(takeUntil(this.destroy$)).subscribe(products => {
      this.products.set(products);
      this.analyticsService.trackEvent('products_updated', 'ServicesDependencyInjectionDemoComponent', { count: products.length });
    });

    // Subscribe to logger service
    this.loggerService.logs$.pipe(takeUntil(this.destroy$)).subscribe(logs => {
      this.logs.set(logs);
    });

    // Subscribe to communication service
    this.communicationService.messages$.pipe(takeUntil(this.destroy$)).subscribe(messages => {
      this.messages.set(messages);
    });

    this.communicationService.componentEvents$.pipe(takeUntil(this.destroy$)).subscribe(event => {
      this.componentEvents.update(events => [...events, event]);
    });

    // Subscribe to analytics service
    this.analyticsService.events$.pipe(takeUntil(this.destroy$)).subscribe(events => {
      this.analyticsEvents.set(events);
    });
  }

  private loadInitialData(): void {
    // Load initial data
    this.users.set(this.dataService.getUsers());
    this.products.set(this.dataService.getProducts());
    this.logs.set(this.loggerService.getLogs());
    this.messages.set(this.communicationService.getMessages());
    this.analyticsEvents.set(this.analyticsService.getEvents());
  }

  // Tab management
  public setActiveTab(tab: typeof this.tabs[number]): void {
    this.activeTab.set(tab);
    this.analyticsService.trackUserInteraction('tab_changed', 'ServicesDependencyInjectionDemoComponent', { tab });
  }

  // User management
  public addUser(): void {
    const userData = this.newUser();
    if (userData.name && userData.email) {
      const newUser = this.dataService.addUser(userData);
      this.loggerService.info(`User added: ${newUser.name}`, 'ServicesDependencyInjectionDemoComponent');
      this.communicationService.sendSuccess('ServicesDependencyInjectionDemoComponent', 'DataService', `User ${newUser.name} added successfully`);
      this.analyticsService.trackUserInteraction('user_added', 'ServicesDependencyInjectionDemoComponent', { userId: newUser.id, userName: newUser.name });

      // Reset form
      this.newUser.set({ name: '', email: '', role: 'user' });
    }
  }

  public updateUser(user: User): void {
    const updatedUser = this.dataService.updateUser(user.id, { role: user.role === 'admin' ? 'user' : 'admin' });
    if (updatedUser) {
      this.loggerService.info(`User updated: ${updatedUser.name}`, 'ServicesDependencyInjectionDemoComponent');
      this.communicationService.sendInfo('ServicesDependencyInjectionDemoComponent', 'DataService', `User ${updatedUser.name} role updated to ${updatedUser.role}`);
      this.analyticsService.trackUserInteraction('user_updated', 'ServicesDependencyInjectionDemoComponent', { userId: updatedUser.id, newRole: updatedUser.role });
    }
  }

  public deleteUser(userId: number): void {
    const user = this.dataService.getUserById(userId);
    if (user && this.dataService.deleteUser(userId)) {
      this.loggerService.warn(`User deleted: ${user.name}`, 'ServicesDependencyInjectionDemoComponent');
      this.communicationService.sendWarning('ServicesDependencyInjectionDemoComponent', 'DataService', `User ${user.name} deleted`);
      this.analyticsService.trackUserInteraction('user_deleted', 'ServicesDependencyInjectionDemoComponent', { userId, userName: user.name });
    }
  }

  // Product management
  public addProduct(): void {
    const productData = this.newProduct();
    if (productData.name && productData.price > 0) {
      const newProduct = this.dataService.addProduct(productData);
      this.loggerService.info(`Product added: ${newProduct.name}`, 'ServicesDependencyInjectionDemoComponent');
      this.communicationService.sendSuccess('ServicesDependencyInjectionDemoComponent', 'DataService', `Product ${newProduct.name} added successfully`);
      this.analyticsService.trackUserInteraction('product_added', 'ServicesDependencyInjectionDemoComponent', { productId: newProduct.id, productName: newProduct.name });

      // Reset form
      this.newProduct.set({ name: '', price: 0, category: '' });
    }
  }

  public deleteProduct(productId: number): void {
    const product = this.dataService.getProductById(productId);
    if (product && this.dataService.deleteProduct(productId)) {
      this.loggerService.warn(`Product deleted: ${product.name}`, 'ServicesDependencyInjectionDemoComponent');
      this.communicationService.sendWarning('ServicesDependencyInjectionDemoComponent', 'DataService', `Product ${product.name} deleted`);
      this.analyticsService.trackUserInteraction('product_deleted', 'ServicesDependencyInjectionDemoComponent', { productId, productName: product.name });
    }
  }

  // Logging
  public addLog(level: LogEntry['level'], message: string): void {
    switch (level) {
      case 'info':
        this.loggerService.info(message, 'ServicesDependencyInjectionDemoComponent');
        break;
      case 'warn':
        this.loggerService.warn(message, 'ServicesDependencyInjectionDemoComponent');
        break;
      case 'error':
        this.loggerService.error(message, 'ServicesDependencyInjectionDemoComponent');
        break;
      case 'debug':
        this.loggerService.debug(message, 'ServicesDependencyInjectionDemoComponent');
        break;
    }
    this.analyticsService.trackUserInteraction('log_added', 'ServicesDependencyInjectionDemoComponent', { level, message });
  }

  public addLogFromTemplate(levelElement: HTMLSelectElement, messageElement: HTMLInputElement): void {
    const level = levelElement.value as LogEntry['level'];
    const message = messageElement.value;
    this.addLog(level, message);
    messageElement.value = '';
  }

  public clearLogs(): void {
    this.loggerService.clearLogs();
    this.analyticsService.trackUserInteraction('logs_cleared', 'ServicesDependencyInjectionDemoComponent');
  }

  // Communication
  public sendMessage(to: string, content: string, type: Message['type'] = 'info'): void {
    this.communicationService.sendMessage('ServicesDependencyInjectionDemoComponent', to, content, type);
    this.analyticsService.trackUserInteraction('message_sent', 'ServicesDependencyInjectionDemoComponent', { to, type });
  }

  public sendMessageFromTemplate(toElement: HTMLInputElement, contentElement: HTMLInputElement, typeElement: HTMLSelectElement): void {
    const to = toElement.value;
    const content = contentElement.value;
    const type = typeElement.value as Message['type'];
    this.sendMessage(to, content, type);
    toElement.value = '';
    contentElement.value = '';
  }

  public broadcastEvent(action: string, data?: any): void {
    this.communicationService.broadcastEvent('ServicesDependencyInjectionDemoComponent', action, data);
    this.analyticsService.trackUserInteraction('event_broadcast', 'ServicesDependencyInjectionDemoComponent', { action, data });
  }

  public clearMessages(): void {
    this.communicationService.clearMessages();
    this.analyticsService.trackUserInteraction('messages_cleared', 'ServicesDependencyInjectionDemoComponent');
  }

  // Analytics
  public clearAnalytics(): void {
    this.analyticsService.clearAnalytics();
    this.loggerService.info('Analytics cleared', 'ServicesDependencyInjectionDemoComponent');
  }

  public exportAnalytics(): void {
    const analyticsData = this.analyticsService.exportAnalytics();
    console.log('Analytics Export:', analyticsData);
    this.loggerService.info('Analytics exported', 'ServicesDependencyInjectionDemoComponent');
    this.analyticsService.trackUserInteraction('analytics_exported', 'ServicesDependencyInjectionDemoComponent');
  }

  // Form update methods
  public updateNewUserName(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.newUser.update(u => ({ ...u, name: target.value }));
  }

  public updateNewUserEmail(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.newUser.update(u => ({ ...u, email: target.value }));
  }

  public updateNewUserRole(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.newUser.update(u => ({ ...u, role: target.value as 'user' | 'admin' }));
  }

  public updateNewProductName(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.newProduct.update(p => ({ ...p, name: target.value }));
  }

  public updateNewProductPrice(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.newProduct.update(p => ({ ...p, price: +target.value }));
  }

  public updateNewProductCategory(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.newProduct.update(p => ({ ...p, category: target.value }));
  }

  // Utility methods
  public updateSearchQuery(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  public getServiceInstanceId(serviceName: string): string {
    return this.serviceInstances()[serviceName] || 'Unknown';
  }

  public simulateError(): void {
    this.loggerService.error('This is a simulated error for demonstration purposes', 'ServicesDependencyInjectionDemoComponent');
    this.communicationService.sendError('ServicesDependencyInjectionDemoComponent', 'System', 'Simulated error occurred');
    this.analyticsService.trackError('Simulated error', 'ServicesDependencyInjectionDemoComponent');
  }

  public resetAllData(): void {
    this.clearLogs();
    this.clearMessages();
    this.clearAnalytics();
    this.loggerService.info('All data reset', 'ServicesDependencyInjectionDemoComponent');
    this.communicationService.sendInfo('ServicesDependencyInjectionDemoComponent', 'System', 'All data has been reset');
  }
}
