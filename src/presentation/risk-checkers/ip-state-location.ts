import { RiskChecker } from '../protocols/risk-checker'
import { TransactionModel } from '../../domain/models/transaction'

export class IpStateLocationChecker implements RiskChecker {
  verifyRisk (transaction: TransactionModel): number {
    if (transaction.ip_location === transaction.customer.state) return 0
  }
}
