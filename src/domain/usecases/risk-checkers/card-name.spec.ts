import { CardNameChecker } from './card-name'
import { makeFakeTransaction } from '../../tests/mock-models'

const makeSut = (): CardNameChecker => {
  const levelRisk = [0, 1, 2, 3, 4]
  return new CardNameChecker(levelRisk)
}

describe('CardName Checker', () => {
  test('Should return levelRisk 0 if card name and customer name is equal', async () => {
    const sut = makeSut()
    const transaction = makeFakeTransaction()
    transaction.card_hold_name = 'any_name any_name'
    transaction.customer.name = 'any_name any_name'
    const result = await sut.verifyRisk(transaction)
    expect(result).toBe(sut.levelRisk[0])
  })
  test('Should return levelRisk 4 if card name and customer name is different', async () => {
    const sut = makeSut()
    const transaction = makeFakeTransaction()
    transaction.card_hold_name = 'any_name'
    transaction.customer.name = 'another_name'
    const result = await sut.verifyRisk(transaction)
    expect(result).toBe(sut.levelRisk[4])
  })
  test('Should return levelRisk 2 if more of half of names is equal', async () => {
    const sut = makeSut()
    const transaction = makeFakeTransaction()
    transaction.card_hold_name = 'any_first any_second any_third any_fourth'
    transaction.customer.name = 'other_first any_second any_third any_fourth'
    const result = await sut.verifyRisk(transaction)
    expect(result).toBe(sut.levelRisk[2])
  })
  test('Should return levelRisk 4 if card name and customer name is different', async () => {
    const sut = makeSut()
    const transaction = makeFakeTransaction()
    transaction.card_hold_name = 'any_name any_other1 any_other1'
    transaction.customer.name = 'another_name another_name2 another_name2'
    const result = await sut.verifyRisk(transaction)
    expect(result).toBe(sut.levelRisk[4])
  })
})
