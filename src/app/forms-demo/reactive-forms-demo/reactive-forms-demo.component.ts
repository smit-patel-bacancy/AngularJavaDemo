import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, FormArray, Validators, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-reactive-forms-demo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-forms-demo.component.html',
  styleUrls: ['./reactive-forms-demo.component.scss']
})
export class ReactiveFormsDemoComponent implements OnInit, OnDestroy {
  // 1. Setup a reactive Form
  userForm: FormGroup;

  // 2. Creating form programmatically
  programmaticForm: FormGroup;

  // 5. Getting Access to controls and Grouping Controls
  groupedForm: FormGroup;

  // 6. Array of Form Controls
  skillsForm: FormGroup;

  // 7. Creating Custom Validators
  customValidatorForm: FormGroup;

  // 9. Creating Custom Async Validator
  asyncValidatorForm: FormGroup;

  // 11. Set and Patch value
  setPatchForm: FormGroup;

  // 12. Template Driven VS reactive Approach
  comparisonForm: FormGroup;

  // Status and value changes tracking
  formStatus: string = '';
  formValue: any = {};

  // Form submission
  submittedData: any = null;
  isFormSubmitted = false;

  // Skills array for form array demo
  skills: string[] = ['Angular', 'React', 'Vue', 'TypeScript', 'JavaScript'];

  // Custom validator error messages
  customValidatorErrors: { [key: string]: string } = {};

  // Async validator status
  asyncValidationStatus: string = '';

  // Destroy subject for cleanup
  private destroy$ = new Observable<void>();

  constructor(private fb: FormBuilder) {
    // 1. Setup a reactive Form
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      age: [null, [Validators.required, Validators.min(18), Validators.max(100)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });

    // 2. Creating form programmatically
    this.programmaticForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.pattern(/^\d{10}$/)])
    });

    // 5. Getting Access to controls and Grouping Controls
    this.groupedForm = this.fb.group({
      personalInfo: this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]]
      }),
      addressInfo: this.fb.group({
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
        zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]]
      }),
      preferences: this.fb.group({
        newsletter: [false],
        notifications: [true],
        theme: ['light']
      })
    });

    // 6. Array of Form Controls
    this.skillsForm = this.fb.group({
      name: ['', [Validators.required]],
      skills: this.fb.array([])
    });

    // 7. Creating Custom Validators
    this.customValidatorForm = this.fb.group({
      username: ['', [Validators.required, this.customUsernameValidator]],
      password: ['', [Validators.required, this.customPasswordValidator]],
      website: ['', [Validators.required, this.customUrlValidator]]
    });

    // 9. Creating Custom Async Validator
    this.asyncValidatorForm = this.fb.group({
      email: ['', [Validators.required, Validators.email], [this.asyncEmailValidator()]],
      username: ['', [Validators.required], [this.asyncUsernameValidator()]]
    });

    // 11. Set and Patch value
    this.setPatchForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      age: [null],
      bio: ['']
    });

    // 12. Template Driven VS reactive Approach
    this.comparisonForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    // 10. Reacting to Status and Value changes
    this.userForm.statusChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(status => {
      this.formStatus = status;
    });

    this.userForm.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.formValue = value;
    });

    // Initialize skills form array
    this.addSkill();
  }

  ngOnDestroy(): void {
    this.destroy$.subscribe();
  }

  // 3. Linking HTML and Form controls - Getter methods for easy access
  get firstName() { return this.userForm.get('firstName'); }
  get lastName() { return this.userForm.get('lastName'); }
  get email() { return this.userForm.get('email'); }
  get age() { return this.userForm.get('age'); }
  get password() { return this.userForm.get('password'); }
  get confirmPassword() { return this.userForm.get('confirmPassword'); }

  // 4. Submitting and adding validation
  onSubmit() {
    if (this.userForm.valid) {
      this.submittedData = this.userForm.value;
      this.isFormSubmitted = true;
      console.log('Form submitted:', this.submittedData);
    } else {
      this.markFormGroupTouched(this.userForm);
    }
  }

  // 5. Getting Access to controls and Grouping Controls
  getPersonalInfoControls() {
    return (this.groupedForm.get('personalInfo') as FormGroup).controls;
  }

  getAddressInfoControls() {
    return (this.groupedForm.get('addressInfo') as FormGroup).controls;
  }

  // 6. Array of Form Controls
  get skillsArray() {
    return this.skillsForm.get('skills') as FormArray;
  }

  addSkill() {
    this.skillsArray.push(this.fb.control('', [Validators.required]));
  }

  removeSkill(index: number) {
    this.skillsArray.removeAt(index);
  }

  // 7. Creating Custom Validators
  customUsernameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    if (value.length < 3) {
      return { 'usernameTooShort': { requiredLength: 3, actualLength: value.length } };
    }

    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return { 'usernameInvalidChars': true };
    }

    return null;
  }

  customPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumbers = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const errors: ValidationErrors = {};

    if (!hasUpperCase) errors['noUpperCase'] = true;
    if (!hasLowerCase) errors['noLowerCase'] = true;
    if (!hasNumbers) errors['noNumbers'] = true;
    if (!hasSpecialChar) errors['noSpecialChar'] = true;

    return Object.keys(errors).length > 0 ? errors : null;
  }

  customUrlValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const urlPattern = /^https?:\/\/.+/;
    if (!urlPattern.test(value)) {
      return { 'invalidUrl': true };
    }

    return null;
  }

  // 8. Using Error Codes
  getErrorMessage(control: AbstractControl | null, fieldName: string): string {
    if (!control || !control.errors) return '';

    const errors = control.errors;

    if (errors['required']) return `${fieldName} is required`;
    if (errors['email']) return 'Please enter a valid email address';
    if (errors['minlength']) return `${fieldName} must be at least ${errors['minlength'].requiredLength} characters`;
    if (errors['maxlength']) return `${fieldName} must be no more than ${errors['maxlength'].requiredLength} characters`;
    if (errors['min']) return `${fieldName} must be at least ${errors['min'].min}`;
    if (errors['max']) return `${fieldName} must be no more than ${errors['max'].max}`;
    if (errors['pattern']) return `${fieldName} format is invalid`;
    if (errors['passwordMismatch']) return 'Passwords do not match';

    // Custom validator errors
    if (errors['usernameTooShort']) return `Username must be at least ${errors['usernameTooShort'].requiredLength} characters`;
    if (errors['usernameInvalidChars']) return 'Username can only contain letters, numbers, and underscores';
    if (errors['noUpperCase']) return 'Password must contain at least one uppercase letter';
    if (errors['noLowerCase']) return 'Password must contain at least one lowercase letter';
    if (errors['noNumbers']) return 'Password must contain at least one number';
    if (errors['noSpecialChar']) return 'Password must contain at least one special character';
    if (errors['invalidUrl']) return 'Please enter a valid URL starting with http:// or https://';

    return `${fieldName} is invalid`;
  }

  // 9. Creating Custom Async Validator
  asyncEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) return of(null);

      return timer(1000).pipe(
        map(() => {
          // Simulate email availability check
          const email = control.value;
          if (email.includes('admin') || email.includes('test')) {
            return { 'emailTaken': true };
          }
          return null;
        })
      );
    };
  }

  asyncUsernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) return of(null);

      return timer(800).pipe(
        map(() => {
          // Simulate username availability check
          const username = control.value;
          if (username === 'admin' || username === 'user' || username === 'test') {
            return { 'usernameTaken': true };
          }
          return null;
        })
      );
    };
  }

  // 10. Reacting to Status and Value changes
  onFormStatusChange() {
    console.log('Form status changed:', this.userForm.status);
    console.log('Form value changed:', this.userForm.value);
  }

  // 11. Set and Patch value
  setFormValues() {
    this.setPatchForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      age: 30,
      bio: 'Software Developer'
    });
  }

  patchFormValues() {
    this.setPatchForm.patchValue({
      firstName: 'Jane',
      email: 'jane.doe@example.com'
    });
  }

  resetForm() {
    this.setPatchForm.reset();
  }

  // Password match validator
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  }

  // Helper method to mark all controls as touched
  markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Form submission methods for different forms
  onSubmitProgrammatic() {
    if (this.programmaticForm.valid) {
      console.log('Programmatic form submitted:', this.programmaticForm.value);
    }
  }

  onSubmitGrouped() {
    if (this.groupedForm.valid) {
      console.log('Grouped form submitted:', this.groupedForm.value);
    }
  }

  onSubmitSkills() {
    if (this.skillsForm.valid) {
      console.log('Skills form submitted:', this.skillsForm.value);
    }
  }

  onSubmitCustomValidator() {
    if (this.customValidatorForm.valid) {
      console.log('Custom validator form submitted:', this.customValidatorForm.value);
    }
  }

  onSubmitAsyncValidator() {
    if (this.asyncValidatorForm.valid) {
      console.log('Async validator form submitted:', this.asyncValidatorForm.value);
    }
  }

  onSubmitComparison() {
    if (this.comparisonForm.valid) {
      console.log('Comparison form submitted:', this.comparisonForm.value);
    }
  }
}
