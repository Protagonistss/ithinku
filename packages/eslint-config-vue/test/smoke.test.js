import { createRequire } from 'node:module'
import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'

const require = createRequire(import.meta.url)
const config = require('../index.js')

const source = `<script setup lang="ts">
const count = 1
</script>

<template>
  <p>{{ count }}</p>
</template>
`

describe('@ithinku/eslint-config-vue', () => {
  it('检查 Vue 单文件组件时不产生 fatal 错误', async () => {
    const eslint = new ESLint({
      cwd: import.meta.dirname,
      overrideConfigFile: true,
      overrideConfig: config
    })
    const [result] = await eslint.lintText(source, { filePath: 'example.vue' })
    expect(result.fatalErrorCount).toBe(0)
    expect(result.messages.some(message => message.fatal)).toBe(false)
  })
})
