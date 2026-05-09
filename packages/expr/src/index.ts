import type { ASTNode } from './ast'
import type { Context, ExprValue, ExprFunction } from './evaluator'
import { Evaluator, builtinFunctions } from './evaluator'
import { Parser } from './parser'

export * from './lexer'
export * from './ast'
export * from './parser'
export * from './evaluator'
export * from './visitor'

function compileASTToJS(node: ASTNode): string {
  switch (node.type) {
    case 'number':
      return String(node.value)
    case 'boolean':
      return String(node.value)
    case 'string':
      return JSON.stringify(node.value)
    case 'identifier':
      return node.path.reduce((acc, key) => `${acc}[${JSON.stringify(key)}]`, 'ctx')
    case 'unary': {
      const operand = compileASTToJS(node.operand)
      if (node.operator === '!') return `(!(${operand}))`
      return `(${node.operator}(${operand}))`
    }
    case 'binary': {
      const left = compileASTToJS(node.left)
      const right = compileASTToJS(node.right)
      const op = node.operator
      // String concatenation check for +
      if (op === '+') {
        return `(typeof (${left})==="string"||typeof (${right})==="string"?String(${left})+String(${right}):(${left})+(${right}))`
      }
      // Division by zero check
      if (op === '/' || op === '%') {
        return `((${right})===0?_throw("Division by zero"):(${left})${op}(${right}))`
      }
      return `((${left})${op}(${right}))`
    }
    case 'call': {
      const args = node.args.map(compileASTToJS).join(',')
      const fnAccess = `_fn[${JSON.stringify(node.name)}]`
      return `${fnAccess}(${args})`
    }
    case 'conditional':
      return `((${compileASTToJS(node.condition)})?(${compileASTToJS(node.consequent)}):(${compileASTToJS(node.alternate)}))`
  }
}

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
    const evaluator = new Evaluator({}, functions)
    return (context: Context = {}) => {
      evaluator.context = context
      return evaluator.evaluate(ast)
    }
  }

  public static compileToFunction(
    expression: string,
    functions: Record<string, ExprFunction> = {}
  ): (context?: Context) => ExprValue {
    const ast = this.parse(expression)
    const jsCode = compileASTToJS(ast)
    const fn = new Function('ctx', '_fn', '_throw', `"use strict";return ${jsCode};`) as
      (ctx: Context, fn: Record<string, ExprFunction>, throwFn: (msg: string) => never) => ExprValue

    // Merge functions with builtins
    const allFns = Object.keys(functions).length > 0
      ? { ...builtinFunctions, ...functions }
      : builtinFunctions

    const throwFn = (msg: string): never => { throw new Error(msg) }

    return (context: Context = {}) => fn(context, allFns, throwFn)
  }
}
