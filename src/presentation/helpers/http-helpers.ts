import { HttpResponse } from '../protocols/http'
import { HttpResponseRisk, RiskBody } from '../../domain/usecases/protocols/http-risk'

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const successRisk = (data: RiskBody[]): HttpResponseRisk => {
  return {
    statusCode: 200,
    body: data
  }
}
