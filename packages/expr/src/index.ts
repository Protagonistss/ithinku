import { Evaluator, Context } from './evaluator'
import { Parser } from './parser'

export * from './lexer'
export * from './ast'
export * from './parser'
export * from './evaluator'

export class Expression {
  private static parser: Parser
  private static evaluator: Evaluator

  public static evaluate(expression: string, context: Context = {}): number {
    this.parser = new Parser(expression)
    this.evaluator = new Evaluator(context)
    const ast = this.parser.parse()
    return this.evaluator.evaluate(ast)
  }
}

// Example usage:
// const result = Expression.evaluate('2 * (3 + 4)', { x: 10 }); // Returns 14
const result2 = Expression.evaluate('x * 2', { x: 10 }) // Returns 20
console.log(result2)
const result3 = Expression.evaluate('d.f.g * 2', {
  x: 10,
  d: { c: 1, f: { g: 2 } }
}) // Returns 2
console.log(result3)
