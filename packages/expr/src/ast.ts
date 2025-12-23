export interface NumberNode {
  type: 'number'
  value: number
}

export interface BinaryOpNode {
  type: 'binary'
  operator: '+' | '-' | '*' | '/'
  left: ASTNode
  right: ASTNode
}

export interface UnaryOpNode {
  type: 'unary'
  operator: '+' | '-'
  operand: ASTNode
}

export interface IdentifierNode {
  type: 'identifier'
  name: string
}

export type ASTNode = NumberNode | BinaryOpNode | UnaryOpNode | IdentifierNode

export class AST {
  public static createNumber(value: number): NumberNode {
    return { type: 'number', value }
  }

  public static createBinaryOp(
    operator: '+' | '-' | '*' | '/',
    left: ASTNode,
    right: ASTNode
  ): BinaryOpNode {
    return { type: 'binary', operator, left, right }
  }

  public static createUnaryOp(
    operator: '+' | '-',
    operand: ASTNode
  ): UnaryOpNode {
    return { type: 'unary', operator, operand }
  }

  public static createIdentifier(name: string): IdentifierNode {
    return { type: 'identifier', name }
  }
}
