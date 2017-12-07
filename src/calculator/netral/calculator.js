import { split, toNumber, chunk, map, reduce, head, tail, flow, defaultTo } from 'lodash/fp'
import { flip } from '../../util/util'

const pairs = chunk(2)

const symbols = (add, sub, mul, div) => ({
  '+': add,
  '-': sub,
  '*': mul,
  '/': div
})

const parseToken = (add, sub, mul, div) => token => defaultTo(toNumber(token), symbols(add, sub, mul, div)[token])

const parse = (add, sub, mul, div) => map(parseToken(add, sub, mul, div))

const applyFirstOperand = (operand, operator) => operator(operand)

const applySecondOperand = ([operator, operand]) => { 
  return flip(operator)(operand) 
}

const calculateTerms = terms => reduce(
  applyFirstOperand, 
  head(terms),
  map(applySecondOperand, pairs(tail(terms)))
)

const tokenize = split(' ')

export const calculate = (add, sub, mul, div) => flow(
  tokenize,
  parse(add, sub, mul, div),
  calculateTerms
) 