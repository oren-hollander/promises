import { add, sub, mul, div } from './operators'
import { flip, reduce, expectToBe, fail } from '../../util/util'
import { spread } from 'lodash/fp'

describe('async operators', () => {
  test('add', () => add(1, 2).then(expectToBe(3)))

  test('sub', () => sub(1, 2).then(expectToBe(-1)))

  test('mul', () => mul(1, 2).then(expectToBe(2)))

  test('div', () => div(1, 2).then(expectToBe(0.5)))

  test('division by zero', () => 
    div(1, 0)
      .then(fail('Should not succeed'))
      .catch(expectToBe('Division by zero')))

  test('division by zero alternative', () => 
    div(1, 0)
      .then(fail('Should not succeed'), expectToBe('Division by zero'))
  )
  
  test('sequence', () => 
    mul(3, 4)
      .then(add(2))
      .then(flip(div)(2))
      .then(expectToBe(7))
  )

  test('sequence with error', () => 
    mul(1, 2)
      .then(add(3))
      .then(flip(div)(0))
      .then(fail('Should not succeed'))
      .catch(expectToBe('Division by zero'))
  )

  test('sum', () => reduce(add, 0, [1, 2, 3, 4]).then(expectToBe(10)))

  test('reduce with error', () => 
    reduce(div, 1, [1, 0, 3, 4])
      .then(fail('Should not succeed'))
      .catch(expectToBe('Division by zero'))
  )

  test('parallel', () => 
    Promise.all([
      add(2, 3),
      sub(4, 2)
    ])
      .then(spread(div))
      .then(expectToBe(2.5))
  )

  const addAndMul = (a, b) => 
    add(a, b)
      .then(r1 => mul(r1, b).then(r2 => [r1, r2]))
      .then(spread(add))

  test('nested', () => 
    addAndMul(2, 3)
      .then(expectToBe(20))
  )

  test('nested alternative', () => {
    const addAndMul = (a, b) => 
      add(a, b)
        .then(r1 => mul(r1, b)
          .then(r2 => add(r1, r2)
        )
      )

    addAndMul(2, 3)
      .then(expectToBe(20))
  })
})