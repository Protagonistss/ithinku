const flat = (arr: unknown[]): unknown[] => {
  return arr.flat()
}

const unique = <T>(arr: T[]): T[] => {
  return [...new Set(arr)]
}

const sort = (arr: number[]): number[] => {
  return [...arr].sort((a, b) => a - b)
}

const sum = (arr: number[]): number => {
  return arr.reduce((a, b) => a + b, 0)
}

const avg = (arr: number[]): number => {
  if (arr.length === 0) return 0
  return sum(arr) / arr.length
}

const max = (arr: number[]): number | undefined => {
  if (arr.length === 0) return undefined
  return Math.max(...arr)
}

const min = (arr: number[]): number | undefined => {
  if (arr.length === 0) return undefined
  return Math.min(...arr)
}

const mode = (arr: number[]): number[] => {
  if (arr.length === 0) return []
  const counts = new Map<number, number>()
  let maxCount = 0

  for (const num of arr) {
    const count = (counts.get(num) || 0) + 1
    counts.set(num, count)
    maxCount = Math.max(maxCount, count)
  }

  return [...counts.entries()]
    .filter(([_, count]) => count === maxCount)
    .map(([num]) => num)
}

const median = (arr: number[]): number | undefined => {
  if (arr.length === 0) return undefined
  const sorted = [...arr].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)

  if (sorted.length % 2 !== 0) {
    return sorted[mid]
  }

  const left = sorted[mid - 1]
  const right = sorted[mid]

  if (left === undefined || right === undefined) {
    return undefined
  }

  return (left + right) / 2
}

const len = (arr: unknown[]): number => {
  return arr.length
}

const objToArr = <T extends Record<string, unknown>>(
  obj: T
): Array<[string, T[keyof T]]> => {
  return Object.entries(obj) as Array<[string, T[keyof T]]>
}

const arrToObj = <T>(arr: Array<[string, T]>): Record<string, T> => {
  return Object.fromEntries(arr)
}

const arrToStr = (arr: unknown[], separator = ','): string => {
  return arr.join(separator)
}

const strToArr = (str: string, separator = ','): string[] => {
  return str.split(separator)
}

export {
  flat,
  unique,
  len,
  sort,
  sum,
  avg,
  max,
  min,
  mode,
  median,
  objToArr,
  arrToObj,
  arrToStr,
  strToArr
}
