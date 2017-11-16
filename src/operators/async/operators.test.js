import { add, sub, mul, div } from './operators'
import { isUndefined } from 'lodash/fp'

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

  test('sequence', done => {
    mul(3, 4, result => {
      add(2, result, result => {
        expect(result).toBe(14)
        done()
      })
    })
  })

  test('sequence with error', done => {
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

  test('parallel', done => {

    let count = 0
    let first, second

    const multiply = result => {
      count++
      if(count === 1){
        first = result
      }
      else if(count === 2) {
        second = result
        mul(first, second, result => {
          expect(result).toBe(45)
          done()          
        })
      }
    }

    add(2, 3, multiply)
    add(4, 5, multiply)
  })
})