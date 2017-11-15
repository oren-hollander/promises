import { curry } from 'lodash/fp'

export const add = curry(async (a, b) => a + b)

export const sub = curry(async (a, b) => a - b)

export const mul = curry(async (a, b) => a * b)

export const div = curry(async (a, b) => {
  if(b === 0)
    throw 'Division by zero'

  return a / b
})