import { PhoneValidator } from '../../domain/usecases/protocols/phone-validator'
import { RequestApi } from '../protocols/request-api'
// import env from '../../../env'

export class PhoneValidatorAdapter implements PhoneValidator {
  private readonly requestApi: RequestApi

  constructor (requestApi: RequestApi) {
    this.requestApi = requestApi
  }

  urlPhone (phone: string): string {
    // const url = `https://www.phonevalidator.com/api/v2/phonesearch?apikey=${env.phoneValidatorKey}&phone=${phone}&type=basic`
    const url = 'https://api.github.com/users/juliovcruz'
    return url
  }

  async isValid (phone: string): Promise<boolean> {
    const result = await this.requestApi.request(this.urlPhone(phone)).then((result: any) => {
      return (result.valid)
    })
    return new Promise(resolve => resolve(result))
  }
}
