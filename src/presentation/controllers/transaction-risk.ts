import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { RiskChecker } from '../../domain/usecases/protocols/risk-checker'
import { Validation } from '../protocols/validation'
import { successRisk } from '../helpers/http-helpers'

export class TransactionRiskController implements Controller {
  private readonly riskChecker: RiskChecker
  private readonly validation: Validation

  constructor (riskChecker: RiskChecker, validation: Validation) {
    this.riskChecker = riskChecker
    this.validation = validation
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const response = [
      {
        id: httpRequest.body[0].id,
        score: 0
      },
      {
        id: httpRequest.body[1].id,
        score: 0
      }]
    return successRisk(response)
  }
}
