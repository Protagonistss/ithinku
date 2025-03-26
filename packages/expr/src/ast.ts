export interface NumberNode {
  type: 'number';
  value: number;
}

export interface BinaryOpNode {
  type: 'binary';
  operator: '+' | '-' | '*' | '/';
  left: ASTNode;
  right: ASTNode;
}

export interface IdentifierNode {
  type: 'identifier';
  name: string;
}

export type ASTNode = NumberNode | BinaryOpNode | IdentifierNode;

export class AST {
  public static createNumber(value: number): NumberNode {
    return { type: 'number', value };
  }

  public static createBinaryOp(operator: '+' | '-' | '*' | '/', left: ASTNode, right: ASTNode): BinaryOpNode {
    return { type: 'binary', operator, left, right };
  }

  public static createIdentifier(name: string): IdentifierNode {
    return { type: 'identifier', name };
  }
} 