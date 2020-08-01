import { PhoneValidatorAdapter } from './phone-validator-adapter'
import { RequestApi } from '../protocols/request-api'

interface SutTypes {
  sut: PhoneValidatorAdapter
  requestApiStub: RequestApi
}

const makeRequestApi = (): RequestApi => {
  class RequestApiStub implements RequestApi {
    request (url: string): any {
      return new Promise(resolve => resolve({
        valid: true
      }))
    }
  }
  return new RequestApiStub()
}

const makeSut = (): SutTypes => {
  const requestApiStub = makeRequestApi()
  const sut = new PhoneValidatorAdapter(requestApiStub)
  return {
    sut,
    requestApiStub
  }
}

describe('PhoneValidator Adapter', () => {
  test('Should return true if requestApi return valid', async () => {
    const { sut } = makeSut()
    const result = await sut.isValid('any_phone')
    expect(result).toBe(true)
  })
  test('Should return false if requestApi return invalid', async () => {
    const { sut, requestApiStub } = makeSut()
    jest.spyOn(requestApiStub, 'request').mockReturnValueOnce(new Promise(resolve => resolve({
      valid: false
    })))
    const result = await sut.isValid('any_phone')
    expect(result).toBe(false)
  })
  test('Should call urlPhone with correct phone', async () => {
    const { sut } = makeSut()
    const spyUrlPhone = jest.spyOn(sut, 'urlPhone')
    await sut.isValid('any_phone')
    expect(spyUrlPhone).toHaveBeenCalledWith('any_phone')
  })
})
