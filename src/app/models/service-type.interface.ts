export interface ServiceType {
  id: string;
  name: string;
  description: string;
  basePrice?: number;
}

export const SERVICE_TYPES: ServiceType[] = [
  {
    id: 'residential',
    name: 'Residential Cleaning',
    description: 'Professional home cleaning services',
  },
  {
    id: 'commercial',
    name: 'Commercial Cleaning',
    description: 'Office and commercial space cleaning',
  },
  {
    id: 'maintenance-weekly',
    name: 'Maintenance Cleaning (Weekly)',
    description: 'Regular weekly cleaning service',
  },
  {
    id: 'maintenance-fortnightly',
    name: 'Maintenance Cleaning (Fortnightly)',
    description: 'Regular fortnightly cleaning service',
  },
  {
    id: 'deep-clean',
    name: 'Deep Clean',
    description: 'Comprehensive deep cleaning service',
  },
  {
    id: 'end-of-lease',
    name: 'End of Lease Clean',
    description: 'Complete cleaning for lease handover',
  },
  {
    id: 'spring-clean',
    name: 'Spring Clean',
    description: 'Seasonal thorough cleaning service',
  },
];
