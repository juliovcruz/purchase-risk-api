import { RiskChecker } from '../protocols/risk-checker'
import { TransactionModel } from '../../models/transaction'
import dictionaryState from '../../../utils/ddd-state'

export class PhoneDDDChecker implements RiskChecker {
  levelRisk: number[]

  isValidStateDDD (ddd: string, state: string): boolean {
    let result: boolean = null
    Object.entries(dictionaryState).forEach(dddDict => {
      if (ddd === dddDict[0]) {
        if (state === dddDict[1]) result = true
        else result = false
      }
    })
    return result
  }

  constructor (levelRisk: number[]) {
    this.levelRisk = levelRisk
  }

  async verifyRisk (transaction: TransactionModel): Promise<number> {
    const stateTransaction = transaction.ip_location.split('/')[0]
    const stateCostumer = transaction.customer.state.split('/')[0]
    const phoneDDD = transaction.customer.phone.split(' ')[0]
    const isValidTransactionDDD = this.isValidStateDDD(phoneDDD, stateCostumer)
    const isValidCustomerDDD = this.isValidStateDDD(phoneDDD, stateTransaction)
    console.log(stateTransaction, stateCostumer, phoneDDD, isValidCustomerDDD, isValidTransactionDDD)
    if (isValidTransactionDDD === null && isValidCustomerDDD === null) return this.levelRisk[5]
    if (!isValidTransactionDDD && !isValidCustomerDDD) return this.levelRisk[4]
    if (isValidTransactionDDD && !isValidCustomerDDD) return this.levelRisk[2]
    if (!isValidTransactionDDD && isValidCustomerDDD) return this.levelRisk[2]
    return this.levelRisk[0]
  }
}
