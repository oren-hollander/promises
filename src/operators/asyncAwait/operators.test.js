import { add, sub, mul, div } from './operators'
import { flip, reduce, expectToBe, fail } from '../../util/util'
import { spread } from 'lodash/fp'

describe('async operators', () => {
  test('add', async () => expect(await add(1, 2)).toBe(3))

  test('sub', async () => expect(await sub(1, 2)).toBe(-1))

  test('mul', async () => expect(await mul(1, 2)).toBe(2))

  test('div', async () => expect(await div(1, 2)).toBe(0.5))

  test('division by zero', async () => {
    try {
      await div(1, 0)
      throw 'Should not succeed'
    }
    catch(e) {
      expect(e).toBe('Division by zero')
    }
  })

  test('sequence', async () => expect(await div(await add(2, await mul(3, 4)), 2)).toBe(7))

  test('sequence with error', async () => {
    try {
      await div(await add(3, await mul(1, 2)), 0) 
      throw 'Should not succeed'
    }
    catch(e) {
      expect(e).toBe('Division by zero')
    }
  })

  test('sum', async () => 
    expect(await reduce(add, 0, [1, 2, 3, 4])).toBe(10)
  )

  test('reduce with error', async () => {
    try {
      await reduce(div, 1, [1, 0, 3, 4])      
      throw 'Should not succeed'
    }
    catch(e){
      expect(e).toBe('Division by zero')
    }
  })

  test('parallel', async () => {    
    const [a, b] = await Promise.all([
      add(2, 3),
      sub(4, 2)
    ])
    expect(await div(a, b)).toBe(2.5)
  })

  test('parallel alternative 1', async () => {
    const a = await add(2, 3)
    const b = await sub(4, 2)

    expect(await div(a, b)).toBe(2.5)
  })

  test('parallel alternative 2', async () => {
    const a = add(2, 3)
    const b = sub(4, 2)

    expect(await div(await a, await b)).toBe(2.5)
  })

  test('nested', async () => {
    const addAndMul = async (a, b) => {
      const r1 = await add(a, b)
      const r2 = await mul(r1, b)
      return add(r1, r2)
    }

    expect(await addAndMul(2, 3)).toBe(20)
  })
})