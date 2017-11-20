import { curry, defer } from 'lodash/fp'

export const add = curry((a, b, onSuccess) => defer(onSuccess, a + b))

export const sub = curry((a, b, onSuccess) => defer(onSuccess, a - b))

export const mul = curry((a, b, onSuccess) => defer(onSuccess, a * b))

export const div = curry((a, b, onSuccess, onError) => defer(() => {
  if(b === 0)
    onError('Division by zero')
  else
    onSuccess(a / b)
}))
