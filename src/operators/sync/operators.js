import { curry } from 'lodash/fp'

export const add = curry((a, b) => a + b)

export const sub = curry((a, b) => a - b)

export const mul = curry((a, b) => a * b)

export const div = curry((a, b) => {
  if(b === 0)
    throw 'Division by zero'

  return a / b
})