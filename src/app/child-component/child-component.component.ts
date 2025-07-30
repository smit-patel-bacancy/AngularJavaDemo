import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-child-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './child-component.component.html',
  styleUrl: './child-component.component.scss'
})
export class ChildComponentComponent {
  // @Input properties for receiving data from parent
  @Input() parentMessage = '';
  @Input() parentData: any = {};
  @Input() parentItems: string[] = [];

  // @Output properties for sending data to parent
  @Output() childMessageEvent = new EventEmitter<string>();
  @Output() childDataEvent = new EventEmitter<any>();

  // Child properties and methods for ViewChild communication
  childProperty = 'This is a child property accessible via ViewChild';
  childCounter = 0;

  // Child data for internal use
  childMessage = '';
  childFormData = {
    name: '',
    email: '',
    message: ''
  };

  // Methods for @Output communication
  sendMessageToParent() {
    const message = `Child message at ${new Date().toLocaleTimeString()}`;
    this.childMessageEvent.emit(message);
  }

  sendDataToParent() {
    const data = {
      timestamp: new Date().toISOString(),
      counter: this.childCounter++,
      message: this.childMessage || 'No message entered'
    };
    this.childDataEvent.emit(data);
  }

  // Method for ViewChild communication
  childMethod() {
    console.log('Child method called from parent via ViewChild');
    this.childCounter++;
    return `Child method executed ${this.childCounter} times`;
  }

  // Methods for form handling
  onSubmit() {
    this.sendDataToParent();
    this.childFormData = { name: '', email: '', message: '' };
  }

  updateChildMessage() {
    this.childMessage = `Child updated at ${new Date().toLocaleTimeString()}`;
  }
}
