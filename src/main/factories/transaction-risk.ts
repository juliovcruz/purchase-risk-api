import { Controller } from '../../presentation/protocols/controller'
import { TransactionRiskController } from '../../presentation/controllers/transaction-risk'
import { makeRiskChecker } from './risk-checker'
import { makeValidationCostumer } from './validation-costumer'
import { makeValidationTransaction } from './validation-transaction'

export const makeTransactionRiskController = (): Controller => {
  const riskCheckers = makeRiskChecker()
  const validationsCustomer = makeValidationCostumer()
  const validationsTransaction = makeValidationTransaction()
  return new TransactionRiskController(riskCheckers, validationsCustomer, validationsTransaction)
}
