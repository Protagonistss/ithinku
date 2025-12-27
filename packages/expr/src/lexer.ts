export enum TokenType {
  Number = 'Number',
  Plus = 'Plus',
  Minus = 'Minus',
  Multiply = 'Multiply',
  Divide = 'Divide',
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
      this.position < this.input.length ? this.input.charAt(this.position) : null
  }

  private advance(): void {
    this.position++
    this.currentChar =
      this.position < this.input.length ? this.input.charAt(this.position) : null
  }

  private peek(): string | null {
    const nextPos = this.position + 1
    return nextPos < this.input.length ? this.input.charAt(nextPos) : null
  }

  private skipWhitespace(): void {
    while (this.currentChar && /\s/.test(this.currentChar)) {
      this.advance()
    }
  }

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

    while (this.currentChar && /\d/.test(this.currentChar)) {
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
      while (this.currentChar && /\d/.test(this.currentChar)) {
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
      while (this.currentChar && /\d/.test(this.currentChar)) {
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

    while (this.currentChar && /[A-Z_a-z0-9]/.test(this.currentChar)) {
      result += this.currentChar
      this.advance()
    }

    return { type: TokenType.Identifier, value: result, position: startPos }
  }

  public nextToken(): Token {
    while (this.currentChar !== null) {
      if (/\s/.test(this.currentChar)) {
        this.skipWhitespace()
        continue
      }

      const nextChar = this.peek()
      if (
        /\d/.test(this.currentChar) ||
        (this.currentChar === '.' && nextChar !== null && /\d/.test(nextChar))
      ) {
        return this.readNumber()
      }

      if (/[A-Z_a-z]/.test(this.currentChar)) {
        return this.readIdentifier()
      }

      const currentPos = this.position
      switch (this.currentChar) {
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
          return { type: TokenType.Multiply, value: '*', position: currentPos }
        }
        case '/': {
          this.advance()
          return { type: TokenType.Divide, value: '/', position: currentPos }
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
