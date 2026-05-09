import type {
  ASTNode,
  NumberNode,
  BooleanNode,
  StringNode,
  BinaryOpNode,
  UnaryOpNode,
  IdentifierNode,
  FunctionCallNode,
  ConditionalNode
} from './ast'
import type { ASTVisitor } from './visitor'

export type ExprValue = number | boolean | string

export type ExprFunction = (...args: ExprValue[]) => ExprValue

export interface Context {
  [key: string]: ExprValue | Context | ExprFunction
}

export const builtinFunctions: Record<string, ExprFunction> = {
  abs: (x) => Math.abs(x as number),
  ceil: (x) => Math.ceil(x as number),
  floor: (x) => Math.floor(x as number),
  round: (x) => Math.round(x as number),
  sqrt: (x) => {
    if (x as number < 0) throw new Error('Square root of negative number')
    return Math.sqrt(x as number)
  },
  max: (...args) => Math.max(...args.map(Number)),
  min: (...args) => Math.min(...args.map(Number)),
  sin: (x) => Math.sin(x as number),
  cos: (x) => Math.cos(x as number),
  tan: (x) => Math.tan(x as number),
  log: (x) => Math.log(x as number),
  pow: (base, exp) => Math.pow(base as number, exp as number),
  len: (s) => {
    if (typeof s === 'string') return s.length
    throw new TypeError('len() expects a string argument')
  },
  upper: (s) => {
    if (typeof s === 'string') return s.toUpperCase()
    throw new TypeError('upper() expects a string argument')
  },
  lower: (s) => {
    if (typeof s === 'string') return s.toLowerCase()
    throw new TypeError('lower() expects a string argument')
  },
  trim: (s) => {
    if (typeof s === 'string') return s.trim()
    throw new TypeError('trim() expects a string argument')
  }
}

export class Evaluator implements ASTVisitor<ExprValue> {
  public context: Context
  private functions: Record<string, ExprFunction>

  constructor(context: Context = {}, functions: Record<string, ExprFunction> = {}) {
    this.context = context
    this.functions = Object.keys(functions).length > 0
      ? { ...builtinFunctions, ...functions }
      : builtinFunctions
  }

  public static get builtins(): Record<string, ExprFunction> {
    return builtinFunctions
  }

  private resolveValue(obj: Context, path: string[]): ExprValue {
    const firstPart = path[0]
    if (!firstPart) {
      throw new Error('Invalid variable name')
    }
    const initial = obj[firstPart]
    if (initial === undefined) {
      throw new Error(`Undefined variable: ${firstPart}`)
    }
    let current: ExprValue | Context | ExprFunction = initial

    for (let i = 1; i < path.length; i++) {
      const part = path[i]
      if (!part) {
        throw new Error('Invalid variable name')
      }
      if (typeof current === 'number' || typeof current === 'boolean' || typeof current === 'string' || typeof current === 'function') {
        throw new TypeError(`Cannot access property ${part} of ${typeof current}`)
      }
      const next = current[part]
      if (next === undefined) {
        throw new Error(`Undefined variable: ${path.slice(0, i + 1).join('.')}`)
      }
      current = next
    }

    if (typeof current !== 'number' && typeof current !== 'boolean' && typeof current !== 'string') {
      throw new TypeError(`Expected primitive value but got object at ${path.join('.')}`)
    }
    return current
  }

  private toNumber(value: ExprValue): number {
    if (typeof value === 'number') return value
    throw new TypeError(`Expected number but got boolean`)
  }

  private toBoolean(value: ExprValue): boolean {
    if (typeof value === 'boolean') return value
    if (typeof value === 'number') return value !== 0
    return value.length > 0
  }

  public evaluate(node: ASTNode): ExprValue {
    switch (node.type) {
      case 'number': return this.visitNumber(node)
      case 'boolean': return this.visitBoolean(node)
      case 'string': return this.visitString(node)
      case 'binary': return this.visitBinary(node)
      case 'unary': return this.visitUnary(node)
      case 'identifier': return this.visitIdentifier(node)
      case 'call': return this.visitCall(node)
      case 'conditional': return this.visitConditional(node)
    }
  }

  public visitNumber(node: NumberNode): ExprValue {
    return node.value
  }

  public visitBoolean(node: BooleanNode): ExprValue {
    return node.value
  }

  public visitString(node: StringNode): ExprValue {
    return node.value
  }

  public visitIdentifier(node: IdentifierNode): ExprValue {
    return this.resolveValue(this.context, node.path)
  }

  public visitCall(node: FunctionCallNode): ExprValue {
    const fn = this.functions[node.name]
    if (!fn) {
      throw new Error(`Unknown function: ${node.name}`)
    }
    const args = node.args.map((arg) => this.evaluate(arg))
    return fn(...args)
  }

  public visitConditional(node: ConditionalNode): ExprValue {
    const condition = this.evaluate(node.condition)
    return this.toBoolean(condition)
      ? this.evaluate(node.consequent)
      : this.evaluate(node.alternate)
  }

  // eslint-disable-next-line complexity
  public visitBinary(node: BinaryOpNode): ExprValue {
    const operator = node.operator

    // Short-circuit for logical operators
    if (operator === '&&') {
      const left = this.evaluate(node.left)
      return this.toBoolean(left) && this.evaluate(node.right)
    }
    if (operator === '||') {
      const left = this.evaluate(node.left)
      return this.toBoolean(left) || this.evaluate(node.right)
    }

    const left = this.evaluate(node.left)
    const right = this.evaluate(node.right)

    // Comparison operators
    switch (operator) {
      case '<': {
        if (typeof left === 'string' && typeof right === 'string') return left < right
        return this.toNumber(left) < this.toNumber(right)
      }
      case '>': {
        if (typeof left === 'string' && typeof right === 'string') return left > right
        return this.toNumber(left) > this.toNumber(right)
      }
      case '<=': {
        if (typeof left === 'string' && typeof right === 'string') return left <= right
        return this.toNumber(left) <= this.toNumber(right)
      }
      case '>=': {
        if (typeof left === 'string' && typeof right === 'string') return left >= right
        return this.toNumber(left) >= this.toNumber(right)
      }
      case '==': return left === right
      case '!=': return left !== right
      default: break
    }

    // Arithmetic operators - + supports string concatenation
    if (operator === '+' && (typeof left === 'string' || typeof right === 'string')) {
      return String(left) + String(right)
    }

    const leftNum = this.toNumber(left)
    const rightNum = this.toNumber(right)

    switch (operator) {
      case '+': return leftNum + rightNum
      case '-': return leftNum - rightNum
      case '*': return leftNum * rightNum
      case '/': {
        if (rightNum === 0) throw new Error('Division by zero')
        return leftNum / rightNum
      }
      case '%': {
        if (rightNum === 0) throw new Error('Division by zero')
        return leftNum % rightNum
      }
      case '**': return leftNum ** rightNum
      default: {
        return this.unreachableOperator(operator)
      }
    }
  }

  public visitUnary(node: UnaryOpNode): ExprValue {
    const value = this.evaluate(node.operand)
    if (node.operator === '-') return -this.toNumber(value)
    if (node.operator === '+') return this.toNumber(value)
    return !this.toBoolean(value)
  }

  public setVariable(name: string, value: ExprValue | Context): void {
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
      if (!(part in current) || typeof current[part] === 'number' || typeof current[part] === 'boolean' || typeof current[part] === 'string' || typeof current[part] === 'function') {
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

  public getVariable(name: string): ExprValue {
    return this.resolveValue(this.context, name.split('.'))
  }

  private unreachableOperator(operator: never): never {
    throw new Error(`Unknown operator: ${operator}`)
  }
}
