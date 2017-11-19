import { add, sub, mul, div } from './operators'
import { flip, reduce, expectToBe } from '../../util/util'
import { spread } from 'lodash/fp'

describe('async operators', () => {
  test('add', () => add(1, 2).then(expectToBe(3)))

  test('sub', () => sub(1, 2).then(expectToBe(-1)))

  test('mul', () => mul(1, 2).then(expectToBe(2)))

  test('div', () => div(1, 2).then(expectToBe(0.5)))

  test('division by zero', () => div(1, 0).catch(expectToBe('Division by zero')))

  test('sequence', () => 
    mul(3, 4)
      .then(add(2))
      .then(flip(div)(2))
      .then(expectToBe(7))
  )

  test.skip('sequence with error and bad test', () => 
    mul(3, 4)
      .then(add(2))
      .then(flip(div)(0))
      .then(expectToBe(7))
  )

  test('sequence with error', () => 
    mul(3, 4)
      .then(add(2))
      .then(flip(div)(0))
      .catch(expectToBe('Division by zero'))
  )

  test('sum', () => reduce(add, 0, [1, 2, 3, 4]).then(expectToBe(10)))

  test('reduce with error', () => 
    reduce(div, 0, [1, 0, 3, 4])
      .catch(expectToBe('Division by zero'))
  )

  test('parallel', () => 
    Promise.all([
      add(2, 3),
      add(4, 5)
    ])
      .then(spread(mul))
      .then(expectToBe(45))
  )
})