import { isObject, isArray, isDate, isMap, isSet } from './type'
import { camelCase, snakeCase, kebabCase } from './str'

const toNumber = (value: unknown, defaultValue?: number): number => {
  if (typeof value === 'number') return value
  if (typeof value === 'boolean') return value ? 1 : 0
  if (value === null || value === undefined) {
    return defaultValue !== undefined ? defaultValue : NaN
  }
  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (trimmed === '') return defaultValue !== undefined ? defaultValue : NaN
    const num = Number(trimmed)
    return Number.isNaN(num) ? (defaultValue !== undefined ? defaultValue : NaN) : num
  }
  return defaultValue !== undefined ? defaultValue : NaN
}

const toString = (value: unknown): string => {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (isDate(value)) return (value as Date).toISOString()
  if (isArray(value)) return (value as unknown[]).join(',')
  if (isObject(value)) {
    try { return JSON.stringify(value) } catch { return '[object Object]' }
  }
  return String(value)
}

const toBoolean = (value: unknown): boolean => {
  if (typeof value === 'boolean') return value
  if (typeof value === 'number') return Number.isFinite(value) && value !== 0
  if (typeof value === 'string') {
    const lower = value.toLowerCase().trim()
    if (['true', '1', 'yes', 'on'].includes(lower)) return true
    if (['false', '0', 'no', 'off', ''].includes(lower)) return false
  }
  return false
}

const toArray = <T>(value: T | T[] | null | undefined): T[] => {
  if (value === null || value === undefined) return []
  if (isArray(value)) return [...(value as T[])]
  if (isSet(value)) return [...(value as unknown as Set<T>)]
  if (isMap(value)) return [...(value as unknown as Map<unknown, T>).entries()] as unknown as T[]
  return [value as T]
}

const toInteger = (value: unknown, defaultValue?: number): number => {
  const num = toNumber(value, defaultValue)
  return Number.isNaN(num) ? num : Math.trunc(num)
}

const toFloat = (
  value: unknown,
  options?: { precision?: number; defaultValue?: number }
): number => {
  const { precision, defaultValue } = options ?? {}
  const num = toNumber(value, defaultValue)
  if (Number.isNaN(num)) return num
  return precision !== undefined ? parseFloat(num.toFixed(precision)) : num
}

const toJSON = (value: unknown, replacer?: unknown, space?: number): string => {
  try {
    return JSON.stringify(value, replacer as (number | string)[], space)
  } catch {
    return ''
  }
}

const parseJSON = <T = unknown>(str: string, fallback?: T): T => {
  try {
    return JSON.parse(str) as T
  } catch {
    return fallback as T
  }
}

const transformKeys = (
  obj: Record<string, unknown>,
  transform: (key: string) => string,
  deep: boolean
): Record<string, unknown> => {
  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(obj)) {
    const newKey = transform(key)
    if (deep && isObject(value)) {
      result[newKey] = transformKeys(value as Record<string, unknown>, transform, deep)
    } else if (deep && isArray(value)) {
      result[newKey] = (value as unknown[]).map(item =>
        isObject(item) ? transformKeys(item as Record<string, unknown>, transform, deep) : item
      )
    } else {
      result[newKey] = value
    }
  }
  return result
}

const toCamelCaseKeys = <T extends Record<string, unknown>>(
  obj: T,
  options?: { deep?: boolean }
): Record<string, unknown> => {
  return transformKeys(obj, camelCase, options?.deep ?? true)
}

const toSnakeCaseKeys = <T extends Record<string, unknown>>(
  obj: T,
  options?: { deep?: boolean }
): Record<string, unknown> => {
  return transformKeys(obj, snakeCase, options?.deep ?? true)
}

const toKebabCaseKeys = <T extends Record<string, unknown>>(
  obj: T,
  options?: { deep?: boolean }
): Record<string, unknown> => {
  return transformKeys(obj, kebabCase, options?.deep ?? true)
}

export {
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
}
