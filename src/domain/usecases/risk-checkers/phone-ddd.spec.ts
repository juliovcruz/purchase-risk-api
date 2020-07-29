import { PhoneDDDChecker } from './phone-ddd'
import { TransactionModel } from '../../models/transaction'
import { CustomerModel } from '../../models/customer'

const makeFakeCustomer = (): CustomerModel => {
  return {
    id: 'any_id',
    name: 'any_name',
    birth_date: 'any_birth_date',
    state: 'RJ/BR',
    phone: '24 99999-9999'
  }
}

const makeFakeTransaction = (): TransactionModel => {
  return {
    id: 'any_id',
    value: 10,
    paid_at: 'any_date',
    ip_location: 'RJ/BR',
    card_hold_name: 'any_card_hold_name',
    customer: makeFakeCustomer()
  }
}

const makeSut = (): PhoneDDDChecker => {
  const levelRisk = [0, 1, 2, 3, 4, 5]
  return new PhoneDDDChecker(levelRisk)
}

describe('PhoneDDD Checker', () => {
  test('Should return levelRisk 0 if phone DDD is compatible with all locations', () => {
    const sut = makeSut()
    const transaction = makeFakeTransaction()
    const result = sut.verifyRisk(transaction)
    expect(result).toBe(sut.levelRisk[0])
  })
})
