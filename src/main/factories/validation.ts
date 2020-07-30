import { ValidationComposite } from '../../presentation/validators/validation-composite'
import { Validation } from '../../presentation/protocols/validation'
import { RequiredFieldValidation } from '../../presentation/validators/required-field-validation'

export const makeValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const fields = ['id']

  for (const field of fields) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
