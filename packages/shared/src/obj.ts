import { isObject, isArray, isDate, isRegExp, isMap, isSet } from './type'

const deepClone = <T>(value: T): T => {
  if (value === null || typeof value !== 'object') return value
  return structuredClone(value)
}

const deepMerge = <T extends Record<string, unknown>>(...objects: Array<T>): T => {
  const result: Record<string, unknown> = {}
  for (const obj of objects) {
    for (const key of Object.keys(obj)) {
      const targetVal = result[key]
      const sourceVal = (obj as Record<string, unknown>)[key]
      result[key] =
        isObject(targetVal) && isObject(sourceVal)
          ? deepMerge(targetVal as Record<string, unknown>, sourceVal as Record<string, unknown>)
          : deepClone(sourceVal)
    }
  }
  return result as T
}

const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: Array<K>
): Pick<T, K> => {
  const result = {} as Pick<T, K>
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key]
    }
  }
  return result
}

const omit = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: Array<K>
): Omit<T, K> => {
  const keySet = new Set<string>(keys as string[])
  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(obj)) {
    if (!keySet.has(key)) {
      result[key] = value
    }
  }
  return result as Omit<T, K>
}

const get = <T = unknown>(obj: Record<string, unknown>, path: string, defaultValue?: T): T => {
  const keys = path.split('.').filter((k) => k !== '')
  if (keys.length === 0) return defaultValue as T
  let current: unknown = obj
  for (const key of keys) {
    if (current === null || current === undefined) return defaultValue as T
    current = (current as Record<string, unknown>)[key]
  }
  return current === undefined ? (defaultValue as T) : (current as T)
}

const set = <T extends Record<string, unknown>>(obj: T, path: string, value: unknown): T => {
  const keys = path.split('.').filter((k) => k !== '')
  if (keys.length === 0) return obj

  const result = { ...obj } as Record<string, unknown>
  let current = result
  const lastKey = keys.at(-1) ?? ''
  for (const key of keys.slice(0, -1)) {
    const next = current[key]
    current[key] = isObject(next) ? { ...(next as Record<string, unknown>) } : {}
    current = current[key] as Record<string, unknown>
  }
  current[lastKey] = value
  return result as T
}

const flatten = (obj: Record<string, unknown>, prefix = ''): Record<string, unknown> => {
  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key
    if (isObject(value) && !isDate(value) && !isRegExp(value)) {
      Object.assign(result, flatten(value as Record<string, unknown>, newKey))
    } else {
      result[newKey] = value
    }
  }
  return result
}

const unflatten = (obj: Record<string, unknown>): Record<string, unknown> => {
  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(obj)) {
    const parts = key.split('.')
    let current = result
    const lastPart = parts.at(-1) ?? ''
    for (const k of parts.slice(0, -1)) {
      if (!(k in current)) {
        current[k] = {}
      }
      current = current[k] as Record<string, unknown>
    }
    current[lastPart] = value
  }
  return result
}

const isEmptyDeep = (value?: unknown): boolean => {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.length === 0
  if (isArray(value)) return (value as unknown[]).length === 0
  if (isObject(value)) {
    return Object.values(value as Record<string, unknown>).every((v) => isEmptyDeep(v))
  }
  return false
}

function isEqualMap(a: unknown, b: unknown): boolean {
  const mapA = a as Map<unknown, unknown>
  const mapB = b as Map<unknown, unknown>
  if (mapA.size !== mapB.size) return false
  for (const [key, value] of mapA) {
    if (!mapB.has(key) || !isEqual(value, mapB.get(key))) return false
  }
  return true
}

function isEqualSet(a: unknown, b: unknown): boolean {
  const setA = a as Set<unknown>
  const setB = b as Set<unknown>
  if (setA.size !== setB.size) return false
  for (const value of setA) {
    if (!setB.has(value)) return false
  }
  return true
}

function isEqualArray(a: unknown, b: unknown): boolean {
  const arrA = a as unknown[]
  const arrB = b as unknown[]
  if (arrA.length !== arrB.length) return false
  return arrA.every((val, i) => isEqual(val, arrB[i]))
}

function isEqualObject(a: unknown, b: unknown): boolean {
  const objA = a as Record<string, unknown>
  const objB = b as Record<string, unknown>
  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)
  if (keysA.length !== keysB.length) return false
  return keysA.every((key) => isEqual(objA[key], objB[key]))
}

function isEqualTemporal(a: object, b: object): boolean | undefined {
  if (isDate(a) && isDate(b)) return (a as Date).getTime() === (b as Date).getTime()
  if (isRegExp(a) && isRegExp(b)) {
    return (
      (a as RegExp).source === (b as RegExp).source && (a as RegExp).flags === (b as RegExp).flags
    )
  }
  return undefined
}

function isEqualCollection(a: object, b: object): boolean | undefined {
  if (isMap(a) && isMap(b)) return isEqualMap(a, b)
  if (isSet(a) && isSet(b)) return isEqualSet(a, b)
  if (isArray(a) && isArray(b)) return isEqualArray(a, b)
  if (isObject(a) && isObject(b)) return isEqualObject(a, b)
  return undefined
}

function isEqualByKind(a: object, b: object): boolean | undefined {
  return isEqualTemporal(a, b) ?? isEqualCollection(a, b)
}

function isEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return false
  return isEqualByKind(a, b) ?? false
}

export { deepClone, deepMerge, pick, omit, get, set, flatten, unflatten, isEmptyDeep, isEqual }
