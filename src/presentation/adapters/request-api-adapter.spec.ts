import axios from 'axios'
import { RequestApiAdapter } from './request-api-adapter'

jest.mock('axios')

describe('RequestApi Adapter', () => {
  test('Should call get with url', () => {
    const sut = new RequestApiAdapter()
    jest.spyOn(axios, 'get').mockImplementationOnce(async () => await Promise.resolve({ id: 'any' }))
    sut.request('any_url')
    expect(axios.get).toHaveBeenCalledWith('any_url')
  })
})
