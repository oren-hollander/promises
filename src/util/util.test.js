import { reduce, flip } from './util'
import { add } from '../operators/promise/operators'
import { div } from '../operators/sync/operators'

test('reduce', done => {
  reduce(add, 0, [1, 2, 3, 4])
    .then(result => {
      expect(result).toBe(10)
    })
    .then(done)
    .catch(done.fail)
})

test('flip', () => {
  const flippedDiv = flip(div)
  expect(div(4)(2)).toBe(flippedDiv(2)(4))
})