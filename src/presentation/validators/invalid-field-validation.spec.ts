import { InvalidFieldValidation } from './invalid-field-validation'
import { InvalidParamError } from '../helpers/errors'

interface SutTypes {
  sut: InvalidFieldValidation
}

const makeSut = (input: string): SutTypes => {
  const sut = new InvalidFieldValidation(input)
  return {
    sut
  }
}

describe('InvalidField Validation', () => {
  test('Should return an error if validatelocation fails with ip_location', () => {
    const { sut } = makeSut('ip_location')
    const error = sut.validate({ ip_location: 'ERROR', id: 'any_id' })
    expect(error).toEqual(new InvalidParamError('ip_location', 'any_id'))
  })
  test('Should return an error if validatelocation fails with state', () => {
    const { sut } = makeSut('state')
    const error = sut.validate({ state: 'ERROR', id: 'any_id' })
    expect(error).toEqual(new InvalidParamError('state', 'any_id'))
  })
})
