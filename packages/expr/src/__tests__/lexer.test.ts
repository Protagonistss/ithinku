import { describe, expect, it } from 'vitest'

import { Lexer, TokenType } from '../lexer'

describe('Lexer', () => {
  it('should tokenize numbers', () => {
    const lexer = new Lexer('123 456.789 .5 1e3 2.5e-2')
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Number,
      value: '123',
      position: 0
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Number,
      value: '456.789',
      position: 4
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Number,
      value: '.5',
      position: 12
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Number,
      value: '1e3',
      position: 15
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Number,
      value: '2.5e-2',
      position: 19
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.EOF,
      value: '',
      position: 25
    })
  })

  it('should tokenize operators', () => {
    const lexer = new Lexer('+ - * /')
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Plus,
      value: '+',
      position: 0
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Minus,
      value: '-',
      position: 2
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Multiply,
      value: '*',
      position: 4
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Divide,
      value: '/',
      position: 6
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.EOF,
      value: '',
      position: 7
    })
  })

  it('should tokenize modulo operator', () => {
    const lexer = new Lexer('10 % 3')
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Number,
      value: '10',
      position: 0
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Modulo,
      value: '%',
      position: 3
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Number,
      value: '3',
      position: 5
    })
  })

  it('should tokenize power operator **', () => {
    const lexer = new Lexer('2 ** 3')
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Number,
      value: '2',
      position: 0
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Power,
      value: '**',
      position: 2
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Number,
      value: '3',
      position: 5
    })
  })

  it('should tokenize identifiers and dot separators', () => {
    const lexer = new Lexer('abc x123 foo.bar.baz')
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Identifier,
      value: 'abc',
      position: 0
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Identifier,
      value: 'x123',
      position: 4
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Identifier,
      value: 'foo',
      position: 9
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Dot,
      value: '.',
      position: 12
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Identifier,
      value: 'bar',
      position: 13
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Dot,
      value: '.',
      position: 16
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Identifier,
      value: 'baz',
      position: 17
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.EOF,
      value: '',
      position: 20
    })
  })

  it('should tokenize parentheses', () => {
    const lexer = new Lexer('(123)')
    expect(lexer.nextToken()).toEqual({
      type: TokenType.LeftParen,
      value: '(',
      position: 0
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Number,
      value: '123',
      position: 1
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.RightParen,
      value: ')',
      position: 4
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.EOF,
      value: '',
      position: 5
    })
  })

  it('should handle whitespace', () => {
    const lexer = new Lexer('  123   +  456  ')
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Number,
      value: '123',
      position: 2
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Plus,
      value: '+',
      position: 8
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Number,
      value: '456',
      position: 11
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.EOF,
      value: '',
      position: 16
    })
  })

  it('should throw error for invalid characters', () => {
    const lexer = new Lexer('@')
    expect(() => lexer.nextToken()).toThrow(
      'Unexpected character: @ at position 0'
    )
  })

  it('should throw error for invalid numbers', () => {
    const lexer = new Lexer('1..2')
    expect(() => lexer.nextToken()).toThrow('Invalid number at position 0')
  })

  it('should tokenize comparison operators', () => {
    const lexer = new Lexer('< > <= >= == !=')
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Less,
      value: '<',
      position: 0
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Greater,
      value: '>',
      position: 2
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.LessEqual,
      value: '<=',
      position: 4
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.GreaterEqual,
      value: '>=',
      position: 7
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Equal,
      value: '==',
      position: 10
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.NotEqual,
      value: '!=',
      position: 13
    })
  })

  it('should tokenize logical operators', () => {
    const lexer = new Lexer('&& || !')
    expect(lexer.nextToken()).toEqual({
      type: TokenType.And,
      value: '&&',
      position: 0
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Or,
      value: '||',
      position: 3
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Not,
      value: '!',
      position: 6
    })
  })

  it('should throw error for single =', () => {
    const lexer = new Lexer('=')
    expect(() => lexer.nextToken()).toThrow('Did you mean ==?')
  })

  it('should throw error for single &', () => {
    const lexer = new Lexer('&')
    expect(() => lexer.nextToken()).toThrow('Did you mean &&?')
  })

  it('should throw error for single |', () => {
    const lexer = new Lexer('|')
    expect(() => lexer.nextToken()).toThrow('Did you mean ||?')
  })

  it('should tokenize string literals', () => {
    const lexer = new Lexer('"hello"')
    expect(lexer.nextToken()).toEqual({
      type: TokenType.String,
      value: 'hello',
      position: 0
    })
  })

  it('should tokenize single-quoted strings', () => {
    const lexer = new Lexer("'world'")
    expect(lexer.nextToken()).toEqual({
      type: TokenType.String,
      value: 'world',
      position: 0
    })
  })

  it('should tokenize string with escape sequences', () => {
    const lexer = new Lexer('"hello\\nworld"')
    expect(lexer.nextToken()).toEqual({
      type: TokenType.String,
      value: 'hello\nworld',
      position: 0
    })
  })

  it('should throw error for unterminated strings', () => {
    const lexer = new Lexer('"hello')
    expect(() => lexer.nextToken()).toThrow('Unterminated string')
  })

  it('should tokenize ternary operators', () => {
    const lexer = new Lexer('?:')
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Question,
      value: '?',
      position: 0
    })
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Colon,
      value: ':',
      position: 1
    })
  })

  it('should tokenize comma', () => {
    const lexer = new Lexer(',')
    expect(lexer.nextToken()).toEqual({
      type: TokenType.Comma,
      value: ',',
      position: 0
    })
  })
})
