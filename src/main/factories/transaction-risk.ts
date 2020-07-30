import { Controller } from '../../presentation/protocols/controller'
import { TransactionRiskController } from '../../presentation/controllers/transaction-risk'
import { makeRiskChecker } from './risk-checker'
import { makeValidationCostumer } from './validation-costumer'

export const makeTransactionRiskController = (): Controller => {
  const riskCheckers = makeRiskChecker()
  const validations = makeValidationCostumer()
  return new TransactionRiskController(riskCheckers, validations)
}
