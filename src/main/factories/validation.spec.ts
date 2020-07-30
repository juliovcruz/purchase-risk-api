import { makeValidation } from './validation'
import { Validation } from '../../presentation/protocols/validation'
import { RequiredFieldValidation } from '../../presentation/validators/required-field-validation'
import { ValidationComposite } from '../../presentation/validators/validation-composite'

jest.mock('../../presentation/validators/validation-composite')

describe('Validation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeValidation()
    const validations: Validation[] = []
    const fields = ['id']
    for (const field of fields) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
