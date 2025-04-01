enum Types {
  Array = '[object Array]',
  Object = '[object Object]',
  String = '[object String]',
  Number = '[object Number]',
  Boolean = '[object Boolean]',
  Function = '[object Function]',
  Symbol = '[object Symbol]',
  Date = '[object Date]',
  RegExp = '[object RegExp]',
  Error = '[object Error]',
  Promise = '[object Promise]',
  Map = '[object Map]',
  Set = '[object Set]',
  WeakMap = '[object WeakMap]',
  WeakSet = '[object WeakSet]',
  BigInt = '[object BigInt]',
  Undefined = '[object Undefined]',
  Null = '[object Null]',
  BigInt64Array = '[object BigInt64Array]',
  BigUint64Array = '[object BigUint64Array]',
  Float32Array = '[object Float32Array]',
  Float64Array = '[object Float64Array]',
  Int8Array = '[object Int8Array]',
  Int16Array = '[object Int16Array]'
}

const isType = (type: unknown) => {
  const typeStr = Object.prototype.toString.call(type)
  return Types[typeStr as keyof typeof Types]
}

isType([])

const isArr = () => {

}

export {
  isArr
}