import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { RiskChecker } from '../../domain/usecases/protocols/risk-checker'
import { Validation } from '../protocols/validation'
import { successRisk, badRequest, serverError } from '../helpers/http-helpers'
import { RiskBody } from '../../domain/usecases/protocols/http-risk'

export class TransactionRiskController implements Controller {
  private readonly riskChecker: RiskChecker
  private readonly validationCustomer: Validation
  private readonly validationTransaction: Validation

  constructor (riskChecker: RiskChecker, validationCustomer: Validation, validationTransaction: Validation) {
    this.riskChecker = riskChecker
    this.validationCustomer = validationCustomer
    this.validationTransaction = validationTransaction
  }

  async handle (transactions: HttpRequest): Promise<HttpResponse> {
    try {
      const response: RiskBody[] = []
      for (const transaction of transactions.body) {
        let error = this.validationTransaction.validate(transaction)
        if (error) {
          return badRequest(error)
        }
        error = this.validationCustomer.validate(transaction.customer)
        if (error) {
          return badRequest(error)
        }
        const scoreR = await this.riskChecker.verifyRisk(transaction)
        response.push({
          id: transaction.id,
          score: scoreR
        })
      }
      return successRisk(response)
    } catch (e) {
      return serverError()
    }
  }
}
