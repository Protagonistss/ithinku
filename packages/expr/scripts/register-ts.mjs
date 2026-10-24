import { registerHooks } from 'node:module'
import path from 'node:path'

// Node 的类型剥离不会补全无后缀的相对路径。调试入口用这个 hook 把 ./foo 解析到 ./foo.ts。
const sourceExtensions = new Set(['.ts', '.tsx', '.js', '.mjs', '.cjs', '.json'])

registerHooks({
  resolve(specifier, context, nextResolve) {
    const isRelative = specifier.startsWith('./') || specifier.startsWith('../')
    if (isRelative && !sourceExtensions.has(path.extname(specifier))) {
      return nextResolve(`${specifier}.ts`, context)
    }
    return nextResolve(specifier, context)
  }
})
