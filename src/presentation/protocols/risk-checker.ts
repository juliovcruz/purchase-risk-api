import { TransactionModel } from '../../domain/models/transaction'

export interface RiskChecker {
  verifyRisk: (transaction: TransactionModel) => number
}
