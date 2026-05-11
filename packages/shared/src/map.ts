const createMap = <K, V>(entries: Array<[K, V]>): Map<K, V> => {
  return new Map(entries)
}

const objToMap = <V>(obj: Record<string, V>): Map<string, V> => {
  return new Map(Object.entries(obj))
}

const mapToObj = <V>(map: Map<string, V>): Record<string, V> => {
  return Object.fromEntries(map.entries())
}

const mergeMap = <K, V>(...maps: Array<Map<K, V>>): Map<K, V> => {
  const result = new Map<K, V>()
  for (const map of maps) {
    for (const [key, value] of map) {
      result.set(key, value)
    }
  }
  return result
}

const filterMap = <K, V>(
  map: Map<K, V>,
  predicate: (value: V, key: K) => boolean
): Map<K, V> => {
  const result = new Map<K, V>()
  for (const [key, value] of map) {
    if (predicate(value, key)) {
      result.set(key, value)
    }
  }
  return result
}

const mapValues = <K, V, R>(
  map: Map<K, V>,
  fn: (value: V, key: K) => R
): Map<K, R> => {
  const result = new Map<K, R>()
  for (const [key, value] of map) {
    result.set(key, fn(value, key))
  }
  return result
}

const pickMap = <K, V>(map: Map<K, V>, keys: Array<K>): Map<K, V> => {
  const result = new Map<K, V>()
  for (const key of keys) {
    if (map.has(key)) {
      result.set(key, map.get(key) as V)
    }
  }
  return result
}

const omitMap = <K, V>(map: Map<K, V>, keys: Array<K>): Map<K, V> => {
  const keySet = new Set(keys)
  const result = new Map<K, V>()
  for (const [key, value] of map) {
    if (!keySet.has(key)) {
      result.set(key, value)
    }
  }
  return result
}

const invertMap = <K, V>(map: Map<K, V>): Map<V, K> => {
  const result = new Map<V, K>()
  for (const [key, value] of map) {
    result.set(value, key)
  }
  return result
}

const hasValue = <K, V>(map: Map<K, V>, value: V): boolean => {
  for (const v of map.values()) {
    if (Object.is(v, value)) return true
  }
  return false
}

const findKey = <K, V>(
  map: Map<K, V>,
  predicate: (value: V, key: K) => boolean
): K | undefined => {
  for (const [key, value] of map) {
    if (predicate(value, key)) return key
  }
  return undefined
}

const union = <T>(...sets: Array<Set<T>>): Set<T> => {
  const result = new Set<T>()
  for (const set of sets) {
    for (const value of set) {
      result.add(value)
    }
  }
  return result
}

const intersection = <T>(...sets: Array<Set<T>>): Set<T> => {
  if (sets.length === 0) return new Set<T>()
  const first = sets[0]!
  const rest = sets.slice(1)
  const result = new Set<T>()
  for (const value of first) {
    if (rest.every(s => s.has(value))) {
      result.add(value)
    }
  }
  return result
}

const difference = <T>(set: Set<T>, ...others: Array<Set<T>>): Set<T> => {
  const result = new Set<T>()
  for (const value of set) {
    if (!others.some(s => s.has(value))) {
      result.add(value)
    }
  }
  return result
}

const symmetricDifference = <T>(a: Set<T>, b: Set<T>): Set<T> => {
  const result = new Set<T>()
  for (const value of a) {
    if (!b.has(value)) result.add(value)
  }
  for (const value of b) {
    if (!a.has(value)) result.add(value)
  }
  return result
}

const isSubset = <T>(sub: Set<T>, sup: Set<T>): boolean => {
  if (sub.size > sup.size) return false
  for (const value of sub) {
    if (!sup.has(value)) return false
  }
  return true
}

const isSetEqual = <T>(a: Set<T>, b: Set<T>): boolean => {
  if (a.size !== b.size) return false
  for (const value of a) {
    if (!b.has(value)) return false
  }
  return true
}

export {
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
}
