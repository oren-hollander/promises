import { add, sub, mul, div } from './operators'
import { flip, reduce, expectToBe } from '../../util/util'

describe('async operators', () => {
  test('add', done => {
    add(1, 2)
    .then(result => {
      expect(result).toBe(3)
    })
    .then(done)
    .catch(done.fail)
  })

  test('sub', done => 
    sub(1, 2)
      .then(expectToBe(-1))
      .then(done)
      .catch(done.fail)
  )

  test('mul', done => 
    mul(1, 2)
      .then(expectToBe(2))
      .then(done)
      .catch(done.fail)
  )

  test('div', done => 
    div(1, 2)
      .then(expectToBe(0.5))
      .then(done)
      .catch(done.fail)
  )

  test('division by zero', done => 
    div(1, 0)
      .then(done.fail)
      .catch(expectToBe('Division by zero'))
      .then(done)
      .catch(done.fail)
  )

  test('chain', done => 
    mul(3, 4)
      .then(add(2))
      .then(flip(div)(2))
      .then(expectToBe(7))
      .then(done)
      .catch(done.fail)
  )

  test.skip('chain with error and bad test', done => 
    mul(3, 4)
      .then(add(2))
      .then(flip(div)(0))
      .then(expectToBe(7))
      .then(done)
      .catch(done.fail)
  )

  test('chain with error', done => 
    mul(3, 4)
      .then(add(2))
      .then(flip(div)(0))
      .then(done.fail)
      .catch(expectToBe('Division by zero'))
      .then(done)
      .catch(done.fail)
  )

  test('sum', done => 
    reduce(add, 0, [1, 2, 3, 4])
      .then(expectToBe(10))
      .then(done)
      .catch(done.fail)
  )
})