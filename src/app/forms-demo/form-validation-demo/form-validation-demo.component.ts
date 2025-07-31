import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-validation-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-validation-demo.component.html',
  styleUrl: './form-validation-demo.component.scss'
})
export class FormValidationDemoComponent {
  @ViewChild('validationForm') validationForm!: NgForm;

  // Form data
  user = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    website: '',
    phone: '',
    zipCode: ''
  };

  // Custom validation states
  passwordStrength = {
    hasLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false
  };

  // Validation patterns
  patterns = {
    phone: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
    zipCode: /^[0-9]{5}$/,
    website: /^https?:\/\/.+/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  };

  // Form submission
  onSubmit() {
    if (this.validationForm.valid) {
      console.log('Form submitted successfully!');
      console.log('Form data:', this.user);
      alert('Form submitted successfully!');
    } else {
      console.log('Form is invalid!');
      this.markFormGroupTouched();
    }
  }

  // Mark all form controls as touched
  markFormGroupTouched() {
    Object.keys(this.validationForm.controls).forEach(key => {
      const control = this.validationForm.controls[key];
      control.markAsTouched();
    });
  }

  // Check password strength
  checkPasswordStrength(password: string) {
    this.passwordStrength = {
      hasLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[@$!%*?&]/.test(password)
    };
  }

  // Get password strength percentage
  getPasswordStrength(): number {
    const checks = Object.values(this.passwordStrength);
    const passedChecks = checks.filter(check => check).length;
    return (passedChecks / checks.length) * 100;
  }

  // Get password strength color
  getPasswordStrengthColor(): string {
    const strength = this.getPasswordStrength();
    if (strength <= 20) return '#dc3545';
    if (strength <= 40) return '#fd7e14';
    if (strength <= 60) return '#ffc107';
    if (strength <= 80) return '#20c997';
    return '#198754';
  }

  // Check if passwords match
  passwordsMatch(): boolean {
    return this.user.password === this.user.confirmPassword;
  }

  // Custom email validation
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Custom age validation
  validateAge(age: string): boolean {
    const ageNum = parseInt(age);
    return ageNum >= 18 && ageNum <= 120;
  }

  // Get validation error message
  getErrorMessage(fieldName: string): string {
    const control = this.validationForm.controls[fieldName];

    if (control && control.errors) {
      if (control.errors['required']) {
        return `${fieldName} is required`;
      }
      if (control.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (control.errors['minlength']) {
        return `${fieldName} must be at least ${control.errors['minlength'].requiredLength} characters`;
      }
      if (control.errors['maxlength']) {
        return `${fieldName} must be no more than ${control.errors['maxlength'].requiredLength} characters`;
      }
      if (control.errors['pattern']) {
        return `${fieldName} format is invalid`;
      }
      if (control.errors['min']) {
        return `${fieldName} must be at least ${control.errors['min'].min}`;
      }
      if (control.errors['max']) {
        return `${fieldName} must be no more than ${control.errors['max'].max}`;
      }
    }

    return '';
  }

  // Check if field has error
  hasError(fieldName: string): boolean {
    const control = this.validationForm.controls[fieldName];
    return control ? (control.invalid && control.touched) : false;
  }

  // Check if field is valid
  isValid(fieldName: string): boolean {
    const control = this.validationForm.controls[fieldName];
    return control ? (control.valid && control.touched) : false;
  }

  // Custom validation for specific fields
  getCustomErrorMessage(fieldName: string): string {
    switch (fieldName) {
      case 'email':
        if (this.user.email && !this.validateEmail(this.user.email)) {
          return 'Please enter a valid email address';
        }
        break;
      case 'age':
        if (this.user.age && !this.validateAge(this.user.age)) {
          return 'Age must be between 18 and 120';
        }
        break;
      case 'confirmPassword':
        if (this.user.confirmPassword && !this.passwordsMatch()) {
          return 'Passwords do not match';
        }
        break;
      case 'website':
        if (this.user.website && !this.patterns.website.test(this.user.website)) {
          return 'Please enter a valid website URL (starting with http:// or https://)';
        }
        break;
    }
    return '';
  }

  // Check if field has custom error
  hasCustomError(fieldName: string): boolean {
    return this.getCustomErrorMessage(fieldName) !== '';
  }

  // Reset form
  resetForm() {
    this.validationForm.reset();
    this.user = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: '',
      website: '',
      phone: '',
      zipCode: ''
    };
    this.passwordStrength = {
      hasLength: false,
      hasUppercase: false,
      hasLowercase: false,
      hasNumber: false,
      hasSpecial: false
    };
  }

  // Show validation summary
  showValidationSummary() {
    const errors: string[] = [];

    Object.keys(this.validationForm.controls).forEach(key => {
      const control = this.validationForm.controls[key];
      if (control.invalid) {
        errors.push(`${key}: ${this.getErrorMessage(key)}`);
      }
    });

    // Add custom validation errors
    Object.keys(this.user).forEach(key => {
      const customError = this.getCustomErrorMessage(key);
      if (customError) {
        errors.push(`${key}: ${customError}`);
      }
    });

    if (errors.length > 0) {
      alert('Validation Errors:\n' + errors.join('\n'));
    } else {
      alert('All validations passed!');
    }
  }
}
