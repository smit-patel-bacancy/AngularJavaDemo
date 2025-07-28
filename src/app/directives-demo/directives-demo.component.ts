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
