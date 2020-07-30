import { RiskChecker } from '../../domain/usecases/protocols/risk-checker'
import { CardNameChecker, PhoneDDDChecker, FullNameChecker, LocationChecker, RiskCheckerComposite } from '../../domain/usecases/risk-checkers'
import { makeRiskChecker } from './risk-checker'

jest.mock('../../domain/usecases/risk-checkers/risk-checkers-composite')

describe('RiskChecker Composite', () => {
  test('Should call RiskCheckerComposite with all checkers', () => {
    makeRiskChecker()
    const checkers: RiskChecker[] = []
    checkers.push(new CardNameChecker([0, 1, 2, 3, 4]))
    checkers.push(new PhoneDDDChecker([0, 1, 2, 3, 4]))
    checkers.push(new FullNameChecker([0, 1, 2, 3, 4]))
    checkers.push(new LocationChecker([0, 1, 2, 3, 4]))

    expect(RiskCheckerComposite).toHaveBeenCalledWith(checkers)
  })
})
