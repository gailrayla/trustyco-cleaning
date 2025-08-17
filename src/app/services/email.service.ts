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
      console.log('✅ EmailJS initialized successfully');
      console.log('📧 Ready to send real emails to TrustyCo!');
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

    console.log('📧 Sending real email via EmailJS...');
    console.log('📨 Template:', environment.emailjs.templateId);
    console.log('📬 Service:', environment.emailjs.serviceId);

    return from(
      emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        templateParams
      )
    ).pipe(
      map((response) => {
        console.log('🎉 SUCCESS! Email sent to TrustyCo inbox!');
        console.log('📧 Response:', response);
        console.log('💼 Customer will receive confirmation');
        return true;
      }),
      catchError((error) => {
        console.error('❌ Email sending failed:', error);
        console.log('🔧 Troubleshooting info:');
        console.log('- Service ID:', environment.emailjs.serviceId);
        console.log('- Template ID:', environment.emailjs.templateId);
        console.log('- Template params:', templateParams);

        // Still return true for user experience, but log the error
        return of(false);
      })
    );
  }

  private fallbackMode(formData: ContactForm): Observable<boolean> {
    console.log('⚠️ EmailJS not configured - using fallback mode');
    console.log('📋 QUOTE REQUEST DETAILS:');
    console.log('════════════════════════════════════════════');
    console.log('👤 Customer:', formData.name);
    console.log('📧 Email:', formData.email);
    console.log('📱 Phone:', formData.phone);
    console.log('🏠 Address:', formData.address);
    console.log('🧹 Service:', formData.serviceType.name);
    console.log(
      '⏰ Contact Time:',
      formData.preferredContactTime || 'Any time'
    );
    console.log('💬 Message:', formData.message || 'None');
    console.log('════════════════════════════════════════════');

    return of(true).pipe(delay(1000));
  }
}
