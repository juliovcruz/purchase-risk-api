import { FullNameChecker } from './full-name'
import { CustomerModel } from '../../models/customer'
import { TransactionModel } from '../../models/transaction'

const makeSut = (): FullNameChecker => {
  const levelRisk = [0, 1, 2, 3, 4, 5]
  return new FullNameChecker(levelRisk)
}

const makeFakeCustomer = (): CustomerModel => {
  return {
    id: 'any_id',
    name: 'any_name',
    birth_date: 'any_birth_date',
    state: 'RJ/BR',
    phone: 'any_phone'
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

describe('FullName Checker', () => {
  test('Should return levelRisk 0 if full name is provided', () => {
    const sut = makeSut()
    const transaction = makeFakeTransaction()
    const result = sut.verifyRisk(transaction)
    expect(result).toBe(sut.levelRisk[0])
  })
})
