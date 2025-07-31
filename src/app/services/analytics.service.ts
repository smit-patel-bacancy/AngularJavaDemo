import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from './data.service';
import { LoggerService } from './logger.service';
import { CommunicationService } from './communication.service';

export interface AnalyticsEvent {
  id: number;
  eventType: string;
  component: string;
  data?: any;
  timestamp: Date;
  serviceInstanceId: string;
}

export interface AnalyticsSummary {
  totalEvents: number;
  eventsByType: Record<string, number>;
  eventsByComponent: Record<string, number>;
  averageEventsPerMinute: number;
}

@Injectable({
  providedIn: 'root' // Singleton service
})
export class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private eventsSubject = new BehaviorSubject<AnalyticsEvent[]>([]);
  private serviceInstanceId: string;

  public events$ = this.eventsSubject.asObservable();

  constructor(
    private dataService: DataService,
    private loggerService: LoggerService,
    private communicationService: CommunicationService
  ) {
    this.serviceInstanceId = Math.random().toString(36).substr(2, 9);
    console.log(`AnalyticsService instance created with ID: ${this.serviceInstanceId}`);

    // Log service creation
    this.loggerService.info(`AnalyticsService created with ID: ${this.serviceInstanceId}`, 'AnalyticsService');
    this.communicationService.sendInfo('AnalyticsService', 'System', 'Service initialized');
  }

  public getInstanceId(): string {
    return this.serviceInstanceId;
  }

  // Track events
  public trackEvent(eventType: string, component: string, data?: any): AnalyticsEvent {
    const event: AnalyticsEvent = {
      id: Date.now(),
      eventType,
      component,
      data,
      timestamp: new Date(),
      serviceInstanceId: this.serviceInstanceId
    };

    this.events.push(event);
    this.eventsSubject.next([...this.events]);

    // Log the event
    this.loggerService.info(`Event tracked: ${eventType} from ${component}`, 'AnalyticsService');
    this.communicationService.sendInfo('AnalyticsService', component, `Event tracked: ${eventType}`);

    return event;
  }

  // Get analytics data
  public getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  public getEventsByType(eventType: string): AnalyticsEvent[] {
    return this.events.filter(event => event.eventType === eventType);
  }

  public getEventsByComponent(component: string): AnalyticsEvent[] {
    return this.events.filter(event => event.component === component);
  }

  public getEventsByTimeRange(startTime: Date, endTime: Date): AnalyticsEvent[] {
    return this.events.filter(event =>
      event.timestamp >= startTime && event.timestamp <= endTime
    );
  }

  // Analytics summaries
  public getAnalyticsSummary(): AnalyticsSummary {
    const eventsByType: Record<string, number> = {};
    const eventsByComponent: Record<string, number> = {};

    this.events.forEach(event => {
      eventsByType[event.eventType] = (eventsByType[event.eventType] || 0) + 1;
      eventsByComponent[event.component] = (eventsByComponent[event.component] || 0) + 1;
    });

    const totalEvents = this.events.length;
    const timeSpan = this.events.length > 0 ?
      (this.events[this.events.length - 1].timestamp.getTime() - this.events[0].timestamp.getTime()) / (1000 * 60) : 0;
    const averageEventsPerMinute = timeSpan > 0 ? totalEvents / timeSpan : 0;

    return {
      totalEvents,
      eventsByType,
      eventsByComponent,
      averageEventsPerMinute
    };
  }

  // Track data service operations
  public trackDataOperation(operation: string, data?: any): void {
    this.trackEvent('data_operation', 'DataService', { operation, data });
  }

  // Track user interactions
  public trackUserInteraction(interaction: string, component: string, data?: any): void {
    this.trackEvent('user_interaction', component, { interaction, data });
  }

  // Track errors
  public trackError(error: string, component: string, data?: any): void {
    this.trackEvent('error', component, { error, data });
    this.loggerService.error(`Analytics error: ${error}`, 'AnalyticsService');
  }

  // Clear analytics
  public clearAnalytics(): void {
    this.events = [];
    this.eventsSubject.next([]);
    this.loggerService.info('Analytics cleared', 'AnalyticsService');
    this.communicationService.sendInfo('AnalyticsService', 'System', 'Analytics data cleared');
  }

  // Export analytics
  public exportAnalytics(): string {
    return JSON.stringify({
      summary: this.getAnalyticsSummary(),
      events: this.events
    }, null, 2);
  }

  // Service lifecycle demonstration
  public logServiceAction(action: string): void {
    this.trackEvent('service_action', 'AnalyticsService', { action });
    this.loggerService.info(`Service action: ${action}`, 'AnalyticsService');
  }
}
