import { LocationChecker } from './location'
import { makeFakeTransaction } from '../../tests/mock-models'

const makeSut = (): LocationChecker => {
  const levelRisk = [0, 1, 2, 3, 4, 5]
  return new LocationChecker(levelRisk)
}

describe('Location Checker', () => {
  test('Should return levelRisk 0 if location and state is equal', async () => {
    const sut = makeSut()
    const transaction = makeFakeTransaction()
    const result = await sut.verifyRisk(transaction)
    expect(result).toBe(sut.levelRisk[0])
  })
  test('Should return levelRisk 5 if country is different', async () => {
    const sut = makeSut()
    const transaction = makeFakeTransaction()
    transaction.customer.state = 'RJ/US'
    const result = await sut.verifyRisk(transaction)
    expect(result).toBe(sut.levelRisk[5])
  })
  test('Should return levelRisk 1 if country is equal and state is different', async () => {
    const sut = makeSut()
    const transaction = makeFakeTransaction()
    transaction.customer.state = 'GO/BR'
    const result = await sut.verifyRisk(transaction)
    expect(result).toBe(sut.levelRisk[1])
  })
})
