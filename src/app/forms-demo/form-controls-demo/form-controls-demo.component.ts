import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-controls-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-controls-demo.component.html',
  styleUrl: './form-controls-demo.component.scss'
})
export class FormControlsDemoComponent {
  @ViewChild('controlsForm') controlsForm!: NgForm;

  // Form data
  formData = {
    textInput: '',
    emailInput: '',
    passwordInput: '',
    numberInput: '',
    dateInput: '',
    timeInput: '',
    datetimeInput: '',
    urlInput: '',
    telInput: '',
    searchInput: '',
    textareaInput: '',
    selectInput: '',
    multiSelect: [] as string[],
    radioInput: '',
    checkboxInput: false,
    checkboxGroup: [] as string[],
    rangeInput: 50,
    colorInput: '#667eea',
    fileInput: null as File | null
  };

  // Available options
  selectOptions = [
    { value: '', label: 'Select an option' },
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' }
  ];

  multiSelectOptions = [
    { value: 'sports', label: 'Sports' },
    { value: 'music', label: 'Music' },
    { value: 'reading', label: 'Reading' },
    { value: 'travel', label: 'Travel' },
    { value: 'cooking', label: 'Cooking' },
    { value: 'gaming', label: 'Gaming' }
  ];

  radioOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  checkboxOptions = [
    { value: 'newsletter', label: 'Newsletter' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'updates', label: 'Updates' }
  ];

  // Form submission
  onSubmit() {
    if (this.controlsForm.valid) {
      console.log('Form submitted successfully!');
      console.log('Form data:', this.formData);
      alert('Form submitted successfully!');
    } else {
      console.log('Form is invalid!');
      this.markFormGroupTouched();
    }
  }

  // Mark all form controls as touched
  markFormGroupTouched() {
    Object.keys(this.controlsForm.controls).forEach(key => {
      const control = this.controlsForm.controls[key];
      control.markAsTouched();
    });
  }

  // Handle file input
  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.formData.fileInput = target.files[0];
    }
  }

  // Handle multi-select change
  onMultiSelectChange(option: string, event: Event) {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;

    if (checked) {
      if (!this.formData.multiSelect.includes(option)) {
        this.formData.multiSelect.push(option);
      }
    } else {
      this.formData.multiSelect = this.formData.multiSelect.filter(item => item !== option);
    }
  }

  // Check if multi-select option is selected
  isMultiSelectSelected(option: string): boolean {
    return this.formData.multiSelect.includes(option);
  }

  // Handle checkbox group change
  onCheckboxGroupChange(option: string, event: Event) {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;

    if (checked) {
      if (!this.formData.checkboxGroup.includes(option)) {
        this.formData.checkboxGroup.push(option);
      }
    } else {
      this.formData.checkboxGroup = this.formData.checkboxGroup.filter(item => item !== option);
    }
  }

  // Check if checkbox group option is selected
  isCheckboxGroupSelected(option: string): boolean {
    return this.formData.checkboxGroup.includes(option);
  }

  // Reset form
  resetForm() {
    this.controlsForm.reset();
    this.formData = {
      textInput: '',
      emailInput: '',
      passwordInput: '',
      numberInput: '',
      dateInput: '',
      timeInput: '',
      datetimeInput: '',
      urlInput: '',
      telInput: '',
      searchInput: '',
      textareaInput: '',
      selectInput: '',
      multiSelect: [],
      radioInput: '',
      checkboxInput: false,
      checkboxGroup: [],
      rangeInput: 50,
      colorInput: '#667eea',
      fileInput: null
    };
  }

  // Set default values
  setDefaults() {
    this.formData = {
      textInput: 'Default Text',
      emailInput: 'default@example.com',
      passwordInput: 'password123',
      numberInput: '42',
      dateInput: '2024-01-01',
      timeInput: '12:00',
      datetimeInput: '2024-01-01T12:00',
      urlInput: 'https://example.com',
      telInput: '123-456-7890',
      searchInput: 'search term',
      textareaInput: 'This is a default textarea value with multiple lines.\nIt can contain line breaks and longer text.',
      selectInput: 'option2',
      multiSelect: ['sports', 'music'],
      radioInput: 'male',
      checkboxInput: true,
      checkboxGroup: ['newsletter', 'notifications'],
      rangeInput: 75,
      colorInput: '#ff6b6b',
      fileInput: null
    };
  }

  // Get validation error message
  getErrorMessage(fieldName: string): string {
    const control = this.controlsForm.controls[fieldName];

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
    const control = this.controlsForm.controls[fieldName];
    return control ? (control.invalid && control.touched) : false;
  }

  // Check if field is valid
  isValid(fieldName: string): boolean {
    const control = this.controlsForm.controls[fieldName];
    return control ? (control.valid && control.touched) : false;
  }

  // Show form data
  showFormData() {
    console.log('=== FORM DATA ===');
    console.log('Text Input:', this.formData.textInput);
    console.log('Email Input:', this.formData.emailInput);
    console.log('Password Input:', this.formData.passwordInput);
    console.log('Number Input:', this.formData.numberInput);
    console.log('Date Input:', this.formData.dateInput);
    console.log('Time Input:', this.formData.timeInput);
    console.log('Datetime Input:', this.formData.datetimeInput);
    console.log('URL Input:', this.formData.urlInput);
    console.log('Tel Input:', this.formData.telInput);
    console.log('Search Input:', this.formData.searchInput);
    console.log('Textarea Input:', this.formData.textareaInput);
    console.log('Select Input:', this.formData.selectInput);
    console.log('Multi Select:', this.formData.multiSelect);
    console.log('Radio Input:', this.formData.radioInput);
    console.log('Checkbox Input:', this.formData.checkboxInput);
    console.log('Checkbox Group:', this.formData.checkboxGroup);
    console.log('Range Input:', this.formData.rangeInput);
    console.log('Color Input:', this.formData.colorInput);
    console.log('File Input:', this.formData.fileInput);
  }
}
