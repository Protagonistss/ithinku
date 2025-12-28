import { describe, it, expect } from 'vitest'
import { avg, max, min, mode, median, unique, sum, sort } from '../../arr'

describe('Array Utils Consistency', () => {
  it('sort should not mutate the original array', () => {
    const input = [3, 1, 2]
    const result = sort(input)
    expect(result).toEqual([1, 2, 3])
    expect(input).toEqual([3, 1, 2])
  })

  describe('Empty array handling', () => {
    it('max should return undefined for empty array', () => {
      expect(max([])).toBeUndefined()
    })

    it('min should return undefined for empty array', () => {
      expect(min([])).toBeUndefined()
    })

    it('median should return undefined for empty array', () => {
      expect(median([])).toBeUndefined()
    })

    it('avg should return 0 for empty array', () => {
      expect(avg([])).toBe(0)
    })

    it('sum should return 0 for empty array', () => {
      expect(sum([])).toBe(0)
    })

    it('mode should return empty array for empty input', () => {
      expect(mode([])).toEqual([])
    })
  })

  describe('Mathematical correctness', () => {
    it('median handles odd and even lengths', () => {
      expect(median([1, 3, 2])).toBe(2)
      expect(median([1, 2, 3, 4])).toBe(2.5)
    })

    it('mode handles multiple modes', () => {
      expect(mode([1, 1, 2, 2, 3])).toEqual([1, 2])
    })
  })
})
