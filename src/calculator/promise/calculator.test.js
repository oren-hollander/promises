import { calculate } from './calculator'
import { expectToBe, fail } from '../../util/util'

describe('calculator', () => {

  test('expression', () => 
    calculate('2 + 4 * 5 / 3')
      .then(expectToBe(10))
  )

  test('expression with zero division', () => 
    calculate('2 / 0 + 4 * 5 / 3')
      .then(fail('Should not succeed'), expectToBe('Division by zero'))
  )
})