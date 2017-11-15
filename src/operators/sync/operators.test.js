import { reduce } from 'lodash/fp'
import { add, sub, mul, div } from './operators'

describe('operators', () => {
  test('add', () => {
    expect(add(1, 2)).toBe(3)
  })

  test('sub', () => {
    expect(sub(1, 2)).toBe(-1)
  })

  test('mul', () => {
    expect(mul(1, 2)).toBe(2)
  })

  test('div', () => {
    expect(div(1, 2)).toBe(0.5)
  })

  test('division by zero', () => {
    expect(() => {
      div(2, 0)
    }).toThrow('Division by zero')
  })

  test('chain', () => {
    expect(add(2, mul(3, 4))).toBe(14)
  })

  test('chain with error', () => {
    expect(() => {
      add(2, div(3, mul(2, 0)))
    }).toThrow('Division by zero')
  })

  test('sum', () => {
    expect(reduce(add, 0, [1, 2, 3, 4])).toBe(10)
  })
})