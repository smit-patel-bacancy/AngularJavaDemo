import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-communication-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './communication-child.component.html',
  styleUrls: ['./communication-child.component.scss']
})
export class CommunicationChildComponent implements OnInit, OnChanges {

  // Input properties (Parent to Child)
  @Input() parentMessage: string = '';
  @Input() parentData: any = {};
  @Input() sharedValue: string = '';

  // Output events (Child to Parent)
  @Output() childMessage = new EventEmitter<string>();
  @Output() childDataUpdate = new EventEmitter<any>();
  @Output() sharedValueChange = new EventEmitter<string>();

  // Child properties
  childProperty: string = 'Child Component Property';
  childCounter: number = 0;
  childInputValue: string = '';

  // Internal state
  receivedMessages: string[] = [];
  dataHistory: any[] = [];

  ngOnInit(): void {
    this.logMessage('Child component initialized');
    this.childMessage.emit('Child component is ready!');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parentMessage']) {
      this.logMessage(`Received new parent message: ${this.parentMessage}`);
      this.receivedMessages.unshift(`[${new Date().toLocaleTimeString()}] ${this.parentMessage}`);
      if (this.receivedMessages.length > 5) {
        this.receivedMessages = this.receivedMessages.slice(0, 5);
      }
    }

    if (changes['parentData']) {
      this.logMessage('Parent data updated');
      this.dataHistory.unshift({
        timestamp: new Date().toLocaleTimeString(),
        data: { ...this.parentData }
      });
      if (this.dataHistory.length > 3) {
        this.dataHistory = this.dataHistory.slice(0, 3);
      }
    }

    if (changes['sharedValue']) {
      this.logMessage(`Shared value updated: ${this.sharedValue}`);
    }
  }

  // Child methods that can be called from parent
  childMethod(): void {
    this.childCounter++;
    this.logMessage(`Child method called ${this.childCounter} times`);
    this.childMessage.emit(`Child method executed at ${new Date().toLocaleTimeString()}`);
  }

  // Child actions
  sendMessageToParent(): void {
    const message = `Child message ${this.childCounter + 1} at ${new Date().toLocaleTimeString()}`;
    this.childMessage.emit(message);
    this.childCounter++;
  }

  updateParentData(): void {
    const newData = {
      childTimestamp: new Date().toLocaleTimeString(),
      childCounter: this.childCounter,
      childInput: this.childInputValue
    };
    this.childDataUpdate.emit(newData);
    this.logMessage('Sent data update to parent');
  }

  updateSharedValue(): void {
    const newValue = `Updated by child at ${new Date().toLocaleTimeString()}`;
    this.sharedValueChange.emit(newValue);
    this.logMessage('Updated shared value');
  }

  onInputChange(event: any): void {
    this.childInputValue = event.target.value;
  }

  private logMessage(message: string): void {
    console.log(`[Child Component] ${message}`);
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj || {});
  }
}
