import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import { defineConfig } from 'rollup';

const config = defineConfig([
  // 主要的构建配置
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.esm.js',
        format: 'es',
        sourcemap: true,
      },
      {
        file: 'dist/index.umd.js',
        format: 'umd',
        name: 'Expr',
        sourcemap: true,
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: './dist',
        exclude: ['**/__tests__/**']
      })
    ]
  },
  // 类型定义构建配置
  {
    input: 'dist/index.d.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es'
    },
    plugins: [dts()],
  }
]);

export default config; 