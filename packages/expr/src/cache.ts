/**
 * LRU (Least Recently Used) Cache implementation.
 *
 * Stores key-value pairs with a maximum size constraint.
 * When the cache is full and a new item is added, the least recently
 * used item is evicted to make room.
 *
 * @example
 * ```ts
 * const cache = new LRUCache<string, number>(100)
 * cache.set('a', 1)
 * cache.get('a') // returns 1
 * ```
 */
export class LRUCache<K, V> {
  private cache: Map<K, V>
  private maxSize: number

  /**
   * Create a new LRU cache.
   * @param maxSize - Maximum number of items to store (default: 128)
   */
  constructor(maxSize = 128) {
    this.cache = new Map()
    this.maxSize = maxSize
  }

  /**
   * Get a value from the cache.
   * Returns undefined if the key doesn't exist.
   * Accessing an item marks it as recently used.
   */
  get(key: K): V | undefined {
    const value = this.cache.get(key)
    if (value !== undefined) {
      // Re-insert to mark as recently used
      this.cache.delete(key)
      this.cache.set(key, value)
    }
    return value
  }

  /**
   * Set a value in the cache.
   * If the key already exists, it's updated and marked as recently used.
   * If the cache is full, the least recently used item is evicted.
   */
  set(key: K, value: V): void {
    // Remove if exists to update order
    if (this.cache.has(key)) {
      this.cache.delete(key)
    }
    // Remove oldest if at capacity
    else if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value
      if (firstKey !== undefined) {
        this.cache.delete(firstKey)
      }
    }
    this.cache.set(key, value)
  }

  /**
   * Check if a key exists in the cache without affecting access order.
   */
  has(key: K): boolean {
    return this.cache.has(key)
  }

  /**
   * Remove all items from the cache.
   */
  clear(): void {
    this.cache.clear()
  }

  /**
   * Get the current number of items in the cache.
   */
  get size(): number {
    return this.cache.size
  }
}
