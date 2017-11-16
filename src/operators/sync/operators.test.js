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

  test('sequence', () => {
    expect(add(2, mul(3, 4))).toBe(14)
  })

  test('sequence with error', () => {
    expect(() => {
      add(2, div(3, mul(2, 0)))
    }).toThrow('Division by zero')
  })

  test('sum', () => {
    expect(reduce(add, 0, [1, 2, 3, 4])).toBe(10)
  })

  test('reduce with error', () => {
    expect(() => reduce(div, 1, [1, 0, 3, 4])).toThrow('Division by zero')
  })

  test('parallel', () => {
    expect(mul(add(2, 3), add(4, 5))).toBe(45)
  })

  test('nested', () => {
    const addAndMul = (a, b) => mul(a, add(a, b))
    expect(addAndMul(3, 5)).toBe(24)
  })
})