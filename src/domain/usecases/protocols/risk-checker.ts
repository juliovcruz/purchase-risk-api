import { TransactionModel } from '../../models/transaction'

export interface RiskChecker {
  verifyRisk: (transaction: TransactionModel) => number
}
