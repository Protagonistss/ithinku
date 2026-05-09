import type { ASTNode } from './ast'
import type { Context, ExprValue, ExprFunction } from './evaluator'
import { Evaluator } from './evaluator'
import { Parser } from './parser'

export * from './lexer'
export * from './ast'
export * from './parser'
export * from './evaluator'

export class Expression {
  public static evaluate(
    expression: string,
    context: Context = {},
    functions: Record<string, ExprFunction> = {}
  ): ExprValue {
    const parser = new Parser(expression)
    const evaluator = new Evaluator(context, functions)
    const ast = parser.parse()
    return evaluator.evaluate(ast)
  }

  public static parse(expression: string): ASTNode {
    const parser = new Parser(expression)
    return parser.parse()
  }

  public static compile(
    expression: string,
    functions: Record<string, ExprFunction> = {}
  ): (context?: Context) => ExprValue {
    const ast = this.parse(expression)
    return (context: Context = {}) => {
      const evaluator = new Evaluator(context, functions)
      return evaluator.evaluate(ast)
    }
  }
}
