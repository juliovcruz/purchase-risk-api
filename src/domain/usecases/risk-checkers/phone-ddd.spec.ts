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
  test('Should return levelRisk 2 if phone DDD is not compatible with consumer location', () => {
    const sut = makeSut()
    const transaction = makeFakeTransaction()
    transaction.ip_location = 'GO/BR'
    transaction.customer.phone = '62 99999-9999'
    const result = sut.verifyRisk(transaction)
    expect(result).toBe(sut.levelRisk[2])
  })
  test('Should return levelRisk 2 if phone DDD is not compatible with transaction location', () => {
    const sut = makeSut()
    const transaction = makeFakeTransaction()
    transaction.customer.state = 'SP/BR'
    transaction.customer.phone = '12 99999-9999'
    const result = sut.verifyRisk(transaction)
    expect(result).toBe(sut.levelRisk[2])
  })
  test('Should return levelRisk 5 if phone DDD is invalid', () => {
    const sut = makeSut()
    const transaction = makeFakeTransaction()
    transaction.customer.phone = '0 99999-9999'
    const result = sut.verifyRisk(transaction)
    expect(result).toBe(sut.levelRisk[5])
  })
  test('Should return levelRisk 4 if phone DDD is not compatible with all locations', () => {
    const sut = makeSut()
    const transaction = makeFakeTransaction()
    transaction.customer.state = 'AM/BR'
    transaction.ip_location = 'RO/BR'
    transaction.customer.phone = '24 99999-9999'
    const result = sut.verifyRisk(transaction)
    expect(result).toBe(sut.levelRisk[4])
  })
})
