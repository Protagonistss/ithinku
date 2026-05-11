const splitWords = (str: string): string[] => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/(\d)([a-zA-Z])/g, '$1 $2')
    .replace(/([a-zA-Z])(\d)/g, '$1 $2')
    .split(/[\s\-_]+/)
    .filter(word => word.length > 0)
    .map(word => word.toLowerCase())
}

const camelCase = (str: string): string => {
  const words = splitWords(str)
  if (words.length === 0) return ''
  return words.reduce((result, word, index) => {
    if (index === 0) return word
    return result + word.charAt(0).toUpperCase() + word.slice(1)
  }, '')
}

const kebabCase = (str: string): string => {
  return splitWords(str).join('-')
}

const snakeCase = (str: string): string => {
  return splitWords(str).join('_')
}

const pascalCase = (str: string): string => {
  return splitWords(str)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

const capitalize = (str: string): string => {
  if (str.length === 0) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const truncate = (
  str: string,
  options?: { length?: number; suffix?: string }
): string => {
  const { length = str.length, suffix = '...' } = options ?? {}
  if (str.length <= length) return str
  const suffixLen = suffix.length
  if (length <= suffixLen) return suffix.slice(0, length)
  return str.slice(0, length - suffixLen) + suffix
}

const template = (str: string, data: Record<string, unknown>): string => {
  return str.replace(/\{(\w+)\}/g, (match, key: string) => {
    return key in data ? String(data[key]) : match
  })
}

const mask = (
  str: string,
  options?: { start?: number; end?: number; char?: string }
): string => {
  const { start = 0, end = 0, char = '*' } = options ?? {}
  if (str.length === 0) return ''
  if (start === 0 && end === 0) return char.repeat(str.length)
  const visibleStart = Math.max(0, start)
  const visibleEnd = Math.max(0, end)
  const maskedLen = Math.max(0, str.length - visibleStart - visibleEnd)
  return str.slice(0, visibleStart) + char.repeat(maskedLen) + str.slice(str.length - visibleEnd)
}

const trim = (str: string): string => {
  return str.replace(/\s+/g, ' ').trim()
}

const words = (str: string): string[] => {
  return splitWords(str)
}

const countChars = (str: string): number => {
  return Array.from(str).length
}

export {
  camelCase,
  kebabCase,
  snakeCase,
  pascalCase,
  capitalize,
  truncate,
  template,
  mask,
  trim,
  words,
  countChars
}
