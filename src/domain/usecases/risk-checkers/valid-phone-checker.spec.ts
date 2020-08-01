import { ValidPhoneChecker } from './valid-phone-checker'
import { PhoneValidator } from '../protocols/phone-validator'
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

interface SutTypes {
  sut: ValidPhoneChecker
  phoneValidatorStub: PhoneValidator
}

const makePhoneValidator = (): PhoneValidator => {
  class PhoneValidatorStub implements PhoneValidator {
    async isValid (phone: string): Promise<boolean> {
      return await new Promise(resolve => resolve(true))
    }
  }
  return new PhoneValidatorStub()
}

const makeSut = (): SutTypes => {
  const levelRisk = [0, 1, 2, 3, 4, 5]
  const phoneValidatorStub = makePhoneValidator()
  const sut = new ValidPhoneChecker(levelRisk, phoneValidatorStub)
  return {
    sut,
    phoneValidatorStub
  }
}

describe('ValidPhone Checker', () => {
  test('Should call phoneValidator with phone', async () => {
    const { sut, phoneValidatorStub } = makeSut()
    const validSpy = jest.spyOn(phoneValidatorStub, 'isValid')
    const transaction = makeFakeTransaction()
    transaction.customer.phone = 'any_phone'
    await sut.verifyRisk(transaction)
    expect(validSpy).toHaveBeenCalledWith('any_phone')
  })
})
