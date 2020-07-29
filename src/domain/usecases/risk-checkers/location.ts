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
    if (countryTransaction !== countryConsumer) return this.levelRisk[5]
    if (stateTransaction !== stateConstumer) return this.levelRisk[1]
    return this.levelRisk[0]
  }
}
