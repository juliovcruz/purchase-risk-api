import { TransactionModel } from '../../models/transaction'

export interface RiskChecker {
  levelRisk: number[]

  verifyRisk: (transaction: TransactionModel) => Promise<number>
}
