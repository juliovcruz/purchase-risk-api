import { RiskChecker } from '../protocols/risk-checker'
import { RiskCheckerComposite } from './risk-checkers-composite'
import { TransactionModel } from '../../models/transaction'
import { makeFakeTransaction } from '../../tests/mock-models'

interface SutTypes {
  sut: RiskCheckerComposite
  checkerStubs: RiskChecker[]
}
const makeRiskChecker = (): RiskChecker => {
  class RiskCheckerStub implements RiskChecker {
    levelRisk: number[]

    constructor (levelRisk: number[]) {
      this.levelRisk = levelRisk
    }

    async verifyRisk (transaction: TransactionModel): Promise<number> {
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
  test('Should return 0 if all checkers return levelRisk 0', async () => {
    const { sut } = makeSut()
    const result = await sut.verifyRisk(makeFakeTransaction())
    expect(result).toBe(0)
  })
  test('Should return > 0 if any checker return levelRisk > 0', async () => {
    const { sut, checkerStubs } = makeSut()
    jest.spyOn(checkerStubs[0], 'verifyRisk').mockReturnValueOnce(new Promise(resolve => resolve(1)))
    const result = await sut.verifyRisk(makeFakeTransaction())
    expect(result).toBeGreaterThanOrEqual(1)
  })
  test('Should not return > 100', async () => {
    const { sut, checkerStubs } = makeSut()
    jest.spyOn(checkerStubs[0], 'verifyRisk').mockReturnValueOnce(new Promise(resolve => resolve(50)))
    jest.spyOn(checkerStubs[1], 'verifyRisk').mockReturnValueOnce(new Promise(resolve => resolve(93)))
    const result = await sut.verifyRisk(makeFakeTransaction())
    expect(result).toBe(100)
  })
})
