import { reduce, reduceCB, reduceSync, flip, expectToBe } from './util'
import { add } from '../operators/promise/operators'
import { add as addCB } from '../operators/callbacks/operators'
import { add as addSync } from '../operators/sync/operators'
import { div } from '../operators/sync/operators'

test('reduce', () => 
  reduce(addSync, 0, [1, 2, 3, 4])
    .then(expectToBe(10))    
)

test('reduce sync', () => 
  expect(reduceSync(addSync, 0, [1, 2, 3, 4])).toBe(10)
)

test('reduce callbacks', done => {  
  reduceCB(addCB, 0, [1, 2, 3, 4], result => {
    try {
      expect(result).toBe(10)
      done() 
    }
    catch(e){
      done.fail(e) 
    }
  }, done.fail)
})

test('flip', () => {
  const flippedDiv = flip(div)
  expect(div(4)(2)).toBe(flippedDiv(2)(4))
})