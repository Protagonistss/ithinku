import { describe, it, expect } from 'vitest'
import {
  deepClone,
  deepMerge,
  pick,
  omit,
  get,
  set,
  flatten,
  unflatten,
  isEmptyDeep,
  isEqual
} from '../../obj'

describe('Object Utils', () => {
  describe('deepClone', () => {
    it('clones plain objects', () => {
      const obj = { a: 1, b: { c: 2 } }
      const cloned = deepClone(obj)
      expect(cloned).toEqual(obj)
      expect(cloned).not.toBe(obj)
      expect(cloned.b).not.toBe(obj.b)
    })

    it('clones arrays', () => {
      const arr = [1, [2, 3]]
      const cloned = deepClone(arr)
      expect(cloned).toEqual(arr)
      expect(cloned).not.toBe(arr)
    })

    it('returns primitives as-is', () => {
      expect(deepClone(42)).toBe(42)
      expect(deepClone('hello')).toBe('hello')
      expect(deepClone(null)).toBe(null)
    })

    it('clones Date objects', () => {
      const date = new Date('2024-01-01')
      const cloned = deepClone(date)
      expect(cloned.getTime()).toBe(date.getTime())
      expect(cloned).not.toBe(date)
    })

    it('clones Map', () => {
      const m = new Map([['a', 1]])
      const cloned = deepClone(m)
      expect(cloned.get('a')).toBe(1)
      expect(cloned).not.toBe(m)
    })
  })

  describe('deepMerge', () => {
    it('merges nested objects', () => {
      const result = deepMerge({ a: { b: 1 } }, { a: { c: 2 } })
      expect(result).toEqual({ a: { b: 1, c: 2 } })
    })

    it('later values overwrite', () => {
      const result = deepMerge({ a: 1 }, { a: 2 })
      expect(result).toEqual({ a: 2 })
    })

    it('handles no arguments', () => {
      expect(deepMerge()).toEqual({})
    })

    it('replaces arrays entirely', () => {
      const result = deepMerge({ a: [1, 2] }, { a: [3] })
      expect(result).toEqual({ a: [3] })
    })
  })

  describe('pick', () => {
    it('picks specified keys', () => {
      expect(pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ a: 1, c: 3 })
    })

    it('returns empty for empty keys', () => {
      expect(pick({ a: 1 }, [])).toEqual({})
    })

    it('ignores non-existent keys', () => {
      expect(pick({ a: 1 } as Record<string, unknown>, ['a'])).toEqual({ a: 1 })
    })
  })

  describe('omit', () => {
    it('omits specified keys', () => {
      expect(omit({ a: 1, b: 2, c: 3 }, ['b'])).toEqual({ a: 1, c: 3 })
    })

    it('returns copy for empty keys', () => {
      const obj = { a: 1 }
      expect(omit(obj, [])).toEqual({ a: 1 })
    })
  })

  describe('get', () => {
    const obj = { a: { b: { c: 42 } }, x: null }

    it('gets nested value', () => {
      expect(get(obj, 'a.b.c')).toBe(42)
    })

    it('returns default for missing path', () => {
      expect(get(obj, 'a.b.d', 'default')).toBe('default')
    })

    it('returns default for null intermediate', () => {
      expect(get(obj, 'x.y', 'default')).toBe('default')
    })

    it('returns default for empty path', () => {
      expect(get(obj, '', 'default')).toBe('default')
    })
  })

  describe('set', () => {
    it('sets nested value immutably', () => {
      const obj = { a: { b: 1 } }
      const result = set(obj, 'a.b', 2)
      expect(result.a.b).toBe(2)
      expect(obj.a.b).toBe(1)
    })

    it('creates intermediate objects', () => {
      const result = set({}, 'a.b.c', 42)
      expect(result).toEqual({ a: { b: { c: 42 } } })
    })

    it('returns original for empty path', () => {
      const obj = { a: 1 }
      expect(set(obj, '', 2)).toBe(obj)
    })
  })

  describe('flatten', () => {
    it('flattens nested object', () => {
      expect(flatten({ a: { b: 1, c: { d: 2 } } })).toEqual({
        'a.b': 1,
        'a.c.d': 2
      })
    })

    it('returns empty for empty object', () => {
      expect(flatten({})).toEqual({})
    })

    it('handles flat object', () => {
      expect(flatten({ a: 1, b: 2 })).toEqual({ a: 1, b: 2 })
    })
  })

  describe('unflatten', () => {
    it('unflattens flat keys', () => {
      expect(unflatten({ 'a.b': 1, 'a.c.d': 2 })).toEqual({
        a: { b: 1, c: { d: 2 } }
      })
    })

    it('returns empty for empty object', () => {
      expect(unflatten({})).toEqual({})
    })

    it('handles non-nested keys', () => {
      expect(unflatten({ a: 1 })).toEqual({ a: 1 })
    })
  })

  describe('isEmptyDeep', () => {
    it('returns true for null/undefined', () => {
      expect(isEmptyDeep(null)).toBe(true)
      expect(isEmptyDeep(undefined)).toBe(true)
    })

    it('returns true for empty string/array', () => {
      expect(isEmptyDeep('')).toBe(true)
      expect(isEmptyDeep([])).toBe(true)
    })

    it('returns true for empty nested object', () => {
      expect(isEmptyDeep({ a: { b: '' } })).toBe(true)
    })

    it('returns false for non-empty values', () => {
      expect(isEmptyDeep({ a: 1 })).toBe(false)
      expect(isEmptyDeep('hello')).toBe(false)
    })
  })

  describe('isEqual', () => {
    it('compares primitives', () => {
      expect(isEqual(1, 1)).toBe(true)
      expect(isEqual('a', 'a')).toBe(true)
      expect(isEqual(NaN, NaN)).toBe(true)
    })

    it('compares objects deeply', () => {
      expect(isEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true)
      expect(isEqual({ a: 1 }, { a: 2 })).toBe(false)
    })

    it('compares arrays', () => {
      expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true)
      expect(isEqual([1, 2], [1, 2, 3])).toBe(false)
    })

    it('compares Date', () => {
      const d1 = new Date('2024-01-01')
      const d2 = new Date('2024-01-01')
      expect(isEqual(d1, d2)).toBe(true)
    })

    it('compares RegExp', () => {
      expect(isEqual(/test/gi, /test/gi)).toBe(true)
      expect(isEqual(/test/g, /test/i)).toBe(false)
    })

    it('compares Map', () => {
      expect(isEqual(new Map([['a', 1]]), new Map([['a', 1]]))).toBe(true)
    })

    it('compares Set', () => {
      expect(isEqual(new Set([1, 2]), new Set([1, 2]))).toBe(true)
    })
  })
})
