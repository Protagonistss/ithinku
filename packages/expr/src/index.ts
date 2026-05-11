import type { ASTNode } from './ast'
import type { Context, ExprValue, ExprFunction } from './evaluator'
import { Evaluator, builtinFunctions } from './evaluator'
import { Parser } from './parser'
import { LRUCache } from './cache'

export * from './lexer'
export * from './ast'
export * from './parser'
export * from './evaluator'
export * from './visitor'
export * from './errors'
export * from './cache'
export type { SourceLocation } from './ast'
export type { EvaluatorOptions } from './evaluator'

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

/**
 * Expression parsing and evaluation engine.
 *
 * Supports arithmetic, comparison, and logical operations,
 * function calls, conditional expressions, and variable access.
 *
 * @example
 * ```ts
 * // Simple evaluation
 * Expression.evaluate('2 + 3') // returns 5
 *
 * // With context variables
 * Expression.evaluate('x * 2', { x: 5 }) // returns 10
 *
 * // Compile for repeated execution
 * const fn = Expression.compile('a + b')
 * fn({ a: 1, b: 2 }) // returns 3
 * fn({ a: 3, b: 4 }) // returns 7
 * ```
 */
export class Expression {
  private static astCache = new LRUCache<string, ASTNode>(128)

  /**
   * Configure the AST parse cache.
   *
   * @param options - Cache configuration options
   *
   * @example
   * ```ts
   * // Disable caching
   * Expression.configureCache({ enabled: false })
   *
   * // Set custom cache size
   * Expression.configureCache({ maxSize: 512 })
   * ```
   */
  public static configureCache(options: {
    /** Maximum number of cached ASTs (default: 128) */
    maxSize?: number
    /** Whether caching is enabled (default: true) */
    enabled?: boolean
  }): void {
    if (options.enabled === false) {
      this.astCache.clear()
    }
    if (options.maxSize !== undefined) {
      this.astCache = new LRUCache(options.maxSize)
    }
  }

  /**
   * Evaluates an expression string with the given context and functions.
   *
   * @param expression - The expression string to evaluate
   * @param context - Variables available to the expression
   * @param functions - Custom functions to add to built-ins
   * @returns The evaluated result (number, boolean, or string)
   * @throws {ParserError} If the expression syntax is invalid
   * @throws {EvaluationError} If evaluation fails (undefined variable, division by zero, etc.)
   *
   * @example
   * ```ts
   * Expression.evaluate('max(a, b) * 2', { a: 5, b: 3 })
   * // returns 10
   *
   * Expression.evaluate('upper(name)', { name: 'hello' })
   * // returns 'HELLO'
   * ```
   */
  public static evaluate(
    expression: string,
    context: Context = {},
    functions: Record<string, ExprFunction> = {}
  ): ExprValue {
    const ast = this.parse(expression)
    const evaluator = new Evaluator(context, functions)
    return evaluator.evaluate(ast)
  }

  /**
   * Parses an expression string into an AST.
   * Results are cached for performance.
   *
   * @param expression - The expression string to parse
   * @returns The parsed AST node
   * @throws {ParserError} If the expression syntax is invalid
   */
  public static parse(expression: string): ASTNode {
    let ast = this.astCache.get(expression)
    if (ast) return ast

    const parser = new Parser(expression)
    ast = parser.parse()
    this.astCache.set(expression, ast)
    return ast
  }

  /**
   * Compiles an expression into a reusable function.
   * The returned function can be called multiple times with different contexts.
   *
   * @param expression - The expression string to compile
   * @param functions - Custom functions to add to built-ins
   * @returns A function that takes a context and returns the evaluated result
   *
   * @example
   * ```ts
   * const fn = Expression.compile('price * quantity')
   * fn({ price: 10, quantity: 2 }) // returns 20
   * fn({ price: 5, quantity: 3 }) // returns 15
   * ```
   */
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

  /**
   * Compiles an expression into a native JavaScript function.
   * This is the fastest execution mode for repeated evaluations.
   *
   * @param expression - The expression string to compile
   * @param functions - Custom functions to add to built-ins
   * @returns A native JavaScript function that takes a context and returns the evaluated result
   *
   * @example
   * ```ts
   * const fn = Expression.compileToFunction('a + b * c')
   * fn({ a: 1, b: 2, c: 3 }) // returns 7
   * ```
   */
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
