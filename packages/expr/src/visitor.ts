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

export interface ASTVisitor<T> {
  visitNumber(node: NumberNode): T
  visitBoolean(node: BooleanNode): T
  visitString(node: StringNode): T
  visitBinary(node: BinaryOpNode): T
  visitUnary(node: UnaryOpNode): T
  visitIdentifier(node: IdentifierNode): T
  visitCall(node: FunctionCallNode): T
  visitConditional(node: ConditionalNode): T
}

export function walk<T>(node: ASTNode, visitor: ASTVisitor<T>): T {
  switch (node.type) {
    case 'number':
      return visitor.visitNumber(node)
    case 'boolean':
      return visitor.visitBoolean(node)
    case 'string':
      return visitor.visitString(node)
    case 'binary':
      return visitor.visitBinary(node)
    case 'unary':
      return visitor.visitUnary(node)
    case 'identifier':
      return visitor.visitIdentifier(node)
    case 'call':
      return visitor.visitCall(node)
    case 'conditional':
      return visitor.visitConditional(node)
  }
}
