import { ValidationComposite } from './validation-composite'
import { Validation } from '../protocols/validation'

interface SutTypes {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeSut = (): SutTypes => {
  const validationStubs: Validation[] = [makeValidation(), makeValidation()]
  const sut = new ValidationComposite(validationStubs)
  return {
    sut,
    validationStubs
  }
}

describe('Validation Composite', () => {
  test('Should return error if any validation fail', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
    const error = sut.validate({ value: 'any_value' })
    expect(error).toEqual(new Error())
  })
  test('Should not return if all validation success', () => {
    const { sut } = makeSut()
    const error = sut.validate({ value: 'any_value' })
    expect(error).toBeFalsy()
  })
})
