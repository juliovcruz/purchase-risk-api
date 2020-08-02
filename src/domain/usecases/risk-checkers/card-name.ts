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
    for (let iCard = 0; iCard < cardName.length; iCard++) {
      for (let iCustomer = 0; iCustomer < customerName.length; iCustomer++) {
        if (cardName[iCard] !== customerName[iCustomer]) flag++
      }
    }
    if (flag === cardName.length || flag === customerName.length) return this.levelRisk[4]
    if (flag === 1) return this.levelRisk[2]
    if (flag >= cardName.length / 2) return this.levelRisk[2]
    return this.levelRisk[0]
  }
}
