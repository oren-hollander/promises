import { split, toNumber, chunk, map, head, tail, flow } from 'lodash/fp'
import { add, sub, mul, div } from '../../operators/promise/operators'
import { reduce, flip } from '../../util/util'

const pairs = chunk(2)

const parseToken = token => {
  switch(token){
    case '+': 
      return add
    case '-':
      return sub
    case '*':
      return mul
    case '/':
      return div
    default: 
      return toNumber(token)
  }
}

const parse = map(parseToken)

const applySecondOperand = (operand, operator) => operator(operand)

const applyFirstOperand = ([operator, operand]) => flip(operator)(operand)

const calculateTerms = terms => reduce(
  applySecondOperand, 
  head(terms),
  map(applyFirstOperand, pairs(tail(terms)))
)

const tokenize = split(' ')

export const calculate = flow(
  tokenize,
  parse,
  calculateTerms
)