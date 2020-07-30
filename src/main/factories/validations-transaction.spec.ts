import { makeValidationTransaction } from './validation-transaction'
import { Validation } from '../../presentation/protocols/validation'
import { RequiredFieldValidation } from '../../presentation/validators/required-field-validation'
import { ValidationComposite } from '../../presentation/validators/validation-composite'

jest.mock('../../presentation/validators/validation-composite')

describe('ValidationTransaction Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeValidationTransaction()
    const validations: Validation[] = []
    const fields = ['id', 'value', 'paid_at', 'ip_location', 'card_hold_name', 'customer']
    for (const field of fields) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
