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
  EOF = 'EOF',
}

export interface Token {
  type: TokenType;
  value: string;
  position: number;
}

export class Lexer {
  private input: string;
  private position: number;
  private currentChar: string | null;

  constructor(input: string) {
    this.input = input;
    this.position = 0;
    this.currentChar
      = this.position < this.input.length ? this.input[this.position] : null;
  }

  private advance(): void {
    this.position++;
    this.currentChar
      = this.position < this.input.length ? this.input[this.position] : null;
  }

  private skipWhitespace(): void {
    while (this.currentChar && /\s/.test(this.currentChar)) {
      this.advance();
    }
  }

  private readNumber(): Token {
    let result = '';
    const startPos = this.position;

    while (this.currentChar && /[\d.]/.test(this.currentChar)) {
      result += this.currentChar;
      this.advance();
    }

    return { type: TokenType.Number, value: result, position: startPos };
  }

  private readIdentifier(): Token {
    let result = '';
    const startPos = this.position;

    while (this.currentChar && /[\w.]/.test(this.currentChar)) {
      result += this.currentChar;
      this.advance();
    }

    return { type: TokenType.Identifier, value: result, position: startPos };
  }

  public nextToken(): Token {
    while (this.currentChar !== null) {
      if (/\s/.test(this.currentChar)) {
        this.skipWhitespace();
        continue;
      }

      if (/\d/.test(this.currentChar)) {
        return this.readNumber();
      }

      if (/[A-Z_a-z]/.test(this.currentChar)) {
        return this.readIdentifier();
      }

      const currentPos = this.position;
      switch (this.currentChar) {
        case '+': {
          this.advance();
          return { type: TokenType.Plus, value: '+', position: currentPos };
        }
        case '-': {
          this.advance();
          return { type: TokenType.Minus, value: '-', position: currentPos };
        }
        case '*': {
          this.advance();
          return { type: TokenType.Multiply, value: '*', position: currentPos };
        }
        case '/': {
          this.advance();
          return { type: TokenType.Divide, value: '/', position: currentPos };
        }
        case '(': {
          this.advance();
          return {
            type: TokenType.LeftParen,
            value: '(',
            position: currentPos,
          };
        }
        case ')': {
          this.advance();
          return {
            type: TokenType.RightParen,
            value: ')',
            position: currentPos,
          };
        }
        default: {
          throw new Error(
            `Unexpected character: ${this.currentChar} at position ${this.position}`
          );
        }
      }
    }

    return { type: TokenType.EOF, value: '', position: this.position };
  }
}
