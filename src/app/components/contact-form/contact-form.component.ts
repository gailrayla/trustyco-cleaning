import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactForm } from '../../models/contact-form.interface';
import { SERVICE_TYPES } from '../../models/service-type.interface';
import { EmailService } from '../../services/email.service';
import { FormValidationService } from '../../services/form-validation.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;
  serviceTypes = SERVICE_TYPES;
  isSubmitting = false;
  showSuccessMessage = false;
  showErrorMessage = false;

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
    private validationService: FormValidationService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: [
        '',
        [Validators.required, FormValidationService.emailValidator()],
      ],
      phone: [
        '',
        [Validators.required, FormValidationService.australianPhoneValidator()],
      ],
      address: ['', [Validators.required, Validators.minLength(10)]],
      serviceType: ['', Validators.required],
      preferredContactTime: [''],
      message: [''],
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.showSuccessMessage = false;
      this.showErrorMessage = false;

      const formData = this.prepareFormData();

      this.emailService.sendQuoteRequest(formData).subscribe({
        next: (success) => {
          this.isSubmitting = false;
          if (success) {
            this.showSuccessMessage = true;
            this.contactForm.reset();
          } else {
            this.showErrorMessage = true;
          }
        },
        error: (error) => {
          this.isSubmitting = false;
          this.showErrorMessage = true;
          console.error('Form submission error:', error);
        },
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach((key) => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  private prepareFormData(): ContactForm {
    const formValue = this.contactForm.value;
    const selectedService = this.serviceTypes.find(
      (s) => s.id === formValue.serviceType
    );

    return {
      name: formValue.name,
      email: formValue.email,
      phone: formValue.phone,
      address: formValue.address,
      serviceType: selectedService!,
      preferredContactTime: formValue.preferredContactTime,
      message: formValue.message,
    };
  }
}
