import { RiskChecker } from '../protocols/risk-checker'
import { RiskCheckerComposite } from './risk-checkers-composite'
import { TransactionModel } from '../../models/transaction'
import { CustomerModel } from '../../models/customer'

interface SutTypes {
  sut: RiskCheckerComposite
  checkerStubs: RiskChecker[]
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

const makeRiskChecker = (): RiskChecker => {
  class RiskCheckerStub implements RiskChecker {
    levelRisk: number[]

    constructor (levelRisk: number[]) {
      this.levelRisk = levelRisk
    }

    verifyRisk (transaction: TransactionModel): number {
      return this.levelRisk[0]
    }
  }
  const levelRisk = [0, 1, 2, 3, 4]

  return new RiskCheckerStub(levelRisk)
}

const makeSut = (): SutTypes => {
  const checkerStubs = [makeRiskChecker(), makeRiskChecker()]
  const sut = new RiskCheckerComposite(checkerStubs)
  return {
    sut,
    checkerStubs
  }
}

describe('RiskChecker Composite', () => {
  test('Should return 0 if all checkers return levelRisk 0', () => {
    const { sut } = makeSut()
    const result = sut.verifyRisk(makeFakeTransaction())
    expect(result).toBe(0)
  })
  test('Should return > 0 if any checker return levelRisk > 0', () => {
    const { sut, checkerStubs } = makeSut()
    jest.spyOn(checkerStubs[0], 'verifyRisk').mockReturnValueOnce(1)
    const result = sut.verifyRisk(makeFakeTransaction())
    expect(result).toBeGreaterThanOrEqual(1)
  })
})
