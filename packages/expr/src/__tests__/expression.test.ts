import { Expression } from '../index'

describe('Expression', () => {
  it('should evaluate simple arithmetic', () => {
    expect(Expression.evaluate('2 + 3')).toBe(5)
    expect(Expression.evaluate('2 * 3')).toBe(6)
    expect(Expression.evaluate('10 - 4')).toBe(6)
    expect(Expression.evaluate('15 / 3')).toBe(5)
  })

  it('should evaluate expressions with variables', () => {
    const context = { x: 10, y: 5 }
    expect(Expression.evaluate('x + y', context)).toBe(15)
    expect(Expression.evaluate('x * y', context)).toBe(50)
    expect(Expression.evaluate('x - y', context)).toBe(5)
    expect(Expression.evaluate('x / y', context)).toBe(2)
  })

  it('should evaluate nested expressions', () => {
    expect(Expression.evaluate('2 * (3 + 4)')).toBe(14)
    expect(Expression.evaluate('(2 + 3) * (4 - 1)')).toBe(15)
  })

  it('should evaluate expressions with nested object properties', () => {
    const context = {
      user: {
        score: 100,
        stats: {
          multiplier: 2
        }
      }
    }

    expect(
      Expression.evaluate('user.score * user.stats.multiplier', context)
    ).toBe(200)
  })

  it('should handle operator precedence', () => {
    expect(Expression.evaluate('2 + 3 * 4')).toBe(14)
    expect(Expression.evaluate('(2 + 3) * 4')).toBe(20)
    expect(Expression.evaluate('10 - 2 * 3')).toBe(4)
  })

  it('should throw error for invalid expressions', () => {
    expect(() => Expression.evaluate('2 +')).toThrow()
    expect(() => Expression.evaluate('* 2')).toThrow()
  })

  it('should throw error for undefined variables', () => {
    expect(() => Expression.evaluate('x + 1')).toThrow('Undefined variable: x')
  })

  it('should throw error for invalid property access', () => {
    const context = { x: 10 }
    expect(() => Expression.evaluate('x.y', context)).toThrow(
      'Cannot access property y of number'
    )
  })
})
