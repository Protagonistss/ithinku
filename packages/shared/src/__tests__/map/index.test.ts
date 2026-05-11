import { describe, it, expect } from 'vitest'
import {
  createMap,
  objToMap,
  mapToObj,
  mergeMap,
  filterMap,
  mapValues,
  pickMap,
  omitMap,
  invertMap,
  hasValue,
  findKey,
  union,
  intersection,
  difference,
  symmetricDifference,
  isSubset,
  isSetEqual
} from '../../map'

describe('Map Utils', () => {
  describe('createMap', () => {
    it('creates a Map from entries', () => {
      const m = createMap([['a', 1], ['b', 2]])
      expect(m.get('a')).toBe(1)
      expect(m.get('b')).toBe(2)
      expect(m.size).toBe(2)
    })

    it('returns empty Map for empty array', () => {
      expect(createMap([]).size).toBe(0)
    })
  })

  describe('objToMap', () => {
    it('converts object to Map', () => {
      const m = objToMap({ a: 1, b: 2 })
      expect(m.get('a')).toBe(1)
      expect(m.get('b')).toBe(2)
    })

    it('returns empty Map for empty object', () => {
      expect(objToMap({}).size).toBe(0)
    })
  })

  describe('mapToObj', () => {
    it('converts Map to object', () => {
      expect(mapToObj(new Map([['a', 1]]))).toEqual({ a: 1 })
    })

    it('returns empty object for empty Map', () => {
      expect(mapToObj(new Map())).toEqual({})
    })
  })

  describe('mergeMap', () => {
    it('merges multiple Maps', () => {
      const m = mergeMap(new Map([['a', 1]]), new Map([['b', 2]]), new Map([['a', 3]]))
      expect(m.get('a')).toBe(3)
      expect(m.get('b')).toBe(2)
    })

    it('returns empty Map with no arguments', () => {
      expect(mergeMap().size).toBe(0)
    })
  })

  describe('filterMap', () => {
    it('filters Map entries by predicate', () => {
      const m = filterMap(new Map([['a', 1], ['b', 2], ['c', 3]]), v => v > 1)
      expect(m.size).toBe(2)
      expect(m.has('a')).toBe(false)
    })

    it('returns empty Map for empty input', () => {
      expect(filterMap(new Map(), () => true).size).toBe(0)
    })
  })

  describe('mapValues', () => {
    it('maps over Map values', () => {
      const m = mapValues(new Map([['a', 1], ['b', 2]]), v => v * 10)
      expect(m.get('a')).toBe(10)
      expect(m.get('b')).toBe(20)
    })
  })

  describe('pickMap', () => {
    it('picks specified keys', () => {
      const m = pickMap(new Map([['a', 1], ['b', 2], ['c', 3]]), ['a', 'c'])
      expect(m.size).toBe(2)
      expect(m.has('b')).toBe(false)
    })

    it('ignores non-existent keys', () => {
      const m = pickMap(new Map([['a', 1]]), ['a', 'z'])
      expect(m.size).toBe(1)
    })
  })

  describe('omitMap', () => {
    it('omits specified keys', () => {
      const m = omitMap(new Map([['a', 1], ['b', 2], ['c', 3]]), ['b'])
      expect(m.size).toBe(2)
      expect(m.has('b')).toBe(false)
    })
  })

  describe('invertMap', () => {
    it('inverts keys and values', () => {
      const m = invertMap(new Map([['a', 1], ['b', 2]]))
      expect(m.get(1)).toBe('a')
      expect(m.get(2)).toBe('b')
    })
  })

  describe('hasValue', () => {
    it('finds existing value', () => {
      expect(hasValue(new Map([['a', 1]]), 1)).toBe(true)
    })

    it('handles NaN correctly', () => {
      expect(hasValue(new Map([['a', NaN]]), NaN)).toBe(true)
    })

    it('returns false for missing value', () => {
      expect(hasValue(new Map([['a', 1]]), 2)).toBe(false)
    })
  })

  describe('findKey', () => {
    it('finds key by predicate', () => {
      expect(findKey(new Map([['a', 1], ['b', 2]]), v => v === 2)).toBe('b')
    })

    it('returns undefined when not found', () => {
      expect(findKey(new Map([['a', 1]]), v => v === 99)).toBeUndefined()
    })
  })
})

describe('Set Utils', () => {
  describe('union', () => {
    it('unions multiple Sets', () => {
      const s = union(new Set([1, 2]), new Set([2, 3]))
      expect(s).toEqual(new Set([1, 2, 3]))
    })

    it('returns empty Set with no arguments', () => {
      expect(union().size).toBe(0)
    })
  })

  describe('intersection', () => {
    it('intersects multiple Sets', () => {
      const s = intersection(new Set([1, 2, 3]), new Set([2, 3, 4]), new Set([2, 3]))
      expect(s).toEqual(new Set([2, 3]))
    })

    it('returns empty Set with no arguments', () => {
      expect(intersection().size).toBe(0)
    })
  })

  describe('difference', () => {
    it('returns elements in first but not others', () => {
      const s = difference(new Set([1, 2, 3]), new Set([2]))
      expect(s).toEqual(new Set([1, 3]))
    })

    it('returns copy when no others', () => {
      const s = difference(new Set([1, 2]))
      expect(s).toEqual(new Set([1, 2]))
    })
  })

  describe('symmetricDifference', () => {
    it('returns elements in either but not both', () => {
      const s = symmetricDifference(new Set([1, 2]), new Set([2, 3]))
      expect(s).toEqual(new Set([1, 3]))
    })
  })

  describe('isSubset', () => {
    it('returns true for subset', () => {
      expect(isSubset(new Set([1, 2]), new Set([1, 2, 3]))).toBe(true)
    })

    it('returns false for non-subset', () => {
      expect(isSubset(new Set([1, 4]), new Set([1, 2, 3]))).toBe(false)
    })

    it('empty set is subset of any set', () => {
      expect(isSubset(new Set(), new Set([1]))).toBe(true)
    })
  })

  describe('isSetEqual', () => {
    it('returns true for equal Sets', () => {
      expect(isSetEqual(new Set([1, 2]), new Set([2, 1]))).toBe(true)
    })

    it('returns false for different sizes', () => {
      expect(isSetEqual(new Set([1]), new Set([1, 2]))).toBe(false)
    })
  })
})
