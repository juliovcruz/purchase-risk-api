import { RiskChecker } from '../protocols/risk-checker'
import { TransactionModel } from '../../models/transaction'

export class PhoneDDDChecker implements RiskChecker {
  levelRisk: number[]

  verifyStateDDD (ddd: number): string {
    if (ddd >= 11 && ddd <= 19) return 'SP'
    if (ddd >= 21 && ddd <= 24) return 'RJ'
    if (ddd >= 27 && ddd <= 28) return 'ES'
    if (ddd >= 31 && ddd <= 38) return 'MG'
    if (ddd >= 41 && ddd <= 46) return 'PR'
    if (ddd >= 47 && ddd <= 49) return 'SC'
    if (ddd >= 51 && ddd <= 55) return 'RS'
    if (ddd >= 61 && ddd <= 61) return 'DF'
    if (ddd === 62 || ddd === 64) return 'GO'
    if (ddd >= 63 && ddd <= 63) return 'TO'
    if (ddd >= 65 && ddd <= 66) return 'MT'
    if (ddd >= 67 && ddd <= 67) return 'MS'
    if (ddd >= 68 && ddd <= 68) return 'AC'
    if (ddd >= 69 && ddd <= 69) return 'RO'
    if (ddd >= 71 && ddd <= 77) return 'BA'
    if (ddd >= 79 && ddd <= 79) return 'SE'
    if (ddd >= 81 && ddd <= 81) return 'PE'
    if (ddd >= 83 && ddd <= 83) return 'PB'
    if (ddd >= 84 && ddd <= 84) return 'RN'
    if (ddd >= 85 && ddd <= 85) return 'CE'
    if (ddd >= 86 && ddd <= 86) return 'PI'
    if (ddd >= 87 && ddd <= 87) return 'PE'
    if (ddd >= 88 && ddd <= 88) return 'CE'
    if (ddd >= 91 && ddd <= 91) return 'PA'
    if (ddd >= 92 && ddd <= 92) return 'AM'
    if (ddd >= 93 && ddd <= 94) return 'PA'
    if (ddd >= 95 && ddd <= 95) return 'RR'
    if (ddd >= 96 && ddd <= 96) return 'AP'
    if (ddd >= 97 && ddd <= 97) return 'AM'
    if (ddd >= 98 && ddd <= 99) return 'MA'
    return null
  }

  constructor (levelRisk: number[]) {
    this.levelRisk = levelRisk
  }

  async verifyRisk (transaction: TransactionModel): Promise<number> {
    const stateTransaction = transaction.ip_location.split('/')[0]
    const stateCostumer = transaction.customer.state.split('/')[0]
    const phoneDDD = Number(transaction.customer.phone.split(' ')[0])
    const stateDDD = this.verifyStateDDD(phoneDDD)
    if (stateDDD === null) return this.levelRisk[5]
    if (stateDDD !== stateCostumer && stateDDD !== stateTransaction) return this.levelRisk[4]
    if (stateDDD !== stateCostumer) return this.levelRisk[2]
    if (stateDDD !== stateTransaction) return this.levelRisk[2]
    return this.levelRisk[0]
  }
}
