import { calculate } from './calculator'
import { add, sub, mul, div } from '../../operators/sync/operators'
import { add as addA, sub as subA, mul as mulA, div as divA } from '../../operators/asyncAwait/operators'
import { expectToBe } from '../../util/util'
import { reduce, spread, curry } from 'lodash/fp'

const promisifyArgs = f => curry(async (a, b) => f(await a, await b))
const addAA = promisifyArgs(addA)
const subAA = promisifyArgs(subA)
const mulAA = promisifyArgs(mulA)
const divAA = promisifyArgs(divA)

describe('calculator', () => {
  test('expression', () => expect(calculate(add, sub, mul, div)('2 + 4 * 5 / 3')).toBe(10))

  test('async calculate with sync reduce', () => calculate(addAA, subAA, mulAA, divAA)('2 + 4 * 5 / 3').then(r => expect(r).toBe(10)))
  
  test('expression with zero division', () => expect(() => calculate(add, sub, mul, div)('2 / 0 + 4 * 5 / 3')).toThrow('Division by zero'))

  test('reduce', () => reduce(addAA, 0, [1, 2, 3, 4]).then(expectToBe(10)))
})