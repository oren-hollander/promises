import { split, toNumber, chunk, map, head, tail } from 'lodash/fp'
import { add, sub, mul, div } from '../../operators/promise/operators'
import { reduce, flip } from '../../util/util'

const pairs = chunk(2)

const parseTerm = term => {
  switch(term){
    case '+': 
      return add
    case '-':
      return sub
    case '*':
      return mul
    case '/':
      return div
    default: 
      return toNumber(term)
  }
}

const applySecondOperand = (operand, operator) => operator(operand)

const applyFirstOperand = ([operator, operand]) => flip(operator)(operand)

const calculateTerms = terms => reduce(
  applySecondOperand, 
  head(terms),
  map(applyFirstOperand, pairs(tail(terms)))
)

const splitToTerms = split(' ')

const parseTerms = map(parseTerm)

export const calculate = expression => calculateTerms(parseTerms(splitToTerms(expression)))