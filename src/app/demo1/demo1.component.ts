import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-demo1',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './demo1.component.html',
  styleUrl: './demo1.component.scss'
})
export class Demo1Component {
  // String Interpolation Examples
  title = 'Angular Binding Demo';
  currentTime = new Date();
  userName = 'John Doe';
  userAge = 25;
  isActive = true;

  // Property Binding Examples
  buttonText = 'Click Me!';
  buttonDisabled = false;
  imageSrc = 'https://via.placeholder.com/150/3498db/ffffff?text=Angular';
  imageAlt = 'Angular Logo';
  inputPlaceholder = 'Enter your name...';
  maxLength = 50;

  // Event Binding Examples
  clickCount = 0;
  mousePosition = { x: 0, y: 0 };
  keyPressed = '';
  formSubmitted = false;

  // Two-Way Binding Examples
  firstName = '';
  lastName = '';
  email = '';
  selectedColor = 'blue';
  isSubscribed = false;
  selectedFruit = 'apple';

  // Computed Properties for String Interpolation
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`.trim() || 'Not provided';
  }

  get userInfo(): string {
    return `${this.userName} is ${this.userAge} years old`;
  }

  get statusText(): string {
    return this.isActive ? 'Active' : 'Inactive';
  }

  get clickMessage(): string {
    return `Button clicked ${this.clickCount} time${this.clickCount !== 1 ? 's' : ''}`;
  }

  // Event Handler Methods
  onButtonClick(): void {
    this.clickCount++;
    this.buttonText = `Clicked ${this.clickCount} times!`;
    console.log('Button clicked!');
  }

  onMouseMove(event: MouseEvent): void {
    this.mousePosition = { x: event.clientX, y: event.clientY };
  }

  onKeyPress(event: KeyboardEvent): void {
    this.keyPressed = event.key;
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    console.log('Input value changed:', target.value);
  }

  onSubmit(): void {
    this.formSubmitted = true;
    console.log('Form submitted with data:', {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      selectedColor: this.selectedColor,
      isSubscribed: this.isSubscribed,
      selectedFruit: this.selectedFruit
    });
  }

  resetForm(): void {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.selectedColor = 'blue';
    this.isSubscribed = false;
    this.selectedFruit = 'apple';
    this.formSubmitted = false;
    this.clickCount = 0;
    this.buttonText = 'Click Me!';
  }

  toggleActive(): void {
    this.isActive = !this.isActive;
  }

  updateTime(): void {
    this.currentTime = new Date();
  }

  constructor() {
    // Update time every second
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }
}
