import { describe, it, expect, beforeEach } from 'vitest'
import { LRUCache } from '../cache'

describe('LRUCache', () => {
  let cache: LRUCache<string, number>

  beforeEach(() => {
    cache = new LRUCache(3) // Small size for testing
  })

  it('should store and retrieve values', () => {
    cache.set('a', 1)
    cache.set('b', 2)
    expect(cache.get('a')).toBe(1)
    expect(cache.get('b')).toBe(2)
  })

  it('should return undefined for missing keys', () => {
    expect(cache.get('missing')).toBeUndefined()
  })

  it('should evict least recently used items when full', () => {
    cache.set('a', 1)
    cache.set('b', 2)
    cache.set('c', 3)
    // Cache is full: [a, b, c]
    cache.set('d', 4)
    // 'a' should be evicted: [b, c, d]
    expect(cache.get('a')).toBeUndefined()
    expect(cache.get('b')).toBe(2)
    expect(cache.get('c')).toBe(3)
    expect(cache.get('d')).toBe(4)
  })

  it('should update access order on get', () => {
    cache.set('a', 1)
    cache.set('b', 2)
    cache.set('c', 3)
    // Access 'a' to move it to most recent: [b, c, a]
    cache.get('a')
    cache.set('d', 4)
    // 'b' should be evicted: [c, a, d]
    expect(cache.get('a')).toBe(1)
    expect(cache.get('b')).toBeUndefined()
    expect(cache.get('c')).toBe(3)
    expect(cache.get('d')).toBe(4)
  })

  it('should update value and access order on set for existing key', () => {
    cache.set('a', 1)
    cache.set('b', 2)
    cache.set('c', 3)
    // Update 'a' and move to most recent: [b, c, a]
    cache.set('a', 10)
    cache.set('d', 4)
    // 'b' should be evicted: [c, a, d]
    expect(cache.get('a')).toBe(10)
    expect(cache.get('b')).toBeUndefined()
    expect(cache.get('c')).toBe(3)
    expect(cache.get('d')).toBe(4)
  })

  it('should check if key exists', () => {
    cache.set('a', 1)
    expect(cache.has('a')).toBe(true)
    expect(cache.has('b')).toBe(false)
  })

  it('should clear all items', () => {
    cache.set('a', 1)
    cache.set('b', 2)
    cache.clear()
    expect(cache.size).toBe(0)
    expect(cache.get('a')).toBeUndefined()
  })

  it('should report correct size', () => {
    expect(cache.size).toBe(0)
    cache.set('a', 1)
    expect(cache.size).toBe(1)
    cache.set('b', 2)
    expect(cache.size).toBe(2)
    cache.set('c', 3)
    expect(cache.size).toBe(3)
    cache.set('d', 4) // Evicts 'a'
    expect(cache.size).toBe(3)
  })

  it('should use default size of 128', () => {
    const defaultCache = new LRUCache()
    for (let i = 0; i < 128; i++) {
      defaultCache.set(`key${i}`, i)
    }
    expect(defaultCache.size).toBe(128)
    defaultCache.set('key128', 128)
    expect(defaultCache.size).toBe(128)
    expect(defaultCache.get('key0')).toBeUndefined()
  })
})
