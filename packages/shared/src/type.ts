const Types = {
  '[object Array]': 'Array',
  '[object Object]': 'Object',
  '[object String]': 'String',
  '[object Number]': 'Number',
  '[object Boolean]': 'Boolean',
  '[object Function]': 'Function',
  '[object AsyncFunction]': 'AsyncFunction',
  '[object GeneratorFunction]': 'GeneratorFunction',
  '[object Symbol]': 'Symbol',
  '[object Date]': 'Date',
  '[object RegExp]': 'RegExp',
  '[object Error]': 'Error',
  '[object Promise]': 'Promise',
  '[object Map]': 'Map',
  '[object Set]': 'Set',
  '[object WeakMap]': 'WeakMap',
  '[object WeakSet]': 'WeakSet',
  '[object BigInt]': 'BigInt',
  '[object Undefined]': 'Undefined',
  '[object Null]': 'Null',
  '[object BigInt64Array]': 'BigInt64Array',
  '[object BigUint64Array]': 'BigUint64Array',
  '[object Float32Array]': 'Float32Array',
  '[object Float64Array]': 'Float64Array',
  '[object Int8Array]': 'Int8Array',
  '[object Int16Array]': 'Int16Array'
} as const

type TypeKey = keyof typeof Types
type TypeValue = (typeof Types)[TypeKey]

const isType = (type: unknown): TypeValue | 'Unknown' => {
  const typeStr = Object.prototype.toString.call(type)
  if (Object.prototype.hasOwnProperty.call(Types, typeStr)) {
    return Types[typeStr as TypeKey]
  }
  return 'Unknown'
}

const isArray = (arg: unknown): boolean => {
  return Array.isArray(arg)
}

const isObject = (arg: unknown): boolean => {
  return isType(arg) === 'Object'
}

const isString = (arg: unknown): boolean => {
  return isType(arg) === 'String'
}

const isNumber = (arg: unknown): boolean => {
  return isType(arg) === 'Number' && !Number.isNaN(arg)
}

const isBoolean = (arg: unknown): boolean => {
  return isType(arg) === 'Boolean'
}

const isAsyncFunction = (arg: unknown): boolean => {
  return isType(arg) === 'AsyncFunction'
}

const isFunction = (arg: unknown): boolean => {
  return typeof arg === 'function'
}

const isSymbol = (arg: unknown): boolean => {
  return isType(arg) === 'Symbol'
}

const isDate = (arg: unknown): boolean => {
  return isType(arg) === 'Date'
}

const isRegExp = (arg: unknown): boolean => {
  return isType(arg) === 'RegExp'
}

const isError = (arg: unknown): boolean => {
  return isType(arg) === 'Error'
}

const isPromise = (arg: unknown): boolean => {
  return isType(arg) === 'Promise'
}

const isMap = (arg: unknown): boolean => {
  return isType(arg) === 'Map'
}

const isSet = (arg: unknown): boolean => {
  return isType(arg) === 'Set'
}

const isWeakMap = (arg: unknown): boolean => {
  return isType(arg) === 'WeakMap'
}

const isWeakSet = (arg: unknown): boolean => {
  return isType(arg) === 'WeakSet'
}

const isBigInt = (arg: unknown): boolean => {
  return isType(arg) === 'BigInt'
}

const isUndefined = (arg: unknown): boolean => {
  return arg === undefined
}

const isNull = (arg: unknown): boolean => {
  return arg === null
}

const isBigInt64Array = (arg: unknown): boolean => {
  return isType(arg) === 'BigInt64Array'
}

const isBigUint64Array = (arg: unknown): boolean => {
  return isType(arg) === 'BigUint64Array'
}

const isFloat32Array = (arg: unknown): boolean => {
  return isType(arg) === 'Float32Array'
}

const isFloat64Array = (arg: unknown): boolean => {
  return isType(arg) === 'Float64Array'
}

const isInt8Array = (arg: unknown): boolean => {
  return isType(arg) === 'Int8Array'
}

const isInt16Array = (arg: unknown): boolean => {
  return isType(arg) === 'Int16Array'
}

const isExist = (arg: unknown): boolean => {
  return !isNull(arg) && !isUndefined(arg)
}

function isEmpty(
  arg:
    | string
    | unknown[]
    | Record<string, unknown>
    | Map<unknown, unknown>
    | Set<unknown>
    | boolean
): boolean
function isEmpty(arg: unknown): boolean {
  if (!isExist(arg)) {
    return true
  }
  if (isBoolean(arg) || isNumber(arg) || isFunction(arg) || isSymbol(arg)) {
    return false
  }
  if (isString(arg)) {
    return (arg as string).length === 0
  }
  if (isArray(arg)) {
    return (arg as unknown[]).length === 0
  }
  if (isMap(arg)) {
    return (arg as Map<unknown, unknown>).size === 0
  }
  if (isSet(arg)) {
    return (arg as Set<unknown>).size === 0
  }
  if (isObject(arg)) {
    return Object.keys(arg as Record<string, unknown>).length === 0
  }
  return false
}

const isTrue = (arg: unknown): boolean => {
  if (arg === true) {
    return true
  }
  if (isString(arg)) {
    return (arg as string).toLowerCase() === 'true'
  }
  return false
}

export {
  isTrue,
  isEmpty,
  isExist,
  isArray,
  isObject,
  isString,
  isNumber,
  isBoolean,
  isFunction,
  isAsyncFunction,
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
  isType
}
