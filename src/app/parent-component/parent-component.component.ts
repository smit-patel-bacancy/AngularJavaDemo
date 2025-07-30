import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChildComponentComponent } from '../child-component/child-component.component';

@Component({
  selector: 'app-parent-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ChildComponentComponent],
  templateUrl: './parent-component.component.html',
  styleUrl: './parent-component.component.scss'
})
export class ParentComponentComponent implements AfterViewInit {
  @ViewChild(ChildComponentComponent) childComponent!: ChildComponentComponent;

  // Data for @Input communication
  parentMessage = 'Hello from Parent!';
  parentData = {
    name: 'John Doe',
    age: 30,
    city: 'New York'
  };
  parentItems = ['Apple', 'Banana', 'Orange', 'Mango'];

  // Data for @Output communication
  childMessages: string[] = [];
  childData: any[] = [];

  // Data for ViewChild communication
  viewChildMessage = '';

  // Data for service communication
  serviceData = 'Service data from parent';

  // Methods for @Input communication
  updateParentMessage() {
    this.parentMessage = `Updated at ${new Date().toLocaleTimeString()}`;
  }

  updateParentData() {
    this.parentData = {
      name: 'Jane Smith',
      age: 25,
      city: 'Los Angeles'
    };
  }

  addParentItem() {
    const newItem = `Item ${this.parentItems.length + 1}`;
    this.parentItems.push(newItem);
  }

  // Methods for @Output communication
  onChildMessage(message: string) {
    this.childMessages.push(message);
  }

  onChildData(data: any) {
    this.childData.push(data);
  }

  clearChildMessages() {
    this.childMessages = [];
  }

  clearChildData() {
    this.childData = [];
  }

  // Methods for ViewChild communication
  callChildMethod() {
    if (this.childComponent) {
      this.childComponent.childMethod();
    }
  }

  getChildProperty() {
    if (this.childComponent) {
      this.viewChildMessage = this.childComponent.childProperty;
    }
  }

  // Lifecycle hook for ViewChild
  ngAfterViewInit() {
    console.log('Child component is available:', this.childComponent);
  }

  // Methods for service communication
  updateServiceData() {
    this.serviceData = `Updated service data at ${new Date().toLocaleTimeString()}`;
  }
}
