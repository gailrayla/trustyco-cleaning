import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ContactForm } from '../models/contact-form.interface';
import { ValidationResult } from '../models/form-validation.interface';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  validateContactForm(form: Partial<ContactForm>): ValidationResult {
    const errors: { [key: string]: string } = {};

    // Name validation
    if (!form.name || form.name.trim().length < 2) {
      errors['name'] = 'Name must be at least 2 characters long';
    }

    // Email validation
    if (!form.email || !this.isValidEmail(form.email)) {
      errors['email'] = 'Please enter a valid email address';
    }

    // Phone validation
    if (!form.phone || !this.isValidAustralianPhone(form.phone)) {
      errors['phone'] = 'Please enter a valid Australian phone number';
    }

    // Address validation
    if (!form.address || form.address.trim().length < 10) {
      errors['address'] = 'Please enter a complete address';
    }

    // Service type validation
    if (!form.serviceType) {
      errors['serviceType'] = 'Please select a service type';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  // Custom Angular Validators
  static emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return { required: true };
      }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(control.value) ? null : { invalidEmail: true };
    };
  }

  static australianPhoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return { required: true };
      }

      // Australian phone number formats: +61, 04, (02), etc.
      const phoneRegex = /^(\+61|0)[2-9]\d{8}$|^04\d{8}$/;
      const cleanPhone = control.value.replace(/[\s\-\(\)]/g, '');

      return phoneRegex.test(cleanPhone) ? null : { invalidPhone: true };
    };
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  private isValidAustralianPhone(phone: string): boolean {
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    const phoneRegex = /^(\+61|0)[2-9]\d{8}$|^04\d{8}$/;
    return phoneRegex.test(cleanPhone);
  }
}
