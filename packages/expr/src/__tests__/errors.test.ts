import { describe, it, expect } from 'vitest'
import { ExprError, LexerError, ParserError, EvaluationError } from '../errors'

describe('ExprError', () => {
  it('should store position and input', () => {
    const error = new ExprError('Test error', 10, 'const x = 1 + 2')
    expect(error.message).toBe('Test error')
    expect(error.position).toBe(10)
    expect(error.input).toBe('const x = 1 + 2')
    expect(error.name).toBe('ExprError')
  })

  it('should format error context for single line input', () => {
    const error = new ExprError('Unexpected token', 10, 'const x = 1 + 2')
    const context = error.getContext()
    expect(context).toContain('Unexpected token')
    expect(context).toContain('line 1, column 11')
    expect(context).toContain('const x = 1 + 2')
    expect(context).toContain('^')
  })

  it('should format error context for multi line input', () => {
    const input = 'const x = 1\nconst y = 2\nconst z = 3'
    const error = new ExprError('Unexpected token', 20, input)
    const context = error.getContext()
    expect(context).toContain('line 2')
    expect(context).toContain('const y = 2')
  })

  it('should handle position at start of line', () => {
    const error = new ExprError('Error at start', 0, 'x + y')
    const context = error.getContext()
    expect(context).toContain('line 1, column 1')
    expect(context).toContain('x + y')
    expect(context).toContain('^')
  })
})

describe('LexerError', () => {
  it('should inherit from ExprError', () => {
    const error = new LexerError('Invalid character', 5, '2 + 3')
    expect(error instanceof ExprError).toBe(true)
    expect(error.name).toBe('LexerError')
  })

  it('should have getContext method', () => {
    const error = new LexerError('Unterminated string', 3, '"hello')
    const context = error.getContext()
    expect(context).toContain('Unterminated string')
  })
})

describe('ParserError', () => {
  it('should inherit from ExprError', () => {
    const error = new ParserError('Unexpected token', 10, '2 + + 3')
    expect(error instanceof ExprError).toBe(true)
    expect(error.name).toBe('ParserError')
  })
})

describe('EvaluationError', () => {
  it('should have correct name', () => {
    const error = new EvaluationError('Division by zero')
    expect(error.name).toBe('EvaluationError')
    expect(error.message).toBe('Division by zero')
  })

  it('should not inherit from ExprError', () => {
    const error = new EvaluationError('Test')
    expect(error instanceof ExprError).toBe(false)
  })
})
