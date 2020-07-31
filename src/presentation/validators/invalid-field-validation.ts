import { InvalidParamError } from '../helpers/errors'
import { Validation } from '../protocols/validation'

export class InvalidFieldValidation implements Validation {
  private readonly field: string

  constructor (field: string) {
    this.field = field
  }

  validateLocation (input: string, id: string): Error {
    if (input.indexOf('/') !== 2 || input.length !== 5) {
      return new InvalidParamError(this.field, id)
    }
  }

  validate (input: any): Error {
    if (this.field === 'ip_location' || this.field === 'state') return this.validateLocation(input[this.field], input.id)
  }
}
