const Types = {
  '[object Array]': 'Array',
  '[object Object]': 'Object',
  '[object String]': 'String', 
  '[object Number]': 'Number',
  '[object Boolean]': 'Boolean',
  '[object Function]': 'Function',
  '[object AsyncFunction]': 'AsyncFunction',
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

type TypeValue = Exclude<typeof Types[keyof typeof Types], never>

const isType = (type: unknown): TypeValue => {
  const typeStr = Object.prototype.toString.call(type)
  return Types[typeStr as keyof typeof Types]
}

const isArray = (arg: unknown): boolean => {
  return isType(arg) === 'Array'
}

const isObject = (arg: unknown): boolean => {
  return isType(arg) === 'Object'
}

const isString = (arg: unknown): boolean => {
  return isType(arg) === 'String'
}

const isNumber = (arg: unknown): boolean => {
  return isType(arg) === 'Number'
}

const isBoolean = (arg: unknown): boolean => {
  return isType(arg) === 'Boolean'
}

const isAsyncFunction = (arg: unknown): boolean => {
  return isType(arg) === 'AsyncFunction'
}

const isFunction = (arg: unknown): boolean => {
  return isAsyncFunction(arg) || isType(arg) === 'Function'
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
  return isType(arg) === 'Undefined'
}

const isNull = (arg: unknown): boolean => {
  return isType(arg) === 'Null'
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

export {
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
