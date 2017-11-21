import { head, tail, isEmpty, curry } from 'lodash/fp'

export const reduceSync = (iter, acc, col) => 
  isEmpty(col) 
    ? acc
    : reduceSync(iter, iter(acc, head(col)), tail(col))

export const reduce = async (iter, acc, col) => 
  isEmpty(col) 
    ? acc
    : reduce(iter, await iter(acc, head(col)), tail(col))

export const reduceCB = (iter, acc, col, onSuccess, onError) => {
  if(isEmpty(col)){
    onSuccess(acc)
  }
  else {
    iter(acc, head(col), result => {
      reduceCB(iter, result, tail(col), onSuccess, onError)
    }, onError)
  }
}

export const flip = f => a => b => f(b)(a)
    
export const expectToBe = expected => provided => expect(provided).toBe(expected)

export const fail = message => () => {
  throw message
}