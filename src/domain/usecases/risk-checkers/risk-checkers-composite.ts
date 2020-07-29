import { RiskChecker } from '../protocols/risk-checker'
import { TransactionModel } from '../../models/transaction'

export class RiskCheckerComposite implements RiskChecker {
  private readonly checkers: RiskChecker[]
  levelRisk: number[]

  constructor (checkers: RiskChecker[]) {
    this.checkers = checkers
  }

  verifyRisk (transaction: TransactionModel): number {
    let scoreRisk: number = 0
    for (const checker of this.checkers) {
      const checkerRisk = checker.verifyRisk(transaction)
      scoreRisk += checkerRisk
    }
    return scoreRisk
  }
}
