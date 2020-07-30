import { makeValidationCostumer } from './validation-costumer'
import { Validation } from '../../presentation/protocols/validation'
import { RequiredFieldValidation } from '../../presentation/validators/required-field-validation'
import { ValidationComposite } from '../../presentation/validators/validation-composite'

jest.mock('../../presentation/validators/validation-composite')

describe('ValidationCostumer Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeValidationCostumer()
    const validations: Validation[] = []
    const fields = ['id', 'name', 'birth_date', 'state', 'phone']
    for (const field of fields) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
