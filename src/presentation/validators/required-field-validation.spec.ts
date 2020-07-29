import { RequiredFieldValidation } from './required-field-validation'
import { MissingParamError } from '../errors'

const makeSut = (): RequiredFieldValidation => {
  const sut = new RequiredFieldValidation('field')
  return sut
}

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })
  test('Should not return if validation success', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_field' })
    expect(error).toBeFalsy()
  })
})
