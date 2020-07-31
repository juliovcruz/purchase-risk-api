import { InvalidParamError } from '../helpers/errors'
import { Validation } from '../protocols/validation'

export class InvalidFieldValidation implements Validation {
  private readonly field: string

  constructor (field: string) {
    this.field = field
  }

  validateLocation (location: string, id: string): Error {
    if (location.indexOf('/') !== 2 || location.length !== 5) {
      return new InvalidParamError(this.field, id)
    }
  }

  validateValue (value: string, id: string): Error {
    const number = Number(value)
    const str = String(number)
    if (str === 'NaN' || number === 0) return new InvalidParamError(this.field, id)
  }

  validate (input: any): Error {
    if (this.field === 'ip_location' || this.field === 'state') return this.validateLocation(input[this.field], input.id)
    if (this.field === 'value') return this.validateValue(input[this.field], input.id)
  }
}
