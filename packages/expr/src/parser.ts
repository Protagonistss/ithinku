import type { ASTNode} from './ast';
import { AST } from './ast'
import type { Token} from './lexer';
import { TokenType, Lexer } from './lexer'

export class Parser {
  private lexer: Lexer
  private currentToken: Token

  constructor(input: string) {
    this.lexer = new Lexer(input)
    this.currentToken = this.lexer.nextToken()
  }

  private eat(tokenType: TokenType): void {
    if (this.currentToken.type === tokenType) {
      this.currentToken = this.lexer.nextToken()
    } else {
      throw new Error(
        `Unexpected token: expected ${tokenType}, got ${this.currentToken.type} at position ${this.currentToken.position}`
      )
    }
  }

  // factor : NUMBER | IDENTIFIER | LPAREN expr RPAREN
  private factor(): ASTNode {
    const token = this.currentToken

    switch (token.type) {
      case TokenType.Number: {
        this.eat(TokenType.Number)
        return AST.createNumber(Number.parseFloat(token.value))
      }

      case TokenType.Identifier: {
        this.eat(TokenType.Identifier)
        return AST.createIdentifier(token.value)
      }

      case TokenType.LeftParen: {
        this.eat(TokenType.LeftParen)
        const node = this.expr()
        this.eat(TokenType.RightParen)
        return node
      }

      default: {
        throw new Error(
          `Unexpected token: ${token.type} at position ${token.position}`
        )
      }
    }
  }

  // term : factor ((MUL | DIV) factor)*
  private term(): ASTNode {
    let node = this.factor()

    while (
      this.currentToken.type === TokenType.Multiply ||
      this.currentToken.type === TokenType.Divide
    ) {
      const token = this.currentToken
      if (token.type === TokenType.Multiply) {
        this.eat(TokenType.Multiply)
        node = AST.createBinaryOp('*', node, this.factor())
      } else if (token.type === TokenType.Divide) {
        this.eat(TokenType.Divide)
        node = AST.createBinaryOp('/', node, this.factor())
      }
    }

    return node
  }

  // expr : term ((PLUS | MINUS) term)*
  private expr(): ASTNode {
    let node = this.term()

    while (
      this.currentToken.type === TokenType.Plus ||
      this.currentToken.type === TokenType.Minus
    ) {
      const token = this.currentToken
      if (token.type === TokenType.Plus) {
        this.eat(TokenType.Plus)
        node = AST.createBinaryOp('+', node, this.term())
      } else if (token.type === TokenType.Minus) {
        this.eat(TokenType.Minus)
        node = AST.createBinaryOp('-', node, this.term())
      }
    }

    return node
  }

  public parse(): ASTNode {
    const node = this.expr()
    if (this.currentToken.type !== TokenType.EOF) {
      throw new Error(
        `Unexpected token: ${this.currentToken.type} at position ${this.currentToken.position}`
      )
    }
    return node
  }
}
