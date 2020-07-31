import { makeValidationTransaction } from './validation-transaction'
import { Validation } from '../../presentation/protocols/validation'
import { RequiredFieldValidation } from '../../presentation/validators/required-field-validation'
import { ValidationComposite } from '../../presentation/validators/validation-composite'
import { InvalidFieldValidation } from '../../presentation/validators/invalid-field-validation'

jest.mock('../../presentation/validators/validation-composite')

describe('ValidationTransaction Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeValidationTransaction()
    const validations: Validation[] = []
    const fields = ['id', 'value', 'paid_at', 'ip_location', 'card_hold_name', 'customer']
    for (const field of fields) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new InvalidFieldValidation('ip_location'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
