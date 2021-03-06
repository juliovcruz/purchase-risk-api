import { TransactionRiskController } from './transaction-risk'
import { RiskChecker } from '../../domain/usecases/protocols/risk-checker'
import { Validation } from '../protocols/validation'
import { TransactionModel } from '../../domain/models/transaction'
import { successRisk, badRequest } from '../helpers/http-helpers'
import { makeFakeTransaction } from '../../domain/tests/mock-models'
import { HttpRequest } from '../protocols/http'
import { MissingParamError } from '../helpers/errors'

interface SutTypes {
  sut: TransactionRiskController
  riskCheckerStub: RiskChecker
  validationCustomerStub: Validation
  validationTransactionStub: Validation
}

const makeSut = (): SutTypes => {
  const riskCheckerStub = makeRiskCheckerStub()
  const validationCustomerStub = makeValidationStub()
  const validationTransactionStub = makeValidationStub()
  const sut = new TransactionRiskController(riskCheckerStub, validationCustomerStub, validationTransactionStub)
  return {
    sut,
    riskCheckerStub,
    validationCustomerStub,
    validationTransactionStub
  }
}

const makeRiskCheckerStub = (): RiskChecker => {
  class RiskCheckerStub implements RiskChecker {
    levelRisk: number[]
    constructor (levelRisk: number[]) {
      this.levelRisk = levelRisk
    }

    async verifyRisk (transaction: TransactionModel): Promise<number> {
      return 0
    }
  }
  const levelRisk = [0, 1, 2, 3, 4, 5]
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

describe('TransactionRisk Controller', () => {
  test('Should return 200 and score 0 if all checkers return 0', async () => {
    const { sut } = makeSut()
    const request = makeFakeRequest()
    const result = await sut.handle(request)
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
  test('Should call checkers with all transactions', async () => {
    const { sut, riskCheckerStub } = makeSut()
    const spyVerify = jest.spyOn(riskCheckerStub, 'verifyRisk')
    const request = makeFakeRequest()
    request.body[1].value = 255.6
    await sut.handle(request)
    expect(spyVerify).toHaveBeenCalledWith(request.body[0])
    expect(spyVerify).toHaveBeenCalledWith(request.body[1])
  })
  test('Should return 400 if ValidationCustomer returns an error', async () => {
    const { sut, validationCustomerStub } = makeSut()
    jest.spyOn(validationCustomerStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field', 'any_id'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field', 'any_id')))
  })
  test('Should return 400 if ValidationTransaction returns an error', async () => {
    const { sut, validationTransactionStub } = makeSut()
    jest.spyOn(validationTransactionStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field', 'any_id'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field', 'any_id')))
  })
})
