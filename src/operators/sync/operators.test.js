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
    expect(div(add(2, mul(3, 4)), 2)).toBe(7)
  })

  test('sequence with error', () => {
    expect(() => {
      div(add(mul(1, 2), 3), 0)
    }).toThrow('Division by zero')
  })

  test('sum', () => {
    expect(reduce(add, 0, [1, 2, 3, 4])).toBe(10)
  })

  test('reduce with error', () => {
    expect(() => reduce(div, 1, [1, 0, 3, 4])).toThrow('Division by zero')
  })

  test('parallel', () => {
    expect(div(add(2, 3), sub(4, 2))).toBe(2.5)
  })

  test('nested', () => {
    const addAndMul = (a, b) => {
      const x = add(a, b)
      return add(x, mul(x, b))
    } 
    
    expect(addAndMul(2, 3)).toBe(20)
  })
})