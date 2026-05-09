import { beforeEach, describe, expect, it } from 'vitest'

import { AST } from '../ast'
import { Evaluator } from '../evaluator'

describe('Evaluator', () => {
  let evaluator: Evaluator

  beforeEach(() => {
    evaluator = new Evaluator({
      x: 10,
      y: 5,
      obj: {
        a: 2,
        b: {
          c: 3
        }
      }
    })
  })

  it('should evaluate numbers', () => {
    expect(evaluator.evaluate(AST.createNumber(123))).toBe(123)
  })

  it('should evaluate simple expressions', () => {
    const ast = AST.createBinaryOp(
      '+',
      AST.createNumber(2),
      AST.createNumber(3)
    )
    expect(evaluator.evaluate(ast)).toBe(5)
  })

  it('should evaluate variables', () => {
    expect(evaluator.evaluate(AST.createIdentifier('x'))).toBe(10)
    expect(evaluator.evaluate(AST.createIdentifier('y'))).toBe(5)
  })

  it('should evaluate nested properties', () => {
    expect(evaluator.evaluate(AST.createIdentifier('obj.a'))).toBe(2)
    expect(evaluator.evaluate(AST.createIdentifier('obj.b.c'))).toBe(3)
  })

  it('should evaluate complex expressions', () => {
    const ast = AST.createBinaryOp(
      '*',
      AST.createIdentifier('x'),
      AST.createBinaryOp('+', AST.createIdentifier('y'), AST.createNumber(2))
    )
    expect(evaluator.evaluate(ast)).toBe(70) // 10 * (5 + 2)
  })

  it('should evaluate unary operators', () => {
    const ast = AST.createBinaryOp(
      '+',
      AST.createUnaryOp('-', AST.createIdentifier('x')),
      AST.createUnaryOp('+', AST.createNumber(2))
    )
    expect(evaluator.evaluate(ast)).toBe(-8)
  })

  it('should handle division by zero', () => {
    const ast = AST.createBinaryOp(
      '/',
      AST.createNumber(1),
      AST.createNumber(0)
    )
    expect(() => evaluator.evaluate(ast)).toThrow('Division by zero')
  })

  it('should throw error for undefined variables', () => {
    expect(() => evaluator.evaluate(AST.createIdentifier('z'))).toThrow(
      'Undefined variable: z'
    )
  })

  it('should throw error for invalid nested properties', () => {
    expect(() => evaluator.evaluate(AST.createIdentifier('obj.d'))).toThrow(
      'Undefined variable: obj.d'
    )
    expect(() => evaluator.evaluate(AST.createIdentifier('x.y'))).toThrow(
      'Cannot access property y of number'
    )
  })

  it('should set and get variables', () => {
    evaluator.setVariable('z', 15)
    expect(evaluator.getVariable('z')).toBe(15)

    evaluator.setVariable('nested.value', 20)
    expect(evaluator.getVariable('nested.value')).toBe(20)
  })

  it('should evaluate modulo operator', () => {
    const ast = AST.createBinaryOp(
      '%',
      AST.createNumber(10),
      AST.createNumber(3)
    )
    expect(evaluator.evaluate(ast)).toBe(1)
  })

  it('should evaluate power operator', () => {
    const ast = AST.createBinaryOp(
      '**',
      AST.createNumber(2),
      AST.createNumber(3)
    )
    expect(evaluator.evaluate(ast)).toBe(8)
  })

  it('should evaluate comparison operators', () => {
    expect(evaluator.evaluate(AST.createBinaryOp('>', AST.createNumber(3), AST.createNumber(2)))).toBe(true)
    expect(evaluator.evaluate(AST.createBinaryOp('<', AST.createNumber(3), AST.createNumber(2)))).toBe(false)
    expect(evaluator.evaluate(AST.createBinaryOp('==', AST.createNumber(3), AST.createNumber(3)))).toBe(true)
    expect(evaluator.evaluate(AST.createBinaryOp('!=', AST.createNumber(3), AST.createNumber(2)))).toBe(true)
  })

  it('should evaluate logical operators', () => {
    expect(
      evaluator.evaluate(
        AST.createBinaryOp('&&', AST.createBoolean(true), AST.createBoolean(true))
      )
    ).toBe(true)
    expect(
      evaluator.evaluate(
        AST.createBinaryOp('||', AST.createBoolean(false), AST.createBoolean(true))
      )
    ).toBe(true)
  })

  it('should evaluate not operator', () => {
    expect(evaluator.evaluate(AST.createUnaryOp('!', AST.createBoolean(true)))).toBe(false)
    expect(evaluator.evaluate(AST.createUnaryOp('!', AST.createBoolean(false)))).toBe(true)
  })

  it('should evaluate string nodes', () => {
    expect(evaluator.evaluate(AST.createString('hello'))).toBe('hello')
  })

  it('should evaluate string concatenation', () => {
    const ast = AST.createBinaryOp('+', AST.createString('hello '), AST.createString('world'))
    expect(evaluator.evaluate(ast)).toBe('hello world')
  })

  it('should evaluate conditional node', () => {
    const ast = AST.createConditional(
      AST.createBoolean(true),
      AST.createNumber(1),
      AST.createNumber(2)
    )
    expect(evaluator.evaluate(ast)).toBe(1)
  })

  it('should evaluate conditional node with false condition', () => {
    const ast = AST.createConditional(
      AST.createBoolean(false),
      AST.createNumber(1),
      AST.createNumber(2)
    )
    expect(evaluator.evaluate(ast)).toBe(2)
  })
})
