type YearFormat = 'YYYY'
type MonthFormat = 'MM'  
type DayFormat = 'DD'
type HourFormat = 'HH'
type MinuteFormat = 'mm'
type SecondFormat = 'ss'

type DateFormat = 
  | YearFormat
  | `${YearFormat}-${MonthFormat}` 
  | `${YearFormat}-${MonthFormat}-${DayFormat}`

type TimeFormat = 
  | HourFormat
  | `${HourFormat}:${MinuteFormat}`
  | `${HourFormat}:${MinuteFormat}:${SecondFormat}`

type Format = DateFormat | TimeFormat | `${DateFormat} ${TimeFormat}`
interface FormatOptions {
  format?: Format,
  timezone?: string
}

const defaultFormat = 'YYYY-MM-DD HH:mm:ss'

const padStart = (num: number): string => {
  return num.toString().padStart(2, '0')
}

const format = (timestamp: number, options: FormatOptions = {}): string => {
  const date = new Date(timestamp)
  const fmtStr = options.format || defaultFormat

  const year = date.getFullYear()
  const month = padStart(date.getMonth() + 1)
  const day = padStart(date.getDate())
  const hours = padStart(date.getHours())
  const minutes = padStart(date.getMinutes())
  const seconds = padStart(date.getSeconds())

  return fmtStr
    .replace('YYYY', year.toString())
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

export {
  format
}