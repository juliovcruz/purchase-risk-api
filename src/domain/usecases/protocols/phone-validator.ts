export interface PhoneValidator {
  isValid: (phone: string) => Promise<boolean>
}
