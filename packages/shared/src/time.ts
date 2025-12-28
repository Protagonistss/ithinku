type YearFormat = 'YYYY'
type MonthFormat = 'MM'  
type DayFormat = 'DD'
type HourFormat = 'HH'
type MinuteFormat = 'mm'
type SecondFormat = 'ss'
type MillisecondFormat = 'SSS'

type DateFormat =
  | YearFormat
  | `${YearFormat}-${MonthFormat}` 
  | `${YearFormat}-${MonthFormat}-${DayFormat}`

type TimeFormat =
  | HourFormat
  | `${HourFormat}:${MinuteFormat}`
  | `${HourFormat}:${MinuteFormat}:${SecondFormat}`

type TimeFormatWithMillis = `${HourFormat}:${MinuteFormat}:${SecondFormat}.${MillisecondFormat}`
type DateTimeFormat = `${DateFormat} ${TimeFormat | TimeFormatWithMillis}`
type Format = DateFormat | TimeFormat | TimeFormatWithMillis | DateTimeFormat | string // 放宽类型限制以支持任意格式字符串，如 "YYYY年MM月"

interface FormatOptions {
  format?: Format,
  // 暂未完全实现时区转换，但预留接口
  timezone?: string
}

const defaultFormat = 'YYYY-MM-DD HH:mm:ss'

const padStart = (num: number, len = 2): string => {
  return num.toString().padStart(len, '0')
}

const format = (timestamp: number | Date | string, options: FormatOptions = {}): string => {
  const date = new Date(timestamp)
  
  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid Date')
  }

  const fmtStr = options.format || defaultFormat

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const milliseconds = date.getMilliseconds()

  const matches: Record<string, string> = {
    YYYY: year.toString(),
    MM: padStart(month),
    DD: padStart(day),
    HH: padStart(hours),
    mm: padStart(minutes),
    ss: padStart(seconds),
    SSS: padStart(milliseconds, 3)
  }

  return fmtStr.replace(/YYYY|MM|DD|HH|mm|ss|SSS/g, match => matches[match] ?? match)
}

export {
  format
}
