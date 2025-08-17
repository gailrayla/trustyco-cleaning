import { ServiceType } from './service-type.interface';

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  serviceType: ServiceType;
  message?: string;
  preferredContactTime?: string;
}
