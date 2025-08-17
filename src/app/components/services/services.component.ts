import { Component } from '@angular/core';
import {
  ServiceType,
  SERVICE_TYPES,
} from '../../models/service-type.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class ServicesComponent {
  services: ServiceType[] = SERVICE_TYPES;

  getServiceIcon(serviceId: string): string {
    const iconMap: { [key: string]: string } = {
      residential: '🏠',
      commercial: '🏢',
      'maintenance-weekly': '📅',
      'maintenance-fortnightly': '🗓️',
      'deep-clean': '✨',
      'end-of-lease': '🔑',
      'spring-clean': '🌸',
    };
    return iconMap[serviceId] || '🧽';
  }

  getServiceFeatures(serviceId: string): string[] {
    const featuresMap: { [key: string]: string[] } = {
      residential: [
        'Living areas & bedrooms',
        'Kitchen & bathrooms',
        'Dusting & vacuuming',
      ],
      commercial: ['Office spaces', 'Reception areas', 'Meeting rooms'],
      'maintenance-weekly': [
        'Regular schedule',
        'Consistent quality',
        'Flexible timing',
      ],
      'maintenance-fortnightly': [
        'Bi-weekly service',
        'Cost effective',
        'Thorough cleaning',
      ],
      'deep-clean': [
        'Detailed cleaning',
        'Hard-to-reach areas',
        'Sanitization',
      ],
      'end-of-lease': [
        'Bond back guarantee',
        'Full property clean',
        'Inspection ready',
      ],
      'spring-clean': [
        'Seasonal refresh',
        'Decluttering help',
        'Complete overhaul',
      ],
    };
    return (
      featuresMap[serviceId] || [
        'Professional service',
        'Quality guaranteed',
        'Reliable team',
      ]
    );
  }
}
