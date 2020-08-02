import { PhoneValidator } from '../../domain/usecases/protocols/phone-validator'
import { RequestApi } from '../protocols/request-api'
import env from '../../../env'

export class PhoneValidatorAdapter implements PhoneValidator {
  private readonly requestApi: RequestApi

  constructor (requestApi: RequestApi) {
    this.requestApi = requestApi
  }

  urlPhone (phone: string): string {
    let phoneOk = phone.replace(' ', '')
    phoneOk = phone.replace('-', '')
    const url = `http://apilayer.net/api/validate?access_key=${env.phoneValidatorKey}&number=${phoneOk}&country_code=BR&format=1`
    return url
  }

  async isValid (phone: string): Promise<boolean> {
    const result = await this.requestApi.request(this.urlPhone(phone)).then((result: any) => {
      if (typeof (result.valid) !== 'boolean' || result.valid === null || result.valid === undefined) return true
      return (result.valid)
    })
    return new Promise(resolve => resolve(result))
  }
}
