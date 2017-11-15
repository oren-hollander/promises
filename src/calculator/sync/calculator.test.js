import { calculate } from './calculator'

describe('calculator', () => {
  test('expression', () => expect(calculate('2 + 4 * 5 / 3')).toBe(10))

  test('expression with zero division', () => expect(() => calculate('2 / 0 + 4 * 5 / 3')).toThrow('Division by zero'))
})