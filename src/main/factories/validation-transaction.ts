import { ValidationComposite } from '../../presentation/validators/validation-composite'
import { Validation } from '../../presentation/protocols/validation'
import { RequiredFieldValidation } from '../../presentation/validators/required-field-validation'
import { InvalidFieldValidation } from '../../presentation/validators/invalid-field-validation'

export const makeValidationTransaction = (): ValidationComposite => {
  const validations: Validation[] = []
  const fields = ['id', 'value', 'paid_at', 'ip_location', 'card_hold_name', 'customer']

  for (const field of fields) {
    validations.push(new RequiredFieldValidation(field))
    validations.push(new InvalidFieldValidation(field))
  }
  validations.push(new InvalidFieldValidation('ip_location'))

  return new ValidationComposite(validations)
}
