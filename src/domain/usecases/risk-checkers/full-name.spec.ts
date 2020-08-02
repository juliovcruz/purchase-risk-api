import { FullNameChecker } from './full-name'
import { makeFakeTransaction } from '../../tests/mock-models'

const makeSut = (): FullNameChecker => {
  const levelRisk = [0, 1, 2, 3, 4, 5]
  return new FullNameChecker(levelRisk)
}

describe('FullName Checker', () => {
  test('Should return levelRisk 0 if full name is provided', async () => {
    const sut = makeSut()
    const transaction = makeFakeTransaction()
    const result = await sut.verifyRisk(transaction)
    expect(result).toBe(sut.levelRisk[0])
  })
  test('Should return levelRisk 3 if only first name is provided in transaction', async () => {
    const sut = makeSut()
    const transaction = makeFakeTransaction()
    transaction.card_hold_name = 'Ashlee'
    const result = await sut.verifyRisk(transaction)
    expect(result).toBe(sut.levelRisk[3])
  })
  test('Should return levelRisk 3 if only first name is provided in customer', async () => {
    const sut = makeSut()
    const transaction = makeFakeTransaction()
    transaction.customer.name = 'Ashlee '
    const result = await sut.verifyRisk(transaction)
    expect(result).toBe(sut.levelRisk[3])
  })
})
