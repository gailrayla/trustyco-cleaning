export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

export interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  from?: string;
}
