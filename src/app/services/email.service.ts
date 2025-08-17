import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ContactForm } from '../models/contact-form.interface';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  // For production, you'd use services like Resend, EmailJS, or Netlify Forms
  private readonly API_URL = 'https://api.resend.com/emails'; // Example with Resend
  private readonly API_KEY = 'your-api-key-here'; // Move to environment

  constructor(private http: HttpClient) {}

  sendQuoteRequest(formData: ContactForm): Observable<boolean> {
    const emailContent = this.generateEmailTemplate(formData);

    // Using Resend API format (adjust based on your chosen service)
    const emailPayload = {
      from: 'quotes@trustyco.com.au',
      to: ['info@trustyco.com.au'], // TrustyCo's email
      subject: `New Quote Request from ${formData.name}`,
      html: emailContent,
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.API_KEY}`,
      'Content-Type': 'application/json',
    });

    // For development/demo, we'll simulate success
    // Uncomment below for actual API integration
    /*
    return this.http.post(this.API_URL, emailPayload, { headers })
      .pipe(
        map(() => true),
        catchError((error) => {
          console.error('Email sending failed:', error);
          return of(false);
        })
      );
    */

    // Development simulation
    return new Observable((observer) => {
      console.log('Quote request submitted:', formData);
      console.log('Email content:', emailContent);

      setTimeout(() => {
        observer.next(true);
        observer.complete();
      }, 1000);
    });
  }

  private generateEmailTemplate(data: ContactForm): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="background-color: #2c3e50; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">TrustyCo Cleaning Services</h1>
          <p style="margin: 5px 0 0 0; font-size: 16px;">New Quote Request</p>
        </div>
        
        <div style="padding: 30px; background-color: #f9f9f9;">
          <h2 style="color: #2c3e50; margin-bottom: 20px;">Customer Details</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 12px 0; font-weight: bold; width: 30%; color: #555;">Name:</td>
              <td style="padding: 12px 0; color: #333;">${data.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 12px 0; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 12px 0; color: #333;">
                <a href="mailto:${
                  data.email
                }" style="color: #3498db; text-decoration: none;">${
      data.email
    }</a>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 12px 0; font-weight: bold; color: #555;">Phone:</td>
              <td style="padding: 12px 0; color: #333;">
                <a href="tel:${
                  data.phone
                }" style="color: #3498db; text-decoration: none;">${
      data.phone
    }</a>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 12px 0; font-weight: bold; color: #555;">Address:</td>
              <td style="padding: 12px 0; color: #333;">${data.address}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 12px 0; font-weight: bold; color: #555;">Service Type:</td>
              <td style="padding: 12px 0;">
                <span style="background-color: #3498db; color: white; padding: 4px 12px; border-radius: 20px; font-size: 14px;">
                  ${data.serviceType.name}
                </span>
              </td>
            </tr>
            ${
              data.preferredContactTime
                ? `
            <tr style="border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 12px 0; font-weight: bold; color: #555;">Best Time to Contact:</td>
              <td style="padding: 12px 0; color: #333;">${data.preferredContactTime}</td>
            </tr>
            `
                : ''
            }
            ${
              data.message
                ? `
            <tr>
              <td style="padding: 12px 0; font-weight: bold; color: #555; vertical-align: top;">Message:</td>
              <td style="padding: 12px 0; color: #333;">${data.message}</td>
            </tr>
            `
                : ''
            }
          </table>
        </div>
        
        <div style="background-color: #34495e; color: white; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
          <p style="margin: 0; font-size: 14px;">
            This quote request was submitted on ${new Date().toLocaleDateString(
              'en-AU',
              {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              }
            )}
          </p>
        </div>
      </div>
    `;
  }
}
