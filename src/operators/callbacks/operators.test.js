import { add, sub, mul, div } from './operators'
import { isUndefined, delay } from 'lodash/fp'

describe('operators', () => {
  test('add', done => {
    add(1, 2, result => {
      try {
        expect(result).toBe(3)
        done()
      }
      catch(e){
        done.fail(e)
      }
    })
  })

  test('sub', done => {
    sub(1, 2, result => {
      try {
        expect(result).toBe(-1)
        done()
      }
      catch(e){
        done.fail(e) 
      }
    })
  })

  test('mul', done => {
    mul(1, 2, result => {
      try {
        expect(result).toBe(2)
        done()
      }
      catch(e){
        done.fail(e)
      }
    })
  })

  test('div', done => {
    div(1, 2, result => {
      try {
        expect(result).toBe(0.5)
        done()
      }
      catch(e){
        done.fail(e)
      }
    }, done.fail)
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
        div(result, 2, result => {
          try {
            expect(result).toBe(7)
            done()  
          }
          catch(e){
            done.fail(e)
          }
        }, done.fail)
      })
    })
  })

  test('sequence with error', done => {
    mul(1, 2, result => {
      add(result, 3, result => {
        div(result, 0, done.fail, error => {
          expect(error).toBe('Division by zero')
          done()
        })
      })
    })
  })

  test('sum', () => {
    // don't even try...
  })

  test('parallel', done => {
    let results = [], count = 0

    const setResult = resultIndex => result => {
      results[resultIndex] = result
      count++
      if(count === 2){
        div(results[0], results[1], result => {
          try {
            expect(result).toBe(2.5)
            done()          
          }
          catch(e){
            done.fail(e)
          }
        }, done.fail) 
      }
    }

    add(2, 3, setResult(0))
    sub(4, 2, setResult(1))
  })

  const addAndMul = (a, b, onSuccess) => {
    add(a, b, r1 => {
      mul(r1, b, r2 => {
        add(r1, r2, onSuccess)
      })
    })
  }

  test('nested', done => 
    addAndMul(2, 3, result => {
      try {
        expect(result).toBe(20) 
        done() 
      }
      catch(e){
        done.fail(e)
      }
    })
  )
})