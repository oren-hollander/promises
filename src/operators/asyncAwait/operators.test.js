import { add, sub, mul, div } from './operators'
import { flip, reduce, expectToBe } from '../../util/util'

describe('async operators', () => {
  test('add', async () => expect(await add(1, 2)).toBe(3))

  test('sub', async () => expect(await sub(1, 2)).toBe(-1))

  test('mul', async () => expect(await mul(1, 2)).toBe(2))

  test('div', async () => expect(await div(1, 2)).toBe(0.5))

  test('division by zero', async () => {
    try {
      await div(1, 0)
    }
    catch(e) {
      expect(e).toBe('Division by zero')
    }
  })

  test('chain', async () => expect(await div(await add(2, await mul(3, 4)), 2)).toBe(7))

  test('chain with error', async () => {
    try {
      await div(await add(2, await mul(3, 4)), 0) 
    }
    catch(e) {
      expect(e).toBe('Division by zero')
    }
  })
})