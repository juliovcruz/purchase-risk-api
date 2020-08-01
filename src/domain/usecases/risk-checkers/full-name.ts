import { RiskChecker } from '../protocols/risk-checker'
import { TransactionModel } from '../../models/transaction'

export class FullNameChecker implements RiskChecker {
  levelRisk: number[]

  constructor (levelRisk: number[]) {
    this.levelRisk = levelRisk
  }

  verifySecondNameEmpty (str: string): boolean {
    if (str === undefined) return true
    if (str.length < 2) return true
    return false
  }

  async verifyRisk (transaction: TransactionModel): Promise<number> {
    const secondNameCard = transaction.card_hold_name.split(' ')[1]
    const secondNameCustomer = transaction.customer.name.split(' ')[1]
    if (this.verifySecondNameEmpty(secondNameCard)) return this.levelRisk[3]
    if (this.verifySecondNameEmpty(secondNameCustomer)) return this.levelRisk[3]
    return this.levelRisk[0]
  }
}
