import { head, tail, isEmpty, curry } from 'lodash/fp'

export const reduce = (iter, acc, col) => 
  isEmpty(col) 
    ? Promise.resolve(acc) 
    : iter(acc, head(col)).then(result => reduce(iter, result, tail(col)))

export const flip = f => a => b => f(b)(a)
    
export const expectToBe = expected => provided => expect(provided).toBe(expected)
