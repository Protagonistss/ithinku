export interface NumberNode {
  type: 'number'
  value: number
}

export interface BooleanNode {
  type: 'boolean'
  value: boolean
}

export interface StringNode {
  type: 'string'
  value: string
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
}

export type UnaryOperator = '+' | '-' | '!'

export interface UnaryOpNode {
  type: 'unary'
  operator: UnaryOperator
  operand: ASTNode
}

export interface IdentifierNode {
  type: 'identifier'
  name: string
}

export interface FunctionCallNode {
  type: 'call'
  name: string
  args: ASTNode[]
}

export interface ConditionalNode {
  type: 'conditional'
  condition: ASTNode
  consequent: ASTNode
  alternate: ASTNode
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

  public static createIdentifier(name: string): IdentifierNode {
    return { type: 'identifier', name }
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
