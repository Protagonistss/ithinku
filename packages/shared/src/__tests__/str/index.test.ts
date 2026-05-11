import { describe, it, expect } from 'vitest'
import {
  camelCase,
  kebabCase,
  snakeCase,
  pascalCase,
  capitalize,
  truncate,
  template,
  mask,
  trim,
  words,
  countChars
} from '../../str'

describe('String Utils', () => {
  describe('camelCase', () => {
    it('converts kebab-case to camelCase', () => {
      expect(camelCase('foo-bar-baz')).toBe('fooBarBaz')
    })

    it('converts snake_case to camelCase', () => {
      expect(camelCase('foo_bar_baz')).toBe('fooBarBaz')
    })

    it('converts space separated to camelCase', () => {
      expect(camelCase('hello world')).toBe('helloWorld')
    })

    it('handles PascalCase input', () => {
      expect(camelCase('FooBar')).toBe('fooBar')
    })

    it('returns empty for empty string', () => {
      expect(camelCase('')).toBe('')
    })

    it('handles consecutive separators', () => {
      expect(camelCase('foo--bar')).toBe('fooBar')
    })
  })

  describe('kebabCase', () => {
    it('converts camelCase to kebab-case', () => {
      expect(kebabCase('fooBarBaz')).toBe('foo-bar-baz')
    })

    it('converts PascalCase to kebab-case', () => {
      expect(kebabCase('FooBarBaz')).toBe('foo-bar-baz')
    })

    it('returns empty for empty string', () => {
      expect(kebabCase('')).toBe('')
    })
  })

  describe('snakeCase', () => {
    it('converts camelCase to snake_case', () => {
      expect(snakeCase('fooBarBaz')).toBe('foo_bar_baz')
    })

    it('converts kebab-case to snake_case', () => {
      expect(snakeCase('foo-bar-baz')).toBe('foo_bar_baz')
    })
  })

  describe('pascalCase', () => {
    it('converts kebab-case to PascalCase', () => {
      expect(pascalCase('foo-bar-baz')).toBe('FooBarBaz')
    })

    it('converts camelCase to PascalCase', () => {
      expect(pascalCase('fooBar')).toBe('FooBar')
    })

    it('returns empty for empty string', () => {
      expect(pascalCase('')).toBe('')
    })
  })

  describe('capitalize', () => {
    it('capitalizes first character', () => {
      expect(capitalize('hello')).toBe('Hello')
    })

    it('returns empty for empty string', () => {
      expect(capitalize('')).toBe('')
    })

    it('handles single character', () => {
      expect(capitalize('a')).toBe('A')
    })
  })

  describe('truncate', () => {
    it('truncates with default suffix', () => {
      expect(truncate('Hello World', { length: 8 })).toBe('Hello...')
    })

    it('returns original if shorter than length', () => {
      expect(truncate('Hello', { length: 10 })).toBe('Hello')
    })

    it('supports custom suffix', () => {
      expect(truncate('Hello World', { length: 8, suffix: '–' })).toBe('Hello W–')
    })
  })

  describe('template', () => {
    it('replaces placeholders', () => {
      expect(template('Hello {name}', { name: 'World' })).toBe('Hello World')
    })

    it('keeps missing keys as-is', () => {
      expect(template('Hello {name}', {})).toBe('Hello {name}')
    })

    it('handles multiple placeholders', () => {
      expect(template('{greeting} {name}!', { greeting: 'Hi', name: 'Alice' })).toBe('Hi Alice!')
    })
  })

  describe('mask', () => {
    it('masks middle of string', () => {
      expect(mask('13812345678', { start: 3, end: 4 })).toBe('138****5678')
    })

    it('masks entire string with default options', () => {
      expect(mask('hello')).toBe('*****')
    })

    it('supports custom char', () => {
      expect(mask('13812345678', { start: 3, end: 4, char: '#' })).toBe('138####5678')
    })

    it('returns empty for empty string', () => {
      expect(mask('')).toBe('')
    })
  })

  describe('trim', () => {
    it('normalizes whitespace', () => {
      expect(trim('  hello   world  ')).toBe('hello world')
    })

    it('handles tabs and newlines', () => {
      expect(trim('hello\t\nworld')).toBe('hello world')
    })
  })

  describe('words', () => {
    it('splits camelCase', () => {
      expect(words('helloWorld')).toEqual(['hello', 'world'])
    })

    it('splits kebab-case', () => {
      expect(words('foo-bar-baz')).toEqual(['foo', 'bar', 'baz'])
    })

    it('returns empty array for empty string', () => {
      expect(words('')).toEqual([])
    })
  })

  describe('countChars', () => {
    it('counts ASCII characters', () => {
      expect(countChars('hello')).toBe(5)
    })

    it('counts Unicode correctly', () => {
      expect(countChars('你好')).toBe(2)
      expect(countChars('🎉')).toBe(1)
    })

    it('returns 0 for empty string', () => {
      expect(countChars('')).toBe(0)
    })
  })
})
