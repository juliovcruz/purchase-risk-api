import { RiskChecker } from '../protocols/risk-checker'
import { TransactionModel } from '../../../domain/models/transaction'

export class IpStateLocationChecker implements RiskChecker {
  levelRisk: number[]

  constructor (values: number[]) {
    this.levelRisk = values
  }

  verifyRisk (transaction: TransactionModel): number {
    if (transaction.ip_location === transaction.customer.state) return this.levelRisk[0]
  }
}
