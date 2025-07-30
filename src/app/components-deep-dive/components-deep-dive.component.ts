import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponentComponent } from '../header-component/header-component.component';
import { UserCardComponent } from '../user-card/user-card.component';
import { EncapsulationDemoComponent } from '../encapsulation-demo/encapsulation-demo.component';

@Component({
  selector: 'app-components-deep-dive',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponentComponent, UserCardComponent, EncapsulationDemoComponent],
  templateUrl: './components-deep-dive.component.html',
  styleUrl: './components-deep-dive.component.scss'
})
export class ComponentsDeepDiveComponent implements AfterViewInit {
  // ViewChild examples
  @ViewChild('localRef') localRef!: ElementRef;
  @ViewChild('templateRef') templateRef!: ElementRef;
  @ViewChild(HeaderComponentComponent) headerComponent!: HeaderComponentComponent;
  @ViewChild(UserCardComponent) userCardComponent!: UserCardComponent;

  // Data for property and event binding
  appTitle = 'Components Deep Dive Demo';
  currentUser = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Developer'
  };
  users = [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Designer' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'Manager' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'Developer' }
  ];

  // Data for custom properties and events
  headerData = {
    title: 'Custom Header',
    subtitle: 'This is a custom header component'
  };
  userCardData = {
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Senior Developer'
  };

  // Data for local references
  inputValue = '';
  localRefValue = '';

  // Data for ViewChild demonstration
  viewChildMessage = '';
  templateContent = '';

  // Methods for event handling
  onHeaderClick(message: string) {
    console.log('Header clicked:', message);
    this.viewChildMessage = `Header clicked: ${message}`;
  }

  onUserCardSelect(user: any) {
    console.log('User selected:', user);
    this.viewChildMessage = `User selected: ${user.name}`;
  }

  onUserCardDelete(userId: number) {
    console.log('User deleted:', userId);
    this.users = this.users.filter(user => user.id !== userId);
  }

  // Methods for local references
  updateLocalRef() {
    if (this.localRef) {
      this.localRef.nativeElement.style.backgroundColor = '#e8f4fd';
      this.localRef.nativeElement.style.border = '2px solid #3498db';
    }
  }

  getTemplateContent() {
    if (this.templateRef) {
      this.templateContent = this.templateRef.nativeElement.textContent;
    }
  }

  // Methods for ViewChild component access
  callHeaderMethod() {
    if (this.headerComponent) {
      this.headerComponent.updateHeader();
    }
  }

  callUserCardMethod() {
    if (this.userCardComponent) {
      this.userCardComponent.updateUser();
    }
  }

  // Lifecycle hook
  ngAfterViewInit() {
    console.log('ViewChild components available:', {
      headerComponent: this.headerComponent,
      userCardComponent: this.userCardComponent,
      localRef: this.localRef,
      templateRef: this.templateRef
    });
  }

  // Methods for data manipulation
  updateAppTitle() {
    this.appTitle = `Updated at ${new Date().toLocaleTimeString()}`;
  }

  addNewUser() {
    const newUser = {
      id: this.users.length + 1,
      name: `User ${this.users.length + 1}`,
      email: `user${this.users.length + 1}@example.com`,
      role: 'New User'
    };
    this.users.push(newUser);
  }

  updateCurrentUser() {
    this.currentUser = {
      name: 'Updated User',
      email: 'updated@example.com',
      role: 'Updated Role'
    };
  }
}
