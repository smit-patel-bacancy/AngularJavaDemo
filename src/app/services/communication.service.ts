import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface Message {
  id: number;
  from: string;
  to: string;
  content: string;
  timestamp: Date;
  type: 'info' | 'warning' | 'error' | 'success';
}

export interface ComponentEvent {
  id: number;
  component: string;
  action: string;
  data?: any;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root' // Singleton service for cross-component communication
})
export class CommunicationService {
  private messages: Message[] = [];
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  private componentEventsSubject = new Subject<ComponentEvent>();
  private serviceInstanceId: string;

  public messages$ = this.messagesSubject.asObservable();
  public componentEvents$ = this.componentEventsSubject.asObservable();

  constructor() {
    this.serviceInstanceId = Math.random().toString(36).substr(2, 9);
    console.log(`CommunicationService instance created with ID: ${this.serviceInstanceId}`);
  }

  public getInstanceId(): string {
    return this.serviceInstanceId;
  }

  // Message handling
  public sendMessage(from: string, to: string, content: string, type: Message['type'] = 'info'): Message {
    const message: Message = {
      id: Date.now(),
      from,
      to,
      content,
      timestamp: new Date(),
      type
    };

    this.messages.push(message);
    this.messagesSubject.next([...this.messages]);
    return message;
  }

  public getMessages(): Message[] {
    return [...this.messages];
  }

  public getMessagesByComponent(component: string): Message[] {
    return this.messages.filter(msg => msg.from === component || msg.to === component);
  }

  public getMessagesByType(type: Message['type']): Message[] {
    return this.messages.filter(msg => msg.type === type);
  }

  public clearMessages(): void {
    this.messages = [];
    this.messagesSubject.next([]);
  }

  // Component event broadcasting
  public broadcastEvent(component: string, action: string, data?: any): void {
    const event: ComponentEvent = {
      id: Date.now(),
      component,
      action,
      data,
      timestamp: new Date()
    };

    this.componentEventsSubject.next(event);
  }

  // Quick message methods
  public sendInfo(from: string, to: string, content: string): Message {
    return this.sendMessage(from, to, content, 'info');
  }

  public sendWarning(from: string, to: string, content: string): Message {
    return this.sendMessage(from, to, content, 'warning');
  }

  public sendError(from: string, to: string, content: string): Message {
    return this.sendMessage(from, to, content, 'error');
  }

  public sendSuccess(from: string, to: string, content: string): Message {
    return this.sendMessage(from, to, content, 'success');
  }

  // Statistics
  public getMessageCount(): number {
    return this.messages.length;
  }

  public getMessageCountByType(type: Message['type']): number {
    return this.messages.filter(msg => msg.type === type).length;
  }

  public getMessageCountByComponent(component: string): number {
    return this.messages.filter(msg => msg.from === component || msg.to === component).length;
  }

  // Service lifecycle demonstration
  public logServiceAction(action: string): void {
    this.sendInfo('CommunicationService', 'System', `Service action: ${action}`);
  }
}
