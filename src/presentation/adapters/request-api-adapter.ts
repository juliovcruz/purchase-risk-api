import axios from 'axios'
import { RequestApi } from '../protocols/request-api'

export class RequestApiAdapter implements RequestApi {
  request (url: string): any {
    axios.get(url)
      .then((response) => {
        console.log(response.data)
        console.log(response.status)
        console.log(response.statusText)
        console.log(response.headers)
        console.log(response.config)
      })
  }
}
