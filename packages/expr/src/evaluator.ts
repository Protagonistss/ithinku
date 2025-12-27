import type { ASTNode } from './ast'

export interface Context {
  [key: string]: number | Context
}

export class Evaluator {
  private context: Context

  constructor(context: Context = {}) {
    this.context = context
  }

  private resolveValue(obj: Context, path: string[]): number {
    const firstPart = path[0]
    if (!firstPart) {
      throw new Error('Invalid variable name')
    }
    const initial = obj[firstPart]
    if (initial === undefined) {
      throw new Error(`Undefined variable: ${firstPart}`)
    }
    let current: number | Context = initial

    for (let i = 1; i < path.length; i++) {
      const part = path[i]
      if (!part) {
        throw new Error('Invalid variable name')
      }
      if (typeof current === 'number') {
        throw new TypeError(`Cannot access property ${part} of number`)
      }
      const next = current[part]
      if (next === undefined) {
        throw new Error(`Undefined variable: ${path.slice(0, i + 1).join('.')}`)
      }
      current = next
    }

    if (typeof current !== 'number') {
      throw new TypeError(`Expected number but got object at ${path.join('.')}`)
    }
    return current
  }

  // eslint-disable-next-line complexity
  public evaluate(node: ASTNode): number {
    switch (node.type) {
      case 'number': {
        return node.value
      }

      case 'identifier': {
        const parts = node.name.split('.')
        return this.resolveValue(this.context, parts)
      }

      case 'binary': {
        const left = this.evaluate(node.left)
        const right = this.evaluate(node.right)
        const operator = node.operator

        switch (operator) {
          case '+': {
            return left + right
          }
          case '-': {
            return left - right
          }
          case '*': {
            return left * right
          }
          case '/': {
            if (right === 0) throw new Error('Division by zero')
            return left / right
          }
          default: {
            return this.unreachableOperator(operator)
          }
        }
      }

      case 'unary': {
        const value = this.evaluate(node.operand)
        return node.operator === '-' ? -value : value
      }

      default: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        throw new Error(`Unknown node type: ${(node as any).type}`)
      }
    }
  }

  public setVariable(name: string, value: number | Context): void {
    const parts = name.split('.')
    if (parts.length === 0 || !parts[0]) {
      throw new Error('Invalid variable name')
    }
    let current = this.context

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i]
      if (!part) {
        throw new Error('Invalid variable name')
      }
      if (!(part in current) || typeof current[part] === 'number') {
        current[part] = {}
      }
      current = current[part] as Context
    }

    const lastPart = parts.at(-1)
    if (!lastPart) {
      throw new Error('Invalid variable name')
    }
    current[lastPart] = value
  }

  public getVariable(name: string): number {
    return this.resolveValue(this.context, name.split('.'))
  }

  private unreachableOperator(operator: never): never {
    throw new Error(`Unknown operator: ${operator}`)
  }
}
