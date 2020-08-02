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
  test('Should return an error if validateLocation fails with ip_location', () => {
    const { sut } = makeSut('ip_location')
    const error = sut.validate({ ip_location: 'ERROR', id: 'any_id' })
    expect(error).toEqual(new InvalidParamError('ip_location', 'any_id'))
  })
  test('Should return an error if validateLocation fails with state', () => {
    const { sut } = makeSut('state')
    const error = sut.validate({ state: 'ERROR', id: 'any_id' })
    expect(error).toEqual(new InvalidParamError('state', 'any_id'))
  })
  test('Should return an error if validateValue fails', () => {
    const { sut } = makeSut('value')
    const error = sut.validate({ value: 'ERROR', id: 'any_id' })
    expect(error).toEqual(new InvalidParamError('value', 'any_id'))
  })
  test('Should return an error if validateDate fails with paid_at', () => {
    const { sut } = makeSut('paid_at')
    const error = sut.validate({ paid_at: 'ERR-07-20 15:14:25', id: 'any_id' })
    expect(error).toEqual(new InvalidParamError('paid_at', 'any_id'))
  })
  test('Should return an error if validateDate fails with birth_date', () => {
    const { sut } = makeSut('birth_date')
    const error = sut.validate({ birth_date: 'ERR-07-20', id: 'any_id' })
    expect(error).toEqual(new InvalidParamError('birth_date', 'any_id'))
  })
  test('Should return an error if validateDate fails with date invalid size', () => {
    const { sut } = makeSut('birth_date')
    const error = sut.validate({ birth_date: 'ERR-07-20-50', id: 'any_id' })
    expect(error).toEqual(new InvalidParamError('birth_date', 'any_id'))
  })
  test('Should return an error if validateDate fails with date number size', () => {
    const { sut } = makeSut('birth_date')
    const error = sut.validate({ birth_date: '20011-07-20', id: 'any_id' })
    expect(error).toEqual(new InvalidParamError('birth_date', 'any_id'))
  })
})
