import axios from 'axios'
import { RequestApi } from '../protocols/request-api'

export class RequestApiAdapter implements RequestApi {
  request (url: string): any {
    axios.get(url)
      .then((response) => {
        return response
      })
  }
}
