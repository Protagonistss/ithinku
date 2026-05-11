import { describe, it, expect } from 'vitest'
import {
  toNumber,
  toString,
  toBoolean,
  toArray,
  toInteger,
  toFloat,
  toJSON,
  parseJSON,
  toCamelCaseKeys,
  toSnakeCaseKeys,
  toKebabCaseKeys
} from '../../convert'

describe('Convert Utils', () => {
  describe('toNumber', () => {
    it('returns number as-is', () => {
      expect(toNumber(42)).toBe(42)
    })

    it('converts boolean', () => {
      expect(toNumber(true)).toBe(1)
      expect(toNumber(false)).toBe(0)
    })

    it('parses string', () => {
      expect(toNumber('123')).toBe(123)
      expect(toNumber('12.5')).toBe(12.5)
    })

    it('returns NaN for unparseable', () => {
      expect(toNumber('abc')).toBeNaN()
    })

    it('returns default for null/undefined', () => {
      expect(toNumber(null, 0)).toBe(0)
      expect(toNumber(undefined, 0)).toBe(0)
    })

    it('returns NaN for null without default', () => {
      expect(toNumber(null)).toBeNaN()
    })
  })

  describe('toString', () => {
    it('converts number to string', () => {
      expect(toString(42)).toBe('42')
    })

    it('converts boolean to string', () => {
      expect(toString(true)).toBe('true')
    })

    it('converts null/undefined', () => {
      expect(toString(null)).toBe('null')
      expect(toString(undefined)).toBe('undefined')
    })

    it('converts array to string', () => {
      expect(toString([1, 2, 3])).toBe('1,2,3')
    })
  })

  describe('toBoolean', () => {
    it('converts truthy strings', () => {
      expect(toBoolean('true')).toBe(true)
      expect(toBoolean('1')).toBe(true)
      expect(toBoolean('yes')).toBe(true)
      expect(toBoolean('on')).toBe(true)
    })

    it('converts falsy strings', () => {
      expect(toBoolean('false')).toBe(false)
      expect(toBoolean('0')).toBe(false)
      expect(toBoolean('no')).toBe(false)
      expect(toBoolean('off')).toBe(false)
    })

    it('is case-insensitive', () => {
      expect(toBoolean('TRUE')).toBe(true)
      expect(toBoolean('Yes')).toBe(true)
    })

    it('handles numbers', () => {
      expect(toBoolean(1)).toBe(true)
      expect(toBoolean(0)).toBe(false)
    })

    it('handles empty string', () => {
      expect(toBoolean('')).toBe(false)
    })

    it('returns false for NaN', () => {
      expect(toBoolean(NaN)).toBe(false)
    })

    it('returns false for Infinity', () => {
      expect(toBoolean(Infinity)).toBe(false)
      expect(toBoolean(-Infinity)).toBe(false)
    })

    it('returns false for objects and arrays', () => {
      expect(toBoolean([])).toBe(false)
      expect(toBoolean({})).toBe(false)
      expect(toBoolean(null)).toBe(false)
      expect(toBoolean(undefined)).toBe(false)
    })
  })

  describe('toArray', () => {
    it('wraps single value in array', () => {
      expect(toArray(42)).toEqual([42])
    })

    it('returns empty for null/undefined', () => {
      expect(toArray(null)).toEqual([])
      expect(toArray(undefined)).toEqual([])
    })

    it('copies existing array', () => {
      const arr = [1, 2]
      const result = toArray(arr)
      expect(result).toEqual([1, 2])
      expect(result).not.toBe(arr)
    })

    it('converts Set to array', () => {
      expect(toArray(new Set([1, 2, 3]))).toEqual([1, 2, 3])
    })
  })

  describe('toInteger', () => {
    it('truncates decimal', () => {
      expect(toInteger(3.7)).toBe(3)
      expect(toInteger(-3.7)).toBe(-3)
    })

    it('parses string', () => {
      expect(toInteger('42.9')).toBe(42)
    })

    it('returns default for invalid', () => {
      expect(toInteger('abc', 0)).toBe(0)
    })
  })

  describe('toFloat', () => {
    it('returns float as-is', () => {
      expect(toFloat(3.14159)).toBe(3.14159)
    })

    it('rounds with precision', () => {
      expect(toFloat(3.14159, { precision: 2 })).toBe(3.14)
    })

    it('returns default for invalid', () => {
      expect(toFloat('abc', { defaultValue: 0 })).toBe(0)
    })
  })

  describe('toJSON', () => {
    it('serializes objects', () => {
      expect(toJSON({ a: 1 })).toBe('{"a":1}')
    })

    it('handles pretty print', () => {
      const result = toJSON({ a: 1 }, undefined, 2)
      expect(result).toContain('\n')
    })

    it('returns empty string for circular', () => {
      const obj: Record<string, unknown> = {}
      obj['self'] = obj
      expect(toJSON(obj)).toBe('')
    })
  })

  describe('parseJSON', () => {
    it('parses valid JSON', () => {
      expect(parseJSON('{"a":1}')).toEqual({ a: 1 })
    })

    it('returns fallback for invalid', () => {
      expect(parseJSON('invalid', {})).toEqual({})
    })

    it('returns undefined fallback by default', () => {
      expect(parseJSON('invalid')).toBeUndefined()
    })
  })

  describe('toCamelCaseKeys', () => {
    it('converts object keys', () => {
      expect(toCamelCaseKeys({ 'foo-bar': 1 })).toEqual({ fooBar: 1 })
    })

    it('converts nested keys by default', () => {
      expect(toCamelCaseKeys({ 'foo-bar': { 'baz-qux': 1 } })).toEqual({
        fooBar: { bazQux: 1 }
      })
    })

    it('skips nested when deep is false', () => {
      expect(toCamelCaseKeys({ 'foo-bar': { 'baz-qux': 1 } }, { deep: false })).toEqual({
        fooBar: { 'baz-qux': 1 }
      })
    })

    it('handles arrays of objects', () => {
      expect(toCamelCaseKeys({ items: [{ 'foo-bar': 1 }] })).toEqual({
        items: [{ fooBar: 1 }]
      })
    })
  })

  describe('toSnakeCaseKeys', () => {
    it('converts object keys', () => {
      expect(toSnakeCaseKeys({ fooBar: 1 })).toEqual({ foo_bar: 1 })
    })

    it('converts nested', () => {
      expect(toSnakeCaseKeys({ fooBar: { bazQux: 1 } })).toEqual({
        foo_bar: { baz_qux: 1 }
      })
    })
  })

  describe('toKebabCaseKeys', () => {
    it('converts object keys', () => {
      expect(toKebabCaseKeys({ fooBar: 1 })).toEqual({ 'foo-bar': 1 })
    })

    it('converts nested', () => {
      expect(toKebabCaseKeys({ fooBar: { bazQux: 1 } })).toEqual({
        'foo-bar': { 'baz-qux': 1 }
      })
    })
  })
})
