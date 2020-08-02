import { RiskChecker } from '../protocols/risk-checker'
import { TransactionModel } from '../../models/transaction'

export class CardNameChecker implements RiskChecker {
  levelRisk: number[]

  constructor (levelRisk: number[]) {
    this.levelRisk = levelRisk
  }

  async verifyRisk (transaction: TransactionModel): Promise<number> {
    const cardName = transaction.card_hold_name.split(' ')
    const customerName = transaction.customer.name.split(' ')
    let flag = 0
    for (let i = 0; i < cardName.length && i < customerName.length; i++) {
      if (cardName[i] !== customerName[i]) flag++
    }
    if (flag === cardName.length || flag === customerName.length) return this.levelRisk[4]
    if (flag > 0) return this.levelRisk[2]
    return this.levelRisk[0]
  }
}
