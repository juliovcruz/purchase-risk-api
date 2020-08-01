import { RiskChecker } from '../protocols/risk-checker'
import { TransactionModel } from '../../models/transaction'

export class RiskCheckerComposite implements RiskChecker {
  private readonly checkers: RiskChecker[]
  levelRisk: number[]

  constructor (checkers: RiskChecker[]) {
    this.checkers = checkers
  }

  async verifyRisk (transaction: TransactionModel): Promise<number> {
    let scoreRisk: number = 0
    for (const checker of this.checkers) {
      const checkerRisk = await checker.verifyRisk(transaction)
      scoreRisk += checkerRisk
    }
    if (scoreRisk > 100) scoreRisk = 100
    return scoreRisk
  }
}
