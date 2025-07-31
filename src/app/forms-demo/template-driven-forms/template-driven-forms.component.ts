import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-driven-forms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './template-driven-forms.component.html',
  styleUrl: './template-driven-forms.component.scss'
})
export class TemplateDrivenFormsComponent {
  @ViewChild('userForm') userForm!: NgForm;
  @ViewChild('groupedForm') groupedForm!: NgForm;

  // Form data
  user = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    interests: [] as string[],
    address: {
      street: '',
      city: '',
      zipCode: ''
    },
    newsletter: false,
    terms: false
  };

  // Default values for demonstration
  defaultUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    gender: 'male',
    interests: ['sports', 'music'],
    address: {
      street: '123 Main St',
      city: 'New York',
      zipCode: '10001'
    },
    newsletter: true,
    terms: true
  };

  // Available options
  genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  interestOptions = [
    { value: 'sports', label: 'Sports' },
    { value: 'music', label: 'Music' },
    { value: 'reading', label: 'Reading' },
    { value: 'travel', label: 'Travel' },
    { value: 'cooking', label: 'Cooking' }
  ];

  // Form submission
  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form submitted successfully!');
      console.log('Form data:', this.user);
      console.log('Form object:', this.userForm);

      // Show form state
      this.showFormState();
    } else {
      console.log('Form is invalid!');
      this.markFormGroupTouched();
    }
  }

  // Show form state for understanding
  showFormState() {
    console.log('=== FORM STATE ===');
    console.log('Valid:', this.userForm.valid);
    console.log('Invalid:', this.userForm.invalid);
    console.log('Pristine:', this.userForm.pristine);
    console.log('Dirty:', this.userForm.dirty);
    console.log('Touched:', this.userForm.touched);
    console.log('Untouched:', this.userForm.untouched);
    console.log('Submitted:', this.userForm.submitted);
    console.log('Value:', this.userForm.value);
    console.log('Controls:', this.userForm.controls);
  }

  // Mark all form controls as touched to show validation errors
  markFormGroupTouched() {
    Object.keys(this.userForm.controls).forEach(key => {
      const control = this.userForm.controls[key];
      control.markAsTouched();
    });
  }

  // Set default values
  setDefaultValues() {
    this.user = { ...this.defaultUser };
  }

  // Patch specific values
  patchValues() {
    this.userForm.form.patchValue({
      firstName: 'Jane',
      email: 'jane.doe@example.com',
      address: {
        city: 'Los Angeles'
      }
    });
  }

  // Reset form
  resetForm() {
    this.userForm.reset();
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: '',
      interests: [],
      address: {
        street: '',
        city: '',
        zipCode: ''
      },
      newsletter: false,
      terms: false
    };
  }

  // Handle interest selection
  onInterestChange(interest: string, event: Event) {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;

    if (checked) {
      if (!this.user.interests.includes(interest)) {
        this.user.interests.push(interest);
      }
    } else {
      this.user.interests = this.user.interests.filter(i => i !== interest);
    }
  }

  // Check if interest is selected
  isInterestSelected(interest: string): boolean {
    return this.user.interests.includes(interest);
  }

  // Get form data for demonstration
  getFormData() {
    const formData = new FormData();
    formData.append('firstName', this.user.firstName);
    formData.append('lastName', this.user.lastName);
    formData.append('email', this.user.email);
    formData.append('phone', this.user.phone);
    formData.append('gender', this.user.gender);
    formData.append('interests', JSON.stringify(this.user.interests));
    formData.append('address', JSON.stringify(this.user.address));
    formData.append('newsletter', this.user.newsletter.toString());
    formData.append('terms', this.user.terms.toString());

    // Simulate sending form data
    console.log('FormData entries:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    return formData;
  }

  // Validate email format
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Get validation error message
  getErrorMessage(fieldName: string): string {
    const control = this.userForm.controls[fieldName];

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
      if (control.errors['pattern']) {
        return `${fieldName} format is invalid`;
      }
    }

    return '';
  }

  // Check if field has error
  hasError(fieldName: string): boolean {
    const control = this.userForm.controls[fieldName];
    return control ? (control.invalid && control.touched) : false;
  }

  // Check if field is valid
  isValid(fieldName: string): boolean {
    const control = this.userForm.controls[fieldName];
    return control ? (control.valid && control.touched) : false;
  }
}
