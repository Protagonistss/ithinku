import { describe, it, expect } from 'vitest'

import {
  isArray,
  isObject,
  isString,
  isNumber,
  isBoolean,
  isFunction,
  isSymbol,
  isDate,
  isRegExp,
  isError,
  isPromise,
  isMap,
  isSet,
  isWeakMap,
  isWeakSet,
  isBigInt,
  isUndefined,
  isNull,
  isBigInt64Array,
  isBigUint64Array,
  isFloat32Array,
  isFloat64Array,
  isInt8Array,
  isInt16Array,
  isEmpty,
  isExist,
  isTrue
} from '../../type'

describe('Type checking functions', () => {
  describe('isArray', () => {
    it('should return true for arrays', () => {
      expect(isArray([])).toBe(true)
      expect(isArray([1, 2, 3])).toBe(true)
      expect(isArray([])).toBe(true)
    })

    it('should return false for non-arrays', () => {
      expect(isArray({})).toBe(false)
      expect(isArray(null)).toBe(false)
      expect(isArray(undefined)).toBe(false)
    })
  })

  describe('isObject', () => {
    it('should return true for objects', () => {
      expect(isObject({})).toBe(true)
      expect(isObject(new Object())).toBe(true)
      expect(isObject(Object.create(null))).toBe(true)
    })

    it('should return false for non-objects', () => {
      expect(isObject([])).toBe(false)
      expect(isObject(null)).toBe(false)
      expect(isObject(undefined)).toBe(false)
    })
  })

  describe('isString', () => {
    it('should return true for strings', () => {
      expect(isString('')).toBe(true)
      expect(isString('hello')).toBe(true)
      expect(isString(String('test'))).toBe(true)
    })

    it('should return false for non-strings', () => {
      expect(isString(123)).toBe(false)
      expect(isString(null)).toBe(false)
      expect(isString(undefined)).toBe(false)
    })
  })

  describe('isNumber', () => {
    it('should return true for numbers', () => {
      expect(isNumber(0)).toBe(true)
      expect(isNumber(123.456)).toBe(true)
      expect(isNumber(Number('123'))).toBe(true)
    })

    it('should return false for non-numbers', () => {
      expect(isNumber('123')).toBe(false)
      expect(isNumber(null)).toBe(false)
      expect(isNumber(undefined)).toBe(false)
    })
  })

  describe('isBoolean', () => {
    it('should return true for booleans', () => {
      expect(isBoolean(true)).toBe(true)
      expect(isBoolean(false)).toBe(true)
      expect(isBoolean(Boolean(1))).toBe(true)
    })

    it('should return false for non-booleans', () => {
      expect(isBoolean(1)).toBe(false)
      expect(isBoolean(null)).toBe(false)
      expect(isBoolean(undefined)).toBe(false)
    })
  })

  describe('isFunction', () => {
    it('should return true for functions', () => {
      expect(isFunction(() => {})).toBe(true)
      expect(isFunction(() => {})).toBe(true)
      expect(isFunction(async () => {})).toBe(true)
    })

    it('should return false for non-functions', () => {
      expect(isFunction({})).toBe(false)
      expect(isFunction(null)).toBe(false)
      expect(isFunction(undefined)).toBe(false)
    })
  })

  describe('isSymbol', () => {
    it('should return true for symbols', () => {
      expect(isSymbol(Symbol())).toBe(true)
      expect(isSymbol(Symbol('test'))).toBe(true)
    })

    it('should return false for non-symbols', () => {
      expect(isSymbol('symbol')).toBe(false)
      expect(isSymbol(null)).toBe(false)
      expect(isSymbol(undefined)).toBe(false)
    })
  })

  describe('isDate', () => {
    it('should return true for dates', () => {
      expect(isDate(new Date())).toBe(true)
      expect(isDate(new Date('2024-01-01'))).toBe(true)
    })

    it('should return false for non-dates', () => {
      expect(isDate('2024-01-01')).toBe(false)
      expect(isDate(null)).toBe(false)
      expect(isDate(undefined)).toBe(false)
    })
  })

  describe('isRegExp', () => {
    it('should return true for regular expressions', () => {
      expect(isRegExp(/test/)).toBe(true)
      expect(isRegExp(new RegExp('test'))).toBe(true)
    })

    it('should return false for non-regular expressions', () => {
      expect(isRegExp('test')).toBe(false)
      expect(isRegExp(null)).toBe(false)
      expect(isRegExp(undefined)).toBe(false)
    })
  })

  describe('isError', () => {
    it('should return true for errors', () => {
      expect(isError(new Error())).toBe(true)
      expect(isError(new TypeError())).toBe(true)
    })

    it('should return false for non-errors', () => {
      expect(isError('error')).toBe(false)
      expect(isError(null)).toBe(false)
      expect(isError(undefined)).toBe(false)
    })
  })

  describe('isPromise', () => {
    it('should return true for promises', () => {
      expect(isPromise(Promise.resolve())).toBe(true)
      expect(isPromise(new Promise(() => {}))).toBe(true)
    })

    it('should return false for non-promises', () => {
      expect(isPromise({})).toBe(false)
      expect(isPromise(null)).toBe(false)
      expect(isPromise(undefined)).toBe(false)
    })
  })

  describe('isMap', () => {
    it('should return true for maps', () => {
      expect(isMap(new Map())).toBe(true)
      expect(isMap(new Map([['key', 'value']]))).toBe(true)
    })

    it('should return false for non-maps', () => {
      expect(isMap({})).toBe(false)
      expect(isMap(null)).toBe(false)
      expect(isMap(undefined)).toBe(false)
    })
  })

  describe('isSet', () => {
    it('should return true for sets', () => {
      expect(isSet(new Set())).toBe(true)
      expect(isSet(new Set([1, 2, 3]))).toBe(true)
    })

    it('should return false for non-sets', () => {
      expect(isSet([])).toBe(false)
      expect(isSet(null)).toBe(false)
      expect(isSet(undefined)).toBe(false)
    })
  })

  describe('isWeakMap', () => {
    it('should return true for weak maps', () => {
      expect(isWeakMap(new WeakMap())).toBe(true)
    })

    it('should return false for non-weak maps', () => {
      expect(isWeakMap(new Map())).toBe(false)
      expect(isWeakMap(null)).toBe(false)
      expect(isWeakMap(undefined)).toBe(false)
    })
  })

  describe('isWeakSet', () => {
    it('should return true for weak sets', () => {
      expect(isWeakSet(new WeakSet())).toBe(true)
    })

    it('should return false for non-weak sets', () => {
      expect(isWeakSet(new Set())).toBe(false)
      expect(isWeakSet(null)).toBe(false)
      expect(isWeakSet(undefined)).toBe(false)
    })
  })

  describe('isBigInt', () => {
    it('should return true for big integers', () => {
      expect(isBigInt(BigInt(1))).toBe(true)
      expect(isBigInt(1n)).toBe(true)
    })

    it('should return false for non-big integers', () => {
      expect(isBigInt(1)).toBe(false)
      expect(isBigInt(null)).toBe(false)
      expect(isBigInt(undefined)).toBe(false)
    })
  })

  describe('isUndefined', () => {
    it('should return true for undefined', () => {
      expect(isUndefined(void 0)).toBe(true)
    })

    it('should return false for non-undefined', () => {
      expect(isUndefined(null)).toBe(false)
      expect(isUndefined('')).toBe(false)
      expect(isUndefined(0)).toBe(false)
    })
  })

  describe('isNull', () => {
    it('should return true for null', () => {
      expect(isNull(null)).toBe(true)
    })

    it('should return false for non-null', () => {
      expect(isNull(void 0)).toBe(false)
      expect(isNull('')).toBe(false)
      expect(isNull(0)).toBe(false)
    })
  })

  describe('TypedArray checks', () => {
    it('should check BigInt64Array', () => {
      expect(isBigInt64Array(new BigInt64Array())).toBe(true)
      expect(isBigInt64Array(new Int8Array())).toBe(false)
    })

    it('should check BigUint64Array', () => {
      expect(isBigUint64Array(new BigUint64Array())).toBe(true)
      expect(isBigUint64Array(new Int8Array())).toBe(false)
    })

    it('should check Float32Array', () => {
      expect(isFloat32Array(new Float32Array())).toBe(true)
      expect(isFloat32Array(new Int8Array())).toBe(false)
    })

    it('should check Float64Array', () => {
      expect(isFloat64Array(new Float64Array())).toBe(true)
      expect(isFloat64Array(new Int8Array())).toBe(false)
    })

    it('should check Int8Array', () => {
      expect(isInt8Array(new Int8Array())).toBe(true)
      expect(isInt8Array(new Int16Array())).toBe(false)
    })

    it('should check Int16Array', () => {
      expect(isInt16Array(new Int16Array())).toBe(true)
      expect(isInt16Array(new Int8Array())).toBe(false)
    })
  })
})

describe('isEmpty', () => {
  it('should return true for empty strings', () => {
    expect(isEmpty('')).toBe(true)
  })

  it('should return true for empty arrays', () => {
    expect(isEmpty([])).toBe(true)
    })

  it('should return true for empty objects', () => {
    expect(isEmpty({})).toBe(true)
  })

  it('should return false for non-empty strings', () => {
    expect(isEmpty('test')).toBe(false)
  })

  it('should return false for non-empty arrays', () => {
    expect(isEmpty([1, 2, 3])).toBe(false)
  })

  it('should return false for non-empty objects', () => {
    expect(isEmpty({ a: 1 })).toBe(false)
  })
  
  it('should return false for non-empty maps', () => {
    expect(isEmpty(new Map([['key', 'value']]))).toBe(false)
  })

  it('should return false for non-empty sets', () => {
    expect(isEmpty(new Set([1, 2, 3]))).toBe(false)
  })

  it('should return true for false', () => {
    expect(isEmpty(false)).toBe(false)
  })

  it('should return true for false', () => {
    expect(isEmpty(false)).toBe(false)
  })
})


describe('isExist', () => {
  it('should return true for existing values', () => {
    expect(isExist(1)).toBe(true)
    expect(isExist('string')).toBe(true)
    expect(isExist({})).toBe(true)
  })

  it('should return false for non-existing values', () => {
    expect(isExist(null)).toBe(false)
    expect(isExist(undefined)).toBe(false)
  })
})

describe('isTrue', () => {
  it('should return true for true', () => {
    expect(isTrue(true)).toBe(true)
  })

  it('should return true for "true"', () => {
    expect(isTrue('true')).toBe(true)
  })

  it('should return false for "false"', () => {
    expect(isTrue('false')).toBe(false)
  })
  it('should return false for "false"', () => {
    expect(isTrue({})).toBe(false)
  })
  it('should return false for null', () => {
    expect(isTrue(null)).toBe(false)
  })

  it('should return false for undefined', () => {
    expect(isTrue(undefined)).toBe(false)
  })

  it('should return false for numbers', () => {
    expect(isTrue(1)).toBe(false)
    expect(isTrue(0)).toBe(false)
  })

  it('should return false for arrays', () => {
    expect(isTrue([])).toBe(false)
    expect(isTrue([true])).toBe(false)
  })

  it('should return false for other string values', () => {
    expect(isTrue('yes')).toBe(false)
    expect(isTrue('1')).toBe(false)
    expect(isTrue('')).toBe(false)
  })
})

