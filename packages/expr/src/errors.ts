/**
 * Base error class for expression parsing and evaluation errors.
 * Provides enhanced error messages with source context.
 */
export class ExprError extends Error {
  /** The position in the input string where the error occurred */
  public readonly position: number

  /** The original input string that caused the error */
  public readonly input: string

  constructor(message: string, position: number, input: string) {
    super(message)
    this.name = 'ExprError'
    this.position = position
    this.input = input
  }

  /**
   * Get a formatted error message with source context.
   * Shows the line number, column, and points to the error location.
   */
  public getContext(): string {
    const lines = this.input.split('\n')
    let lineNum = 0
    let colNum = this.position

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (line !== undefined && colNum <= line.length) {
        lineNum = i + 1
        break
      }
      const lineLength = line?.length ?? 0
      colNum -= lineLength + 1
    }

    const line = lines[lineNum - 1] || ''
    const pointer = ' '.repeat(Math.max(0, colNum)) + '^'

    // Display column as 1-indexed for user-friendly output
    return `${this.message}\n  at line ${lineNum}, column ${colNum + 1}\n\n  ${line}\n  ${pointer}`
  }
}

/**
 * Error thrown during lexical analysis (tokenization).
 */
export class LexerError extends ExprError {
  constructor(message: string, position: number, input: string) {
    super(message, position, input)
    this.name = 'LexerError'
  }
}

/**
 * Error thrown during syntax analysis (parsing).
 */
export class ParserError extends ExprError {
  constructor(message: string, position: number, input: string) {
    super(message, position, input)
    this.name = 'ParserError'
  }
}

/**
 * Error thrown during expression evaluation.
 */
export class EvaluationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'EvaluationError'
  }
}
