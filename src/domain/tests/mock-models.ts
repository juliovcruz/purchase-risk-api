import { TransactionModel } from '../models/transaction'
import { CustomerModel } from '../models/customer'

export const makeFakeCustomer = (): CustomerModel => {
  return {
    id: 'any_id',
    name: 'any_name any_second_name',
    birth_date: 'any_birth_date',
    state: 'RJ/BR',
    phone: '24 99999-9999'
  }
}

export const makeFakeTransaction = (): TransactionModel => {
  return {
    id: 'any_id',
    value: 10,
    paid_at: 'any_date',
    ip_location: 'RJ/BR',
    card_hold_name: 'any_name any_second_name',
    customer: makeFakeCustomer()
  }
}
