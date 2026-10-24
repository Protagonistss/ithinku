import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import dts from 'rollup-plugin-dts'
import { defineConfig } from 'rollup'
import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync(new URL('package.json', import.meta.url)))

// 类型由 rollup-plugin-dts 从入口统一打包，避免把每个源文件的 .d.ts 发布出去
export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.build.json',
        declaration: false,
        declarationMap: false,
        exclude: ['**/__tests__/**']
      })
    ]
  },
  {
    input: 'src/index.ts',
    output: [{ file: pkg.types, format: 'es' }],
    plugins: [dts()]
  }
])
