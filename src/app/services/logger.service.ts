import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface LogEntry {
  id: number;
  timestamp: Date;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  component: string;
  serviceInstanceId?: string;
}

@Injectable({
  providedIn: 'root' // Singleton service
})
export class LoggerService {
  private logs: LogEntry[] = [];
  private logsSubject = new BehaviorSubject<LogEntry[]>([]);
  private serviceInstanceId: string;

  public logs$ = this.logsSubject.asObservable();

  constructor() {
    this.serviceInstanceId = Math.random().toString(36).substr(2, 9);
    console.log(`LoggerService instance created with ID: ${this.serviceInstanceId}`);
  }

  public getInstanceId(): string {
    return this.serviceInstanceId;
  }

  public info(message: string, component: string): void {
    this.addLog('info', message, component);
  }

  public warn(message: string, component: string): void {
    this.addLog('warn', message, component);
  }

  public error(message: string, component: string): void {
    this.addLog('error', message, component);
  }

  public debug(message: string, component: string): void {
    this.addLog('debug', message, component);
  }

  private addLog(level: LogEntry['level'], message: string, component: string): void {
    const logEntry: LogEntry = {
      id: Date.now(),
      timestamp: new Date(),
      level,
      message,
      component,
      serviceInstanceId: this.serviceInstanceId
    };

    this.logs.push(logEntry);
    this.logsSubject.next([...this.logs]);

    // Also log to console for debugging
    const consoleMethod = level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log';
    console[consoleMethod](`[${component}] ${message}`);
  }

  public getLogs(): LogEntry[] {
    return [...this.logs];
  }

  public getLogsByLevel(level: LogEntry['level']): LogEntry[] {
    return this.logs.filter(log => log.level === level);
  }

  public getLogsByComponent(component: string): LogEntry[] {
    return this.logs.filter(log => log.component === component);
  }

  public clearLogs(): void {
    this.logs = [];
    this.logsSubject.next([]);
  }

  public getLogCount(): number {
    return this.logs.length;
  }

  public getLogCountByLevel(level: LogEntry['level']): number {
    return this.logs.filter(log => log.level === level).length;
  }

  // Export logs functionality
  public exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  // Service lifecycle demonstration
  public logServiceAction(action: string): void {
    this.info(`Service action: ${action}`, 'LoggerService');
  }
}
