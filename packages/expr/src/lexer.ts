export enum TokenType {
  Number = 'Number',
  String = 'String',
  Plus = 'Plus',
  Minus = 'Minus',
  Multiply = 'Multiply',
  Divide = 'Divide',
  Modulo = 'Modulo',
  Power = 'Power',
  Less = 'Less',
  Greater = 'Greater',
  LessEqual = 'LessEqual',
  GreaterEqual = 'GreaterEqual',
  Equal = 'Equal',
  NotEqual = 'NotEqual',
  And = 'And',
  Or = 'Or',
  Not = 'Not',
  Comma = 'Comma',
  Question = 'Question',
  Colon = 'Colon',
  LeftParen = 'LeftParen',
  RightParen = 'RightParen',
  Identifier = 'Identifier',
  Dot = 'Dot',
  EOF = 'EOF'
}

export interface Token {
  type: TokenType
  value: string
  position: number
}

export class Lexer {
  private input: string
  private position: number
  private currentChar: string | null

  constructor(input: string) {
    this.input = input
    this.position = 0
    this.currentChar =
      this.position < this.input.length
        ? this.input.charAt(this.position)
        : null
  }

  private advance(): void {
    this.position++
    this.currentChar =
      this.position < this.input.length
        ? this.input.charAt(this.position)
        : null
  }

  private peek(): string | null {
    const nextPos = this.position + 1
    return nextPos < this.input.length ? this.input.charAt(nextPos) : null
  }

  private static isWhitespace(ch: string): boolean {
    return ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r'
  }

  private static isDigit(ch: string): boolean {
    return ch >= '0' && ch <= '9'
  }

  private static isAlpha(ch: string): boolean {
    return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || ch === '_'
  }

  private static isAlphaNumeric(ch: string): boolean {
    return Lexer.isAlpha(ch) || Lexer.isDigit(ch)
  }

  private skipWhitespace(): void {
    while (this.currentChar !== null && Lexer.isWhitespace(this.currentChar)) {
      this.advance()
    }
  }

  // eslint-disable-next-line complexity
  private readNumber(): Token {
    let result = ''
    const startPos = this.position
    let hasDigits = false
    let hasDot = false

    if (this.currentChar === '.') {
      hasDot = true
      result += '.'
      this.advance()
    }

    while (this.currentChar !== null && Lexer.isDigit(this.currentChar)) {
      hasDigits = true
      result += this.currentChar
      this.advance()
    }

    if (this.currentChar === '.') {
      if (hasDot) {
        throw new Error(`Invalid number at position ${startPos}`)
      }
      hasDot = true
      result += '.'
      this.advance()
      let fractionalDigits = 0
      while (this.currentChar !== null && Lexer.isDigit(this.currentChar)) {
        fractionalDigits++
        result += this.currentChar
        this.advance()
      }
      if (fractionalDigits === 0) {
        throw new Error(`Invalid number at position ${startPos}`)
      }
      hasDigits = true
    }

    if (!hasDigits) {
      throw new Error(`Invalid number at position ${startPos}`)
    }

    if (this.currentChar && /[eE]/.test(this.currentChar)) {
      result += this.currentChar
      this.advance()
      if (this.currentChar === '+' || this.currentChar === '-') {
        result += this.currentChar
        this.advance()
      }
      let exponentDigits = 0
      while (this.currentChar !== null && Lexer.isDigit(this.currentChar)) {
        exponentDigits++
        result += this.currentChar
        this.advance()
      }
      if (exponentDigits === 0) {
        throw new Error(`Invalid number at position ${startPos}`)
      }
    }

    return { type: TokenType.Number, value: result, position: startPos }
  }

  private readIdentifier(): Token {
    let result = ''
    const startPos = this.position

    while (this.currentChar !== null && Lexer.isAlphaNumeric(this.currentChar)) {
      result += this.currentChar
      this.advance()
    }

    return { type: TokenType.Identifier, value: result, position: startPos }
  }

  private readString(quote: string): Token {
    const startPos = this.position
    this.advance() // skip opening quote
    let result = ''

    while (this.currentChar !== null && this.currentChar !== quote) {
      if (this.currentChar === '\\') {
        this.advance()
        if (this.currentChar === null) {
          throw new Error(`Unterminated string at position ${startPos}`)
        }
        const escaped: string = this.currentChar
        switch (escaped) {
          case 'n': result += '\n'; break
          case 't': result += '\t'; break
          case 'r': result += '\r'; break
          case '\\': result += '\\'; break
          case "'": result += "'"; break
          case '"': result += '"'; break
          default: result += escaped
        }
      } else {
        result += this.currentChar
      }
      this.advance()
    }

    if (this.currentChar === null) {
      throw new Error(`Unterminated string at position ${startPos}`)
    }
    this.advance() // skip closing quote

    return { type: TokenType.String, value: result, position: startPos }
  }

  // eslint-disable-next-line complexity
  public nextToken(): Token {
    while (this.currentChar !== null) {
      if (this.currentChar !== null && Lexer.isWhitespace(this.currentChar)) {
        this.skipWhitespace()
        continue
      }

      const nextChar = this.peek()
      if (
        Lexer.isDigit(this.currentChar!) ||
        (this.currentChar === '.' && nextChar !== null && Lexer.isDigit(nextChar))
      ) {
        return this.readNumber()
      }

      if (this.currentChar === '"' || this.currentChar === "'") {
        return this.readString(this.currentChar)
      }

      if (Lexer.isAlpha(this.currentChar!)) {
        return this.readIdentifier()
      }

      const currentPos = this.position
      const ch: string | null = this.currentChar
      switch (ch) {
        case '+': {
          this.advance()
          return { type: TokenType.Plus, value: '+', position: currentPos }
        }
        case '-': {
          this.advance()
          return { type: TokenType.Minus, value: '-', position: currentPos }
        }
        case '*': {
          this.advance()
          if (this.currentChar === '*') {
            this.advance()
            return { type: TokenType.Power, value: '**', position: currentPos }
          }
          return { type: TokenType.Multiply, value: '*', position: currentPos }
        }
        case '/': {
          this.advance()
          return { type: TokenType.Divide, value: '/', position: currentPos }
        }
        case '%': {
          this.advance()
          return { type: TokenType.Modulo, value: '%', position: currentPos }
        }
        case '<': {
          this.advance()
          const nextLt = this.currentChar
          if (nextLt === '=') {
            this.advance()
            return {
              type: TokenType.LessEqual,
              value: '<=',
              position: currentPos
            }
          }
          return { type: TokenType.Less, value: '<', position: currentPos }
        }
        case '>': {
          this.advance()
          const nextGt = this.currentChar
          if (nextGt === '=') {
            this.advance()
            return {
              type: TokenType.GreaterEqual,
              value: '>=',
              position: currentPos
            }
          }
          return { type: TokenType.Greater, value: '>', position: currentPos }
        }
        case '=': {
          this.advance()
          const nextEq = this.currentChar
          if (nextEq === '=') {
            this.advance()
            return {
              type: TokenType.Equal,
              value: '==',
              position: currentPos
            }
          }
          throw new Error(
            `Unexpected character: = at position ${currentPos}. Did you mean ==?`
          )
        }
        case '!': {
          this.advance()
          const nextNot = this.currentChar
          if (nextNot === '=') {
            this.advance()
            return {
              type: TokenType.NotEqual,
              value: '!=',
              position: currentPos
            }
          }
          return { type: TokenType.Not, value: '!', position: currentPos }
        }
        case '&': {
          this.advance()
          if (this.currentChar === '&') {
            this.advance()
            return { type: TokenType.And, value: '&&', position: currentPos }
          }
          throw new Error(
            `Unexpected character: & at position ${currentPos}. Did you mean &&?`
          )
        }
        case '|': {
          this.advance()
          if (this.currentChar === '|') {
            this.advance()
            return { type: TokenType.Or, value: '||', position: currentPos }
          }
          throw new Error(
            `Unexpected character: | at position ${currentPos}. Did you mean ||?`
          )
        }
        case ',': {
          this.advance()
          return { type: TokenType.Comma, value: ',', position: currentPos }
        }
        case '?': {
          this.advance()
          return { type: TokenType.Question, value: '?', position: currentPos }
        }
        case ':': {
          this.advance()
          return { type: TokenType.Colon, value: ':', position: currentPos }
        }
        case '(': {
          this.advance()
          return {
            type: TokenType.LeftParen,
            value: '(',
            position: currentPos
          }
        }
        case ')': {
          this.advance()
          return {
            type: TokenType.RightParen,
            value: ')',
            position: currentPos
          }
        }
        case '.': {
          this.advance()
          return { type: TokenType.Dot, value: '.', position: currentPos }
        }
        default: {
          throw new Error(
            `Unexpected character: ${this.currentChar} at position ${this.position}`
          )
        }
      }
    }

    return { type: TokenType.EOF, value: '', position: this.position }
  }
}
