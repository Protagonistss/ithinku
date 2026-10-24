import { createRequire } from 'node:module'
import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'

const require = createRequire(import.meta.url)
const config = require('../index.js')

async function lint(code, filePath) {
  const eslint = new ESLint({
    cwd: import.meta.dirname,
    overrideConfigFile: true,
    overrideConfig: config
  })
  const [result] = await eslint.lintText(code, { filePath })
  return result
}

describe('@ithinku/eslint-config-base', () => {
  it('检查 JS 时不崩溃，并且规则会生效', async () => {
    const result = await lint('console.log(1)\n', 'example.js')
    expect(result.fatalErrorCount).toBe(0)
    expect(result.messages.some(message => message.ruleId === 'no-console')).toBe(true)
  })

  it('检查 JSON 时不产生 fatal 错误', async () => {
    const result = await lint('{ "name": "demo" }\n', 'example.json')
    expect(result.fatalErrorCount).toBe(0)
  })

  it('检查 YAML 时不产生 fatal 错误', async () => {
    const result = await lint('name: demo\n', 'example.yml')
    expect(result.fatalErrorCount).toBe(0)
  })
})
