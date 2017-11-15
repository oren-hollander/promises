import { calculate } from './calculator'
import { expectToBe } from '../../util/util'

describe('calculator', () => {

  test('expression', done => {
    calculate('2 + 4 * 5 / 3')
      .then(expectToBe(10))
      .then(done)
      .catch(done.fail)
  })

  test('expression with zero division', done => {
    calculate('2 / 0 + 4 * 5 / 3')
      .then(done.fail)
      .catch(expectToBe('Division by zero'))
      .then(done)
      .catch(done.fail)
  })
})