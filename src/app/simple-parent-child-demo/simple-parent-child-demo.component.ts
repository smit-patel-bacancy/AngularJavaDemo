import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleChildComponent } from '../simple-child/simple-child.component';

@Component({
  selector: 'app-simple-parent-child-demo',
  standalone: true,
  imports: [CommonModule, SimpleChildComponent],
  templateUrl: './simple-parent-child-demo.component.html',
  styleUrls: ['./simple-parent-child-demo.component.scss']
})
export class SimpleParentChildDemoComponent {
  // Parent's data to send to child
  parentMessage: string = 'Hello from Parent!';
  parentCount: number = 0;

  // Parent's data to receive from child
  messagesFromChild: string[] = [];
  countsFromChild: number[] = [];

  // Methods to update parent data
  updateParentMessage(): void {
    this.parentMessage = `Updated at ${new Date().toLocaleTimeString()}`;
  }

  incrementParentCount(): void {
    this.parentCount++;
  }

  // Methods to handle data from child
  onMessageFromChild(message: string): void {
    this.messagesFromChild.unshift(message);
    // Keep only last 5 messages
    if (this.messagesFromChild.length > 5) {
      this.messagesFromChild = this.messagesFromChild.slice(0, 5);
    }
  }

  onCountFromChild(count: number): void {
    this.countsFromChild.unshift(count);
    // Keep only last 5 counts
    if (this.countsFromChild.length > 5) {
      this.countsFromChild = this.countsFromChild.slice(0, 5);
    }
  }

  // Method to clear messages
  clearMessages(): void {
    this.messagesFromChild = [];
  }

  clearCounts(): void {
    this.countsFromChild = [];
  }
}
