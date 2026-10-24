import { createRequire } from 'node:module'
import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'

const require = createRequire(import.meta.url)
const config = require('../index.js')

describe('@ithinku/eslint-config-ts', () => {
  it('检查 TypeScript 时不产生 fatal 错误', async () => {
    const eslint = new ESLint({
      cwd: import.meta.dirname,
      overrideConfigFile: true,
      overrideConfig: config
    })
    const [result] = await eslint.lintText('export const value = 1\n', { filePath: 'example.ts' })
    expect(result.fatalErrorCount).toBe(0)
    expect(result.messages.some(message => message.fatal)).toBe(false)
  })
})
