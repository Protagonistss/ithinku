import type { Context } from './evaluator'
import type { ASTNode } from './ast'
import { Evaluator } from './evaluator'
import { Parser } from './parser'

export * from './lexer'
export * from './ast'
export * from './parser'
export * from './evaluator'

export class Expression {
  public static evaluate(expression: string, context: Context = {}): number {
    const parser = new Parser(expression)
    const evaluator = new Evaluator(context)
    const ast = parser.parse()
    return evaluator.evaluate(ast)
  }

  public static parse(expression: string): ASTNode {
    const parser = new Parser(expression)
    return parser.parse()
  }

  public static compile(expression: string): (context?: Context) => number {
    const ast = this.parse(expression)
    return (context: Context = {}) => {
      const evaluator = new Evaluator(context)
      return evaluator.evaluate(ast)
    }
  }
}
