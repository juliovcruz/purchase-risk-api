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
    const result = await sut.isValid('202-555-0108')
    expect(result).toBe(true)
  })
})
