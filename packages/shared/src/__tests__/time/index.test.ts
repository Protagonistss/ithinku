import { describe, it, expect } from 'vitest'
import { format } from '../../index'

describe('time utils', () => {
  describe('format', () => {
    it('should format timestamp with default format', () => {
      const timestamp = new Date('2023-12-25 13:14:15').getTime()
      expect(format(timestamp)).toBe('2023-12-25 13:14:15')
    })

    it('should format timestamp with custom date format', () => {
      const timestamp = new Date('2023-12-25').getTime()
      expect(format(timestamp, { format: 'YYYY-MM-DD' })).toBe('2023-12-25')
      expect(format(timestamp, { format: 'YYYY-MM' })).toBe('2023-12')
      expect(format(timestamp, { format: 'YYYY' })).toBe('2023')
    })

    it('should format timestamp with custom time format', () => {
      const timestamp = new Date('2023-12-25 13:14:15').getTime()
      expect(format(timestamp, { format: 'HH:mm:ss' })).toBe('13:14:15')
      expect(format(timestamp, { format: 'HH:mm' })).toBe('13:14')
      expect(format(timestamp, { format: 'HH' })).toBe('13')
    })

    it('should pad single digit numbers with leading zero', () => {
      const timestamp = new Date('2023-01-05 09:08:07').getTime()
      expect(format(timestamp)).toBe('2023-01-05 09:08:07')
    })
  })
})