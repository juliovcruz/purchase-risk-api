import { RiskChecker } from '../../domain/usecases/protocols/risk-checker'
import { CardNameChecker, PhoneDDDChecker, FullNameChecker, LocationChecker, RiskCheckerComposite } from '../../domain/usecases/risk-checkers'

export const makeRiskChecker = (): RiskCheckerComposite => {
  const checkers: RiskChecker[] = []

  checkers.push(new CardNameChecker([0, 1, 2, 3, 4, 5]))
  checkers.push(new PhoneDDDChecker([0, 1, 2, 3, 4, 5]))
  checkers.push(new FullNameChecker([0, 1, 2, 3, 4, 5]))
  checkers.push(new LocationChecker([0, 1, 2, 3, 4, 5]))

  return new RiskCheckerComposite(checkers)
}
