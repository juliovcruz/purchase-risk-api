import { RiskChecker } from '../../domain/usecases/protocols/risk-checker'
import { CardNameChecker, PhoneDDDChecker, FullNameChecker, LocationChecker, RiskCheckerComposite } from '../../domain/usecases/risk-checkers'
import { RequestApiAdapter } from '../../presentation/adapters/request-api-adapter'
import { PhoneValidatorAdapter } from '../../presentation/adapters/phone-validator-adapter'
import { ValidPhoneChecker } from '../../domain/usecases/risk-checkers/valid-phone-checker'
import scoreRisk from '../config/score-level-risk'

export const makeRiskChecker = (): RiskCheckerComposite => {
  const checkers: RiskChecker[] = []

  checkers.push(new CardNameChecker(scoreRisk.cardNameRisk))
  checkers.push(new PhoneDDDChecker(scoreRisk.phoneDDDRisk))
  checkers.push(new FullNameChecker(scoreRisk.fullNameRisk))
  checkers.push(new LocationChecker(scoreRisk.locationRisk))
  const requestApiAdapter = new RequestApiAdapter()
  const phoneValidatorAdapter = new PhoneValidatorAdapter(requestApiAdapter)
  checkers.push(new ValidPhoneChecker(scoreRisk.validPhoneRisk, phoneValidatorAdapter))

  return new RiskCheckerComposite(checkers)
}
