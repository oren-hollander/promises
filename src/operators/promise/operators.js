import { curry } from 'lodash/fp'

export const add = curry((a, b) => Promise.resolve(a + b))

export const sub = curry((a, b) => Promise.resolve(a - b))

export const mul = curry((a, b) => Promise.resolve(a * b))

export const div = curry((a, b) => new Promise((resolve, reject) => {
  if(b === 0)
    reject('Division by zero')

  resolve(a / b)
}))