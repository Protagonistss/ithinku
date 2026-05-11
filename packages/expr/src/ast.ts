/**
 * Source location information for a node in the original input.
 */
export interface SourceLocation {
  /** Start position in the input string */
  start: number
  /** End position in the input string */
  end: number
}

export interface NumberNode {
  type: 'number'
  value: number
  /** Optional source location for error reporting */
  loc?: SourceLocation
}

export interface BooleanNode {
  type: 'boolean'
  value: boolean
  loc?: SourceLocation
}

export interface StringNode {
  type: 'string'
  value: string
  loc?: SourceLocation
}

export type ComparisonOperator = '<' | '>' | '<=' | '>=' | '==' | '!='
export type LogicalOperator = '&&' | '||'
export type ArithmeticOperator = '+' | '-' | '*' | '/' | '%' | '**'
export type BinaryOperator = ArithmeticOperator | ComparisonOperator | LogicalOperator

export interface BinaryOpNode {
  type: 'binary'
  operator: BinaryOperator
  left: ASTNode
  right: ASTNode
  loc?: SourceLocation
}

export type UnaryOperator = '+' | '-' | '!'

export interface UnaryOpNode {
  type: 'unary'
  operator: UnaryOperator
  operand: ASTNode
  loc?: SourceLocation
}

export interface IdentifierNode {
  type: 'identifier'
  path: string[]
  loc?: SourceLocation
}

export interface FunctionCallNode {
  type: 'call'
  name: string
  args: ASTNode[]
  loc?: SourceLocation
}

export interface ConditionalNode {
  type: 'conditional'
  condition: ASTNode
  consequent: ASTNode
  alternate: ASTNode
  loc?: SourceLocation
}

export type ASTNode =
  | NumberNode
  | BooleanNode
  | StringNode
  | BinaryOpNode
  | UnaryOpNode
  | IdentifierNode
  | FunctionCallNode
  | ConditionalNode

export class AST {
  /**
   * Get a string representation of an AST node for debugging.
   */
  public static stringify(node: ASTNode, indent = 0): string {
    const spaces = '  '.repeat(indent)
    switch (node.type) {
      case 'number':
        return `${spaces}Number(${node.value})`
      case 'boolean':
        return `${spaces}Boolean(${node.value})`
      case 'string':
        return `${spaces}String("${node.value}")`
      case 'binary':
        return `${spaces}Binary(${node.operator}\n${this.stringify(node.left, indent + 1)}\n${this.stringify(node.right, indent + 1)}\n${spaces})`
      case 'unary':
        return `${spaces}Unary(${node.operator}\n${this.stringify(node.operand, indent + 1)}\n${spaces})`
      case 'identifier':
        return `${spaces}Identifier(${node.path.join('.')})`
      case 'call':
        return `${spaces}Call(${node.name} [${node.args.map(() => '_').join(', ')}]`
      case 'conditional':
        return `${spaces}Conditional(\n  if:\n${this.stringify(node.condition, indent + 2)}\n  then:\n${this.stringify(node.consequent, indent + 2)}\n  else:\n${this.stringify(node.alternate, indent + 2)}\n${spaces})`
    }
  }

  public static createNumber(value: number): NumberNode {
    return { type: 'number', value }
  }

  public static createBoolean(value: boolean): BooleanNode {
    return { type: 'boolean', value }
  }

  public static createString(value: string): StringNode {
    return { type: 'string', value }
  }

  public static createBinaryOp(
    operator: BinaryOperator,
    left: ASTNode,
    right: ASTNode
  ): BinaryOpNode {
    return { type: 'binary', operator, left, right }
  }

  public static createUnaryOp(
    operator: UnaryOperator,
    operand: ASTNode
  ): UnaryOpNode {
    return { type: 'unary', operator, operand }
  }

  public static createIdentifier(path: string[]): IdentifierNode {
    return { type: 'identifier', path }
  }

  public static createFunctionCall(name: string, args: ASTNode[]): FunctionCallNode {
    return { type: 'call', name, args }
  }

  public static createConditional(
    condition: ASTNode,
    consequent: ASTNode,
    alternate: ASTNode
  ): ConditionalNode {
    return { type: 'conditional', condition, consequent, alternate }
  }
}
