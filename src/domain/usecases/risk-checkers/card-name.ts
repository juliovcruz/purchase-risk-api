import { RiskChecker } from '../protocols/risk-checker'
import { TransactionModel } from '../../models/transaction'

export class CardNameChecker implements RiskChecker {
  levelRisk: number[]

  constructor (levelRisk: number[]) {
    this.levelRisk = levelRisk
  }

  verifyRisk (transaction: TransactionModel): number {
    const cardName = transaction.card_hold_name
    const customerName = transaction.customer.name
    if (cardName !== customerName) return this.levelRisk[4]
    return this.levelRisk[0]
  }
}
