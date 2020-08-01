import { RiskChecker } from '../protocols/risk-checker'
import { TransactionModel } from '../../models/transaction'

export class CardNameChecker implements RiskChecker {
  levelRisk: number[]

  constructor (levelRisk: number[]) {
    this.levelRisk = levelRisk
  }

  async verifyRisk (transaction: TransactionModel): Promise<number> {
    const [firstCardName, secondCardName] = transaction.card_hold_name.split(' ')
    const [firstCustomerName, secondCustomerName] = transaction.customer.name.split(' ')
    if (firstCardName !== firstCustomerName) {
      if (secondCardName !== secondCustomerName) return this.levelRisk[4]
      if (secondCustomerName === undefined || secondCardName === undefined) return this.levelRisk[4]
      if (secondCardName === secondCustomerName) return this.levelRisk[2]
    }
    return this.levelRisk[0]
  }
}
