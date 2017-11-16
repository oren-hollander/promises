import { head, tail, isEmpty, curry } from 'lodash/fp'

export const reduce = async (iter, acc, col) => 
  isEmpty(col) 
    ? acc
    : reduce(iter, await iter(acc, head(col)), tail(col))

export const flip = f => a => b => f(b)(a)
    
export const expectToBe = expected => provided => expect(provided).toBe(expected)
