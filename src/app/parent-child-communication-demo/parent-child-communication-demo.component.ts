import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunicationChildComponent } from '../communication-child/communication-child.component';

@Component({
  selector: 'app-parent-child-communication-demo',
  standalone: true,
  imports: [CommonModule, CommunicationChildComponent],
  templateUrl: './parent-child-communication-demo.component.html',
  styleUrls: ['./parent-child-communication-demo.component.scss']
})
export class ParentChildCommunicationDemoComponent {

  // Parent to Child communication
  parentMessage: string = 'Hello from Parent!';
  parentData: any = {
    name: 'John Doe',
    age: 30,
    role: 'Developer'
  };

  // Child to Parent communication
  childMessages: string[] = [];
  childData: any = {};

  // Two-way binding
  sharedValue: string = 'Initial Shared Value';

  // Service communication simulation
  serviceData: string[] = ['Service Item 1', 'Service Item 2', 'Service Item 3'];

  // ViewChild communication
  @ViewChild('childComponentRef') childComponentRef: any;

  // Content projection
  projectedContent: string = 'This content is projected from parent to child';

  // Template context
  templateContext = {
    title: 'Template Context Demo',
    items: ['Item 1', 'Item 2', 'Item 3'],
    user: this.parentData
  };

  // Event handlers for child communication
  onChildMessage(message: string): void {
    this.childMessages.unshift(`[${new Date().toLocaleTimeString()}] ${message}`);
    if (this.childMessages.length > 10) {
      this.childMessages = this.childMessages.slice(0, 10);
    }
  }

  onChildDataUpdate(data: any): void {
    this.childData = { ...this.childData, ...data };
  }

  onSharedValueChange(value: string): void {
    this.sharedValue = value;
  }

  // Parent actions
  updateParentMessage(): void {
    this.parentMessage = `Updated at ${new Date().toLocaleTimeString()}`;
  }

  updateParentData(): void {
    this.parentData = {
      name: 'Jane Smith',
      age: 25,
      role: 'Designer',
      updatedAt: new Date().toLocaleTimeString()
    };
  }

  addServiceItem(): void {
    this.serviceData.push(`Service Item ${this.serviceData.length + 1}`);
  }

  clearChildMessages(): void {
    this.childMessages = [];
  }

  // ViewChild methods
  callChildMethod(): void {
    if (this.childComponentRef) {
      this.childComponentRef.childMethod();
    }
  }

  getChildProperty(): void {
    if (this.childComponentRef) {
      const property = this.childComponentRef.childProperty;
      this.onChildMessage(`Child property: ${property}`);
    }
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj || {});
  }

  onParentMessageChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.parentMessage = target.value;
  }

  onSharedValueInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.sharedValue = target.value;
  }
}
