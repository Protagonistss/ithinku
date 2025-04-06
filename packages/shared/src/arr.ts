const flat = (arr: unknown[]):unknown[] => {
  return arr.flat()
}

const unique = <T>(arr: T[]):T[] => {
  return [...new Set(arr)]
}

const sort = (arr: number[]):number[] => {
  return arr.sort((a, b) => a - b)
}

const sum = (arr: number[]):number => {
  return arr.reduce((a, b) => a + b, 0)
}

const avg = (arr: number[]):number => {
  return arr.reduce((a, b) => a + b, 0) / arr.length
}

// 数组求平均值


// 数组求最大值


// 数组求最小值


// 数组求众数

// 数组求中位数


const len = (arr: unknown[]):number => {
  return arr.length
}

// 对象转数组


// 数组转对象

// 数组转字符串


// 字符串转数组
export {
  flat,
  unique,
  len,
  sort,
  sum,
  avg
}