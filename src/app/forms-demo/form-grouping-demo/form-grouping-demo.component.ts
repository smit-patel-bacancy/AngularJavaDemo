import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-grouping-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-grouping-demo.component.html',
  styleUrl: './form-grouping-demo.component.scss'
})
export class FormGroupingDemoComponent {
  @ViewChild('groupedForm') groupedForm!: NgForm;

  // Form data with nested structure
  user = {
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: ''
    },
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    preferences: {
      newsletter: false,
      notifications: false,
      marketing: false,
      language: 'en'
    },
    employment: {
      company: '',
      position: '',
      department: '',
      startDate: '',
      salary: ''
    }
  };

  // Available options
  states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
    'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  countries = [
    'United States', 'Canada', 'Mexico', 'United Kingdom', 'Germany',
    'France', 'Italy', 'Spain', 'Netherlands', 'Belgium',
    'Switzerland', 'Austria', 'Sweden', 'Norway', 'Denmark',
    'Finland', 'Poland', 'Czech Republic', 'Hungary', 'Slovakia'
  ];

  languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' }
  ];

  departments = [
    'Engineering', 'Marketing', 'Sales', 'Human Resources', 'Finance',
    'Operations', 'Customer Support', 'Product Management', 'Design', 'Legal'
  ];

  // Form submission
  onSubmit() {
    if (this.groupedForm.valid) {
      console.log('Grouped form submitted successfully!');
      console.log('Form data:', this.user);
      console.log('Form structure:', this.groupedForm.value);
      alert('Form submitted successfully!');
    } else {
      console.log('Form is invalid!');
      this.markFormGroupTouched();
    }
  }

  // Mark all form controls as touched
  markFormGroupTouched() {
    Object.keys(this.groupedForm.controls).forEach(key => {
      const control = this.groupedForm.controls[key];
      control.markAsTouched();
    });
  }

  // Set default values for different groups
  setPersonalInfoDefaults() {
    this.user.personalInfo = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '555-123-4567',
      dateOfBirth: '1990-01-01'
    };
  }

  setAddressDefaults() {
    this.user.address = {
      street: '123 Main Street',
      city: 'New York',
      state: 'New York',
      zipCode: '10001',
      country: 'United States'
    };
  }

  setEmploymentDefaults() {
    this.user.employment = {
      company: 'Tech Corp',
      position: 'Software Engineer',
      department: 'Engineering',
      startDate: '2023-01-15',
      salary: '75000'
    };
  }

  // Reset specific groups
  resetPersonalInfo() {
    this.user.personalInfo = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: ''
    };
  }

  resetAddress() {
    this.user.address = {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    };
  }

  resetEmployment() {
    this.user.employment = {
      company: '',
      position: '',
      department: '',
      startDate: '',
      salary: ''
    };
  }

  // Reset all preferences
  resetPreferences() {
    this.user.preferences = {
      newsletter: false,
      notifications: false,
      marketing: false,
      language: 'en'
    };
  }

  // Reset entire form
  resetForm() {
    this.groupedForm.reset();
    this.user = {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: ''
      },
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      },
      preferences: {
        newsletter: false,
        notifications: false,
        marketing: false,
        language: 'en'
      },
      employment: {
        company: '',
        position: '',
        department: '',
        startDate: '',
        salary: ''
      }
    };
  }

  // Get validation error message
  getErrorMessage(fieldName: string): string {
    const control = this.groupedForm.controls[fieldName];

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
    const control = this.groupedForm.controls[fieldName];
    return control ? (control.invalid && control.touched) : false;
  }

  // Check if field is valid
  isValid(fieldName: string): boolean {
    const control = this.groupedForm.controls[fieldName];
    return control ? (control.valid && control.touched) : false;
  }

  // Get group validation status
  getGroupValidationStatus(groupName: string): { valid: boolean; invalid: boolean; touched: boolean } {
    const group = this.groupedForm.controls[groupName];
    if (group) {
      return {
        valid: group.valid,
        invalid: group.invalid,
        touched: group.touched
      };
    }
    return { valid: false, invalid: false, touched: false };
  }

  // Show form structure
  showFormStructure() {
    console.log('=== FORM STRUCTURE ===');
    console.log('Form value:', this.groupedForm.value);
    console.log('Form controls:', this.groupedForm.controls);
    console.log('Form groups:', Object.keys(this.groupedForm.controls));

    // Show nested structure
    Object.keys(this.groupedForm.controls).forEach(groupName => {
      const group = this.groupedForm.controls[groupName];
      console.log(`Group: ${groupName}`, {
        valid: group.valid,
        invalid: group.invalid,
        touched: group.touched,
        value: group.value
      });
    });
  }

  // Validate specific group
  validateGroup(groupName: string): boolean {
    const group = this.groupedForm.controls[groupName];
    if (group) {
      group.markAsTouched();
      return group.valid;
    }
    return false;
  }

  // Get form data as JSON
  getFormDataAsJSON(): string {
    return JSON.stringify(this.user, null, 2);
  }

  // Export form data
  exportFormData() {
    const data = this.getFormDataAsJSON();
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form-data.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
