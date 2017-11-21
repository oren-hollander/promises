import { split, toNumber, chunk, map, reduce, head, tail, flow, defaultTo } from 'lodash/fp'
import { add, sub, mul, div } from '../../operators/sync/operators'
import { flip } from '../../util/util'

const pairs = chunk(2)

const symbols = {
  '+': add,
  '-': sub,
  '*': mul,
  '/': div
}

const parseToken = token => defaultTo(toNumber(token), symbols[token])

const parse = map(parseToken)

const applyFirstOperand = (operand, operator) => operator(operand)

const applySecondOperand = ([operator, operand]) => flip(operator)(operand)

const calculateTerms = terms => reduce(
  applyFirstOperand, 
  head(terms),
  map(applySecondOperand, pairs(tail(terms)))
)

const tokenize = split(' ')

export const calculate = flow(
  tokenize,
  parse,
  calculateTerms
)