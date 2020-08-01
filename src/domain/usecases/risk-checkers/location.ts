import { RiskChecker } from '../protocols/risk-checker'
import { TransactionModel } from '../../models/transaction'

export class LocationChecker implements RiskChecker {
  levelRisk: number[]

  constructor (values: number[]) {
    this.levelRisk = values
  }

  async verifyRisk (transaction: TransactionModel): Promise<number> {
    const [stateTransaction, countryTransaction] = transaction.ip_location.split('/')
    const [stateConstumer, countryConsumer] = transaction.customer.state.split('/')
    if (countryTransaction !== countryConsumer) return this.levelRisk[5]
    if (stateTransaction !== stateConstumer) return this.levelRisk[1]
    return this.levelRisk[0]
  }
}
