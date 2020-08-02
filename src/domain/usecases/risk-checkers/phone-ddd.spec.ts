import { PhoneDDDChecker } from './phone-ddd'
import { makeFakeTransaction } from '../../tests/mock-models'

const makeSut = (): PhoneDDDChecker => {
  const levelRisk = [0, 1, 2, 3, 4, 5]
  return new PhoneDDDChecker(levelRisk)
}

describe('PhoneDDD Checker', () => {
  test('Should return levelRisk 0 if phone DDD is compatible with all locations', async () => {
    const sut = makeSut()
    const transaction = makeFakeTransaction()
    const result = await sut.verifyRisk(transaction)
    expect(result).toBe(sut.levelRisk[0])
  })
  test('Should return levelRisk 2 if phone DDD is not compatible with consumer location', async () => {
    const sut = makeSut()
    const transaction = makeFakeTransaction()
    transaction.ip_location = 'GO/BR'
    transaction.customer.phone = '62 99999-9999'
    const result = await sut.verifyRisk(transaction)
    expect(result).toBe(sut.levelRisk[2])
  })
  test('Should return levelRisk 2 if phone DDD is not compatible with transaction location', async () => {
    const sut = makeSut()
    const transaction = makeFakeTransaction()
    transaction.customer.state = 'SP/BR'
    transaction.customer.phone = '12 99999-9999'
    const result = await sut.verifyRisk(transaction)
    expect(result).toBe(sut.levelRisk[2])
  })
  test('Should return levelRisk 5 if phone DDD is invalid', async () => {
    const sut = makeSut()
    const transaction = makeFakeTransaction()
    transaction.customer.phone = '0 99999-9999'
    const result = await sut.verifyRisk(transaction)
    expect(result).toBe(sut.levelRisk[5])
  })
  test('Should return levelRisk 4 if phone DDD is not compatible with all locations', async () => {
    const sut = makeSut()
    const transaction = makeFakeTransaction()
    transaction.customer.state = 'AM/BR'
    transaction.ip_location = 'RO/BR'
    transaction.customer.phone = '24 99999-9999'
    const result = await sut.verifyRisk(transaction)
    expect(result).toBe(sut.levelRisk[4])
  })
  test('Should verifyStateDDD returns correct values', async () => {
    const sut = makeSut()
    const dddDict = {
      11: 'SP',
      17: 'SP',
      24: 'RJ',
      28: 'ES',
      37: 'MG',
      44: 'PR',
      48: 'SC',
      53: 'RS',
      61: 'DF',
      64: 'GO',
      63: 'TO',
      66: 'MT',
      67: 'MS',
      68: 'AC',
      69: 'RO',
      75: 'BA',
      79: 'SE',
      81: 'PE',
      83: 'PB',
      84: 'RN',
      88: 'CE',
      86: 'PI',
      87: 'PE',
      97: 'AM',
      94: 'PA',
      95: 'RR',
      96: 'AP',
      99: 'MA'
    }
    Object.entries(dddDict).forEach(ddd => {
      const result = sut.isValidStateDDD(ddd[0], ddd[1])
      expect(result).toEqual(true)
    })
  })
})
