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
})
