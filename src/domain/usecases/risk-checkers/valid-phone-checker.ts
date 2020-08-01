import { RiskChecker } from '../protocols/risk-checker'
import { TransactionModel } from '../../models/transaction'
import { PhoneValidator } from '../protocols/phone-validator'

export class ValidPhoneChecker implements RiskChecker {
  levelRisk: number[]
  private readonly phoneValidator: PhoneValidator

  constructor (levelRisk: number[], phoneValidator: PhoneValidator) {
    this.levelRisk = levelRisk
    this.phoneValidator = phoneValidator
  }

  async verifyRisk (transaction: TransactionModel): Promise<number> {
    let valid: boolean
    try {
      valid = await this.phoneValidator.isValid(transaction.customer.phone).then(response => {
        return response
      })
    } catch (e) {
      return this.levelRisk[1]
    }
    if (!valid) return this.levelRisk[4]
    return this.levelRisk[0]
  }
}
