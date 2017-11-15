import { reduce } from 'lodash/fp'
import { add, sub, mul, div } from './operators'

describe('operators', () => {
  test('add', done => {
    add(1, 2, result => {
      expect(result).toBe(3)
      done()
    })
  })

  test('sub', done => {
    sub(1, 2, result => {
      expect(result).toBe(-1)
      done()
    })
  })

  test('mul', () => {
    mul(1, 2, result => {
      expect(result).toBe(2)
    })
  })

  test('div', () => {
    div(1, 2, result => {
      expect(result).toBe(0.5)
      done()
    })
  })

  test('division by zero', done => {
    div(2, 0, done.fail, error => {
      expect(error).toBe('Division by zero')
      done()
    })
  })

  test('chain', done => {
    mul(3, 4, result => {
      add(2, result, result => {
        expect(result).toBe(14)
        done()
      })
    })
  })

  test('chain with error', done => {
    mul(2, 0, result => {
      div(3, result, result => {
        add(2, result)
      }, error => {
        expect(error).toBe('Division by zero')
        done()
      })
    })
  })

  test('sum', () => {
    // don't even try...
  })
})