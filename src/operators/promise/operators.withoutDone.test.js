import { add, sub, mul, div } from './operators'
import { flip, reduce, expectToBe } from '../../util/util'

describe('async operators', () => {
  test('add (without done)', () => add(1, 2).then(expectToBe(3)))

  test('sub', () => sub(1, 2).then(expectToBe(-1)))

  test('mul', () => mul(1, 2).then(expectToBe(2)))

  test('div', () => div(1, 2).then(expectToBe(0.5)))

  test('division by zero', () => div(1, 0).catch(expectToBe('Division by zero')))

  test('chain', () => 
    mul(3, 4)
      .then(add(2))
      .then(flip(div)(2))
      .then(expectToBe(7))
  )

  test.skip('chain with error and bad test', () => 
    mul(3, 4)
      .then(add(2))
      .then(flip(div)(0))
      .then(expectToBe(7))
  )

  test('chain with error', () => 
    mul(3, 4)
      .then(add(2))
      .then(flip(div)(0))
      .catch(expectToBe('Division by zero'))
  )

  test('sum', () => reduce(add, 0, [1, 2, 3, 4]).then(expectToBe(10)))
})