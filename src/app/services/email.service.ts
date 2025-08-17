import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
import emailjs from '@emailjs/browser';
import { ContactForm } from '../models/contact-form.interface';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private isEmailJSConfigured = false;

  constructor() {
    this.initializeEmailJS();
  }

  private initializeEmailJS(): void {
    try {
      emailjs.init(environment.emailjs.publicKey);
      this.isEmailJSConfigured = true;
    } catch (error) {
      console.error('❌ EmailJS initialization failed:', error);
      this.isEmailJSConfigured = false;
    }
  }

  sendQuoteRequest(formData: ContactForm): Observable<boolean> {
    if (!this.isEmailJSConfigured) {
      return this.fallbackMode(formData);
    }

    return this.sendRealEmail(formData);
  }

  private sendRealEmail(formData: ContactForm): Observable<boolean> {
    const templateParams = {
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      property_address: formData.address,
      service_type: formData.serviceType.name,
      service_description: formData.serviceType.description,
      preferred_contact_time: formData.preferredContactTime || 'Any time',
      customer_message: formData.message || 'No additional details provided',
      submission_date: new Date().toLocaleDateString('en-AU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Australia/Sydney',
      }),
    };

    return from(
      emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        templateParams
      )
    ).pipe(
      map((response) => {
        return true;
      }),
      catchError((error) => {
        return of(false);
      })
    );
  }

  private fallbackMode(formData: ContactForm): Observable<boolean> {
    return of(true).pipe(delay(1000));
  }
}
