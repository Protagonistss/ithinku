import type { ASTNode, ComparisonOperator } from './ast'
import { AST } from './ast'
import type { Token } from './lexer'
import { TokenType, Lexer } from './lexer'
import { ParserError } from './errors'

export class Parser {
  private lexer: Lexer
  private currentToken: Token
  private input: string

  constructor(input: string) {
    this.input = input
    this.lexer = new Lexer(input)
    this.currentToken = this.lexer.nextToken()
  }

  private tokenName(tokenType: TokenType): string {
    const nameMap: Record<TokenType, string> = {
      [TokenType.Number]: 'number',
      [TokenType.String]: 'string',
      [TokenType.Plus]: '+',
      [TokenType.Minus]: '-',
      [TokenType.Multiply]: '*',
      [TokenType.Divide]: '/',
      [TokenType.Modulo]: '%',
      [TokenType.Power]: '**',
      [TokenType.Less]: '<',
      [TokenType.Greater]: '>',
      [TokenType.LessEqual]: '<=',
      [TokenType.GreaterEqual]: '>=',
      [TokenType.Equal]: '==',
      [TokenType.NotEqual]: '!=',
      [TokenType.And]: '&&',
      [TokenType.Or]: '||',
      [TokenType.Not]: '!',
      [TokenType.Comma]: ',',
      [TokenType.Question]: '?',
      [TokenType.Colon]: ':',
      [TokenType.LeftParen]: '(',
      [TokenType.RightParen]: ')',
      [TokenType.Identifier]: 'identifier',
      [TokenType.Dot]: '.',
      [TokenType.EOF]: 'end of input'
    }
    return nameMap[tokenType] || tokenType
  }

  private eat(tokenType: TokenType): void {
    if (this.currentToken.type === tokenType) {
      this.currentToken = this.lexer.nextToken()
    } else {
      throw new ParserError(
        `Expected ${this.tokenName(tokenType)} but found ${this.tokenName(this.currentToken.type)}`,
        this.currentToken.position,
        this.input
      )
    }
  }

  // primary : NUMBER | IDENTIFIER | IDENTIFIER LPAREN (expr (COMMA expr)*)? RPAREN | LPAREN expr RPAREN
  private primary(): ASTNode {
    const token = this.currentToken

    switch (token.type) {
      case TokenType.Number: {
        this.eat(TokenType.Number)
        return AST.createNumber(Number.parseFloat(token.value))
      }

      case TokenType.String: {
        this.eat(TokenType.String)
        return AST.createString(token.value)
      }

      case TokenType.Identifier: {
        const name = this.currentToken.value
        this.eat(TokenType.Identifier)

        // Check if this is a function call: identifier followed by (
        if (this.currentToken.type === TokenType.LeftParen) {
          return this.parseFunctionCall(name)
        }

        // Variable reference, possibly with dot access
        const path = [name]
        while (this.currentToken.type === TokenType.Dot) {
          this.eat(TokenType.Dot)
          const nextToken: Token = this.currentToken
          if (nextToken.type !== TokenType.Identifier) {
            throw new ParserError(
              `Expected ${this.tokenName(TokenType.Identifier)} but found ${this.tokenName(nextToken.type)}`,
              nextToken.position,
              this.input
            )
          }
          path.push(nextToken.value)
          this.eat(TokenType.Identifier)
        }

        return AST.createIdentifier(path)
      }

      case TokenType.LeftParen: {
        this.eat(TokenType.LeftParen)
        const node = this.or()
        this.eat(TokenType.RightParen)
        return node
      }

      default: {
        throw new ParserError(
          `Unexpected token: ${this.tokenName(token.type)}`,
          token.position,
          this.input
        )
      }
    }
  }

  private parseFunctionCall(name: string): ASTNode {
    this.eat(TokenType.LeftParen)
    const args: ASTNode[] = []

    if (this.currentToken.type !== TokenType.RightParen) {
      args.push(this.or())
      while (this.currentToken.type === TokenType.Comma) {
        this.eat(TokenType.Comma)
        args.push(this.or())
      }
    }

    this.eat(TokenType.RightParen)
    return AST.createFunctionCall(name, args)
  }

  // power : primary (POWER power)?  (right-associative)
  private power(): ASTNode {
    const node = this.primary()
    if (this.currentToken.type === TokenType.Power) {
      this.eat(TokenType.Power)
      return AST.createBinaryOp('**', node, this.power())
    }
    return node
  }

  // factor : (PLUS | MINUS | NOT) factor | power
  private factor(): ASTNode {
    if (this.currentToken.type === TokenType.Plus) {
      this.eat(TokenType.Plus)
      return AST.createUnaryOp('+', this.factor())
    }
    if (this.currentToken.type === TokenType.Minus) {
      this.eat(TokenType.Minus)
      return AST.createUnaryOp('-', this.factor())
    }
    if (this.currentToken.type === TokenType.Not) {
      this.eat(TokenType.Not)
      return AST.createUnaryOp('!', this.factor())
    }
    return this.power()
  }

  // term : factor ((MUL | DIV | MODULO) factor)*
  private term(): ASTNode {
    let node = this.factor()

    while (
      this.currentToken.type === TokenType.Multiply ||
      this.currentToken.type === TokenType.Divide ||
      this.currentToken.type === TokenType.Modulo
    ) {
      const token = this.currentToken
      if (token.type === TokenType.Multiply) {
        this.eat(TokenType.Multiply)
        node = AST.createBinaryOp('*', node, this.factor())
      } else if (token.type === TokenType.Divide) {
        this.eat(TokenType.Divide)
        node = AST.createBinaryOp('/', node, this.factor())
      } else if (token.type === TokenType.Modulo) {
        this.eat(TokenType.Modulo)
        node = AST.createBinaryOp('%', node, this.factor())
      }
    }

    return node
  }

  // additive : term ((PLUS | MINUS) term)*
  private additive(): ASTNode {
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

  // comparison : additive ((< | > | <= | >= | == | !=) additive)*
  private comparison(): ASTNode {
    let node = this.additive()

    while (
      this.currentToken.type === TokenType.Less ||
      this.currentToken.type === TokenType.Greater ||
      this.currentToken.type === TokenType.LessEqual ||
      this.currentToken.type === TokenType.GreaterEqual ||
      this.currentToken.type === TokenType.Equal ||
      this.currentToken.type === TokenType.NotEqual
    ) {
      const token = this.currentToken
      const opMap: Partial<Record<TokenType, ComparisonOperator>> = {
        [TokenType.Less]: '<',
        [TokenType.Greater]: '>',
        [TokenType.LessEqual]: '<=',
        [TokenType.GreaterEqual]: '>=',
        [TokenType.Equal]: '==',
        [TokenType.NotEqual]: '!='
      }
      const op = opMap[token.type]!
      this.eat(token.type)
      node = AST.createBinaryOp(op, node, this.additive())
    }

    return node
  }

  // and : comparison (AND comparison)*
  private and(): ASTNode {
    let node = this.comparison()

    while (this.currentToken.type === TokenType.And) {
      this.eat(TokenType.And)
      node = AST.createBinaryOp('&&', node, this.comparison())
    }

    return node
  }

  // or : and (OR and)*
  private or(): ASTNode {
    let node = this.and()

    while (this.currentToken.type === TokenType.Or) {
      this.eat(TokenType.Or)
      node = AST.createBinaryOp('||', node, this.and())
    }

    return node
  }

  // conditional : or (QUESTION conditional COLON conditional)?
  private conditional(): ASTNode {
    const node = this.or()
    if (this.currentToken.type === TokenType.Question) {
      this.eat(TokenType.Question)
      const consequent = this.conditional()
      this.eat(TokenType.Colon)
      const alternate = this.conditional()
      return AST.createConditional(node, consequent, alternate)
    }
    return node
  }

  // expr : conditional (top-level entry)
  private expr(): ASTNode {
    return this.conditional()
  }

  public parse(): ASTNode {
    const node = this.expr()
    if (this.currentToken.type !== TokenType.EOF) {
      throw new ParserError(
        `Unexpected token: ${this.tokenName(this.currentToken.type)}`,
        this.currentToken.position,
        this.input
      )
    }
    return node
  }
}
