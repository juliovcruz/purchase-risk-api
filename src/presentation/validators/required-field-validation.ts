import { MissingParamError } from '../helpers/errors'
import { Validation } from '../protocols/validation'

export class RequiredFieldValidation implements Validation {
  private readonly field: string

  constructor (field: string) {
    this.field = field
  }

  validate (input: any): Error {
    if (!input[this.field]) {
      return new MissingParamError(this.field, input.id)
    }
  }
}
