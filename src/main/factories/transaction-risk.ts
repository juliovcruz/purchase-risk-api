import { Controller } from '../../presentation/protocols/controller'
import { TransactionRiskController } from '../../presentation/controllers/transaction-risk'
import { makeRiskChecker } from './risk-checker'
import { makeValidation } from './validation'

export const makeTransactionRiskController = (): Controller => {
  const riskCheckers = makeRiskChecker()
  const validations = makeValidation()
  return new TransactionRiskController(riskCheckers, validations)
}
