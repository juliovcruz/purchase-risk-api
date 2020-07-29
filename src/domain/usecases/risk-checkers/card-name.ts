import { RiskChecker } from '../protocols/risk-checker'
import { TransactionModel } from '../../models/transaction'

export class CardNameChecker implements RiskChecker {
  levelRisk: number[]

  constructor (levelRisk: number[]) {
    this.levelRisk = levelRisk
  }

  verifyRisk (transaction: TransactionModel): number {
    return this.levelRisk[0]
  }
}
