import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-simple-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './simple-child.component.html',
  styleUrls: ['./simple-child.component.scss']
})
export class SimpleChildComponent {
  // Input from parent
  @Input() messageFromParent: string = '';
  @Input() countFromParent: number = 0;

  // Output to parent
  @Output() messageToParent = new EventEmitter<string>();
  @Output() countToParent = new EventEmitter<number>();

  // Child's own data
  childName: string = 'Child Component';
  childCount: number = 0;

  // Methods to send data to parent
  sendMessageToParent(): void {
    this.messageToParent.emit(`Hello from ${this.childName}!`);
  }

  sendCountToParent(): void {
    this.childCount++;
    this.countToParent.emit(this.childCount);
  }

  // Method to update child's own data
  updateChildName(): void {
    this.childName = `Child ${Date.now()}`;
  }
}
