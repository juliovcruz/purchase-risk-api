import { IpStateLocationChecker } from './ip-state-location'
import { TransactionModel } from '../../../domain/models/transaction'
import { CustomerModel } from '../../../domain/models/customer'

const makeFakeCustomer = (): CustomerModel => {
  return {
    id: 'any_id',
    name: 'any_name',
    birth_date: 'any_birth_date',
    state: 'any_location',
    phone: 'any_phone'
  }
}

const makeFakeTransaction = (): TransactionModel => {
  return {
    id: 'any_id',
    value: 10,
    paid_at: 'any_date',
    ip_location: 'any_location',
    card_hold_name: 'any_card_hold_name',
    customer: makeFakeCustomer()
  }
}

const makeSut = (): IpStateLocationChecker => {
  return new IpStateLocationChecker()
}

describe('IpStateLocation Checker', () => {
  test('Should return 0 if ipLocation and state is equal', () => {
    const sut = makeSut()
    const transaction = makeFakeTransaction()
    const result = sut.verifyRisk(transaction)
    expect(result).toBe(0)
  })
})
