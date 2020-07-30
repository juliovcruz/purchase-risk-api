import { TransactionRiskController } from './transaction-risk'
import { RiskChecker } from '../../domain/usecases/protocols/risk-checker'
import { Validation } from '../protocols/validation'
import { TransactionModel } from '../../domain/models/transaction'
import { successRisk } from '../helpers/http-helpers'
import { CustomerModel } from '../../domain/models/customer'
import { HttpRequest } from '../protocols/http'

interface SutTypes {
  sut: TransactionRiskController
  riskCheckerStub: RiskChecker
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const riskCheckerStub = makeRiskCheckerStub()
  const validationStub = makeValidationStub()
  const sut = new TransactionRiskController(riskCheckerStub, validationStub)
  return {
    sut,
    riskCheckerStub,
    validationStub
  }
}

const makeRiskCheckerStub = (): RiskChecker => {
  class RiskCheckerStub implements RiskChecker {
    levelRisk: number[]
    constructor (levelRisk: number[]) {
      this.levelRisk = levelRisk
    }

    verifyRisk (transaction: TransactionModel): number {
      return 0
    }
  }
  const levelRisk = [0, 1, 2, 3, 4]
  return new RiskCheckerStub(levelRisk)
}

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeFakeRequest = (): HttpRequest => {
  return {
    body: [makeFakeTransaction(), makeFakeTransaction()]
  }
}

const makeFakeCustomer = (): CustomerModel => {
  return {
    id: 'any_id',
    name: 'any_name',
    birth_date: 'any_birth_date',
    state: 'RJ/BR',
    phone: 'any_phone'
  }
}

const makeFakeTransaction = (): TransactionModel => {
  return {
    id: 'any_id',
    value: 10,
    paid_at: 'any_date',
    ip_location: 'RJ/BR',
    card_hold_name: 'any_card_hold_name',
    customer: makeFakeCustomer()
  }
}

describe('TransactionRisk Controller', () => {
  test('Should return 200 and score 0 if all checkers return 0', () => {
    const { sut } = makeSut()
    const request = makeFakeRequest()
    const result = sut.handle(request)
    expect(result).toEqual(successRisk([
      {
        id: 'any_id',
        score: 0
      },
      {
        id: 'any_id',
        score: 0
      }]))
  })
})
