import { LocationChecker } from './location'
import { TransactionModel } from '../../models/transaction'
import { CustomerModel } from '../../models/customer'

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

const makeSut = (): LocationChecker => {
  const levelRisk = [0, 1, 2, 3, 4, 5]
  return new LocationChecker(levelRisk)
}

describe('Location Checker', () => {
  test('Should return levelRisk 0 if location and state is equal', () => {
    const sut = makeSut()
    const transaction = makeFakeTransaction()
    const result = sut.verifyRisk(transaction)
    expect(result).toBe(sut.levelRisk[0])
  })
  test('Should return levelRisk 5 if country is different', () => {
    const sut = makeSut()
    const transaction = makeFakeTransaction()
    transaction.customer.state = 'RJ/US'
    const result = sut.verifyRisk(transaction)
    expect(result).toBe(sut.levelRisk[5])
  })
  test('Should return levelRisk 1 if country is equal and state is different', () => {
    const sut = makeSut()
    const transaction = makeFakeTransaction()
    transaction.customer.state = 'GO/BR'
    const result = sut.verifyRisk(transaction)
    expect(result).toBe(sut.levelRisk[1])
  })
})
