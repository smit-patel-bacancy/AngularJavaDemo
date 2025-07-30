import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from '../highlight.directive';

@Component({
  selector: 'app-directives-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, HighlightDirective],
  templateUrl: './directives-demo.component.html',
  styleUrl: './directives-demo.component.scss'
})
export class DirectivesDemoComponent {
  // Properties for structural directives demo
  showContent = true;
  items = ['Apple', 'Banana', 'Orange', 'Mango', 'Pineapple'];
  selectedItem = '';

  // Enhanced properties for newer syntax demos
  user = {
    name: 'John Doe',
    age: 30,
    isActive: true
  };

  // Properties for enhanced ngFor with objects
  users = [
    { id: 1, name: 'Alice', age: 25, role: 'Developer' },
    { id: 2, name: 'Bob', age: 30, role: 'Designer' },
    { id: 3, name: 'Charlie', age: 35, role: 'Manager' },
    { id: 4, name: 'Diana', age: 28, role: 'Developer' },
    { id: 5, name: 'Eve', age: 32, role: 'Designer' }
  ];

  // Properties for enhanced ngSwitch demo
  currentView = 'list';
  switchOptions = ['list', 'grid', 'table', 'cards'];

  // Properties for attribute directives demo
  isHighlighted = false;
  highlightColor = 'yellow';

  // Properties for ngClass demo
  isActive = false;
  isDisabled = false;

  // Properties for ngStyle demo
  fontSize = 16;
  textColor = 'black';

  // Properties for forms demo
  username = '';
  email = '';

  // Methods
  toggleContent() {
    this.showContent = !this.showContent;
  }

  addItem() {
    const newItem = `Item ${this.items.length + 1}`;
    this.items.push(newItem);
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  trackByFn(index: number, item: string): string {
    return item;
  }

  // Enhanced trackBy for objects
  trackByUserId(index: number, user: any): number {
    return user?.id || index;
  }

  // Enhanced trackBy for items with index
  trackByIndex(index: number, item: any): number {
    return index;
  }

  // Methods for enhanced ngFor demo
  addUser() {
    const newId = this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
    const newUser = {
      id: newId,
      name: `User ${newId}`,
      age: 20 + Math.floor(Math.random() * 20),
      role: ['Developer', 'Designer', 'Manager'][Math.floor(Math.random() * 3)]
    };
    this.users.push(newUser);
  }

  removeUser(userId: number) {
    this.users = this.users.filter(user => user.id !== userId);
  }

  updateUserRole(userId: number) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      const roles = ['Developer', 'Designer', 'Manager', 'Tester'];
      const currentIndex = roles.indexOf(user.role);
      user.role = roles[(currentIndex + 1) % roles.length];
    }
  }

  // Methods for enhanced ngSwitch demo
  changeView(view: string) {
    this.currentView = view;
  }

  toggleHighlight() {
    this.isHighlighted = !this.isHighlighted;
  }

  changeHighlightColor(color: string) {
    this.highlightColor = color;
  }

  toggleActive() {
    this.isActive = !this.isActive;
  }

  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }

  increaseFontSize() {
    this.fontSize += 2;
  }

  decreaseFontSize() {
    this.fontSize = Math.max(12, this.fontSize - 2);
  }

  changeTextColor(color: string) {
    this.textColor = color;
  }

  onSubmit() {
    console.log('Form submitted:', { username: this.username, email: this.email });
    alert(`Form submitted!\nUsername: ${this.username}\nEmail: ${this.email}`);
  }
}
