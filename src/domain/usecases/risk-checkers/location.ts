import { RiskChecker } from '../protocols/risk-checker'
import { TransactionModel } from '../../models/transaction'

export class LocationChecker implements RiskChecker {
  levelRisk: number[]

  constructor (values: number[]) {
    this.levelRisk = values
  }

  verifyRisk (transaction: TransactionModel): number {
    const [stateTransaction, countryTransaction] = transaction.ip_location.split('/')
    const [stateConstumer, countryConsumer] = transaction.customer.state.split('/')
    console.log(stateConstumer, stateTransaction, countryTransaction, countryConsumer)
    if (transaction.ip_location === transaction.customer.state) return this.levelRisk[0]
    if (countryTransaction !== countryConsumer) return this.levelRisk[5]
  }
}
