import { Router } from 'express'
import { makeTransactionRiskController } from '../factories/transaction-risk'
import { adaptRoutes } from '../adapters/express-routes-adapter'

export default (router: Router): void => {
  router.post('/risk', adaptRoutes(makeTransactionRiskController()))
}
