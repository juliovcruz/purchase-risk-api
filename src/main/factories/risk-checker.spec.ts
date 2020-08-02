import { RiskChecker } from '../../domain/usecases/protocols/risk-checker'
import { CardNameChecker, PhoneDDDChecker, FullNameChecker, LocationChecker, RiskCheckerComposite, ValidPhoneChecker } from '../../domain/usecases/risk-checkers'
import { makeRiskChecker } from './risk-checker'
import { RequestApiAdapter } from '../../presentation/adapters/request-api-adapter'
import { PhoneValidatorAdapter } from '../../presentation/adapters/phone-validator-adapter'

jest.mock('../../domain/usecases/risk-checkers/risk-checkers-composite')

describe('RiskChecker Composite', () => {
  test('Should call RiskCheckerComposite with all checkers', () => {
    makeRiskChecker()
    const checkers: RiskChecker[] = []
    checkers.push(new CardNameChecker([0, 5, 15, 20, 60, 85]))
    checkers.push(new PhoneDDDChecker([0, 5, 20, 30, 45, 60]))
    checkers.push(new FullNameChecker([0, 5, 15, 16, 60, 85]))
    checkers.push(new LocationChecker([0, 13, 15, 20, 55, 55]))
    const requestApiAdapter = new RequestApiAdapter()
    const phoneValidatorAdapter = new PhoneValidatorAdapter(requestApiAdapter)
    checkers.push(new ValidPhoneChecker([0, 13, 15, 20, 55, 55], phoneValidatorAdapter))

    expect(RiskCheckerComposite).toHaveBeenCalledWith(checkers)
  })
})
