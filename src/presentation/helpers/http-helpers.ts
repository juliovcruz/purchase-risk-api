import { HttpResponse } from '../protocols/http'
import { ServerError } from './errors'
import { HttpResponseRisk, RiskBody } from '../../domain/usecases/protocols/http-risk'

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const serverError = (): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError()
  }
}

export const successResponse = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    body: data
  }
}

export const successRisk = (data: RiskBody[]): HttpResponseRisk => {
  return {
    statusCode: 200,
    body: data
  }
}
