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

  validateDate (value: string, id: string): Error {
    const date = value.split('-')
    if (date.length !== 3) return new InvalidParamError(this.field, id)
    for (const field of date) {
      const number = Number(field)
      const str = String(number)
      if (str === 'NaN') return new InvalidParamError(this.field, id)
    }
    if (date[0].length !== 4 || date[1].length !== 2 || date[2].length !== 2) return new InvalidParamError(this.field, id)
  }

  validate (input: any): Error {
    if (this.field === 'ip_location' || this.field === 'state') return this.validateLocation(input[this.field], input.id)
    if (this.field === 'value') return this.validateValue(input[this.field], input.id)
    if (this.field === 'paid_at') {
      return this.validateDate(input[this.field].split(' ')[0], input.id)
    }
    if (this.field === 'birth_date') return this.validateDate(input[this.field], input.id)
  }
}
