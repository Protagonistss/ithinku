import { createRequire } from 'node:module'

import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'

const require = createRequire(import.meta.url)
const config = require('../index.js')

const source = `export function Demo() {
  return <div>ok</div>
}
`

describe('@ithinku/eslint-config-react', () => {
  it('检查 JSX 时不产生 fatal 错误', async () => {
    const eslint = new ESLint({
      cwd: import.meta.dirname,
      overrideConfigFile: true,
      overrideConfig: [
        ...config,
        {
          settings: {
            react: {
              version: '19.0'
            }
          }
        }
      ]
    })
    const [result] = await eslint.lintText(source, { filePath: 'example.jsx' })
    expect(result.fatalErrorCount).toBe(0)
    expect(result.messages.some((message) => message.fatal)).toBe(false)
  })
})
