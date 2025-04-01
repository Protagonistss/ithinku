import { describe, expect, it } from '@jest/globals'

import { Lexer, TokenType } from '../lexer'

describe('Lexer', () => {
  it('should tokenize numbers', () => {
    const lexer = new Lexer('123 456.789')
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
      type: TokenType.EOF,
      value: '',
      position: 11
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

  it('should tokenize identifiers and nested properties', () => {
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
      value: 'foo.bar.baz',
      position: 9
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
})
