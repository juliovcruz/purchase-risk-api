import { RiskChecker } from '../../domain/usecases/protocols/risk-checker'
import { CardNameChecker, PhoneDDDChecker, FullNameChecker, LocationChecker, RiskCheckerComposite, ValidPhoneChecker } from '../../domain/usecases/risk-checkers'
import { makeRiskChecker } from './risk-checker'
import { RequestApiAdapter } from '../../presentation/adapters/request-api-adapter'
import { PhoneValidatorAdapter } from '../../presentation/adapters/phone-validator-adapter'
import scoreRisk from '../config/score-level-risk'

jest.mock('../../domain/usecases/risk-checkers/risk-checkers-composite')

describe('RiskChecker Composite', () => {
  test('Should call RiskCheckerComposite with all checkers', () => {
    makeRiskChecker()
    const checkers: RiskChecker[] = []
    checkers.push(new CardNameChecker(scoreRisk.cardNameRisk))
    checkers.push(new PhoneDDDChecker(scoreRisk.phoneDDDRisk))
    checkers.push(new FullNameChecker(scoreRisk.fullNameRisk))
    checkers.push(new LocationChecker(scoreRisk.locationRisk))
    const requestApiAdapter = new RequestApiAdapter()
    const phoneValidatorAdapter = new PhoneValidatorAdapter(requestApiAdapter)
    checkers.push(new ValidPhoneChecker(scoreRisk.validPhoneRisk, phoneValidatorAdapter))

    expect(RiskCheckerComposite).toHaveBeenCalledWith(checkers)
  })
})
