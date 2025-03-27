module.exports = {
  semi: false,
  singleQuote: true,
  quoteProps: 'consistent',
  trailingComma: 'none',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: false,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  bracketSameLine: false,
  jsxSingleQuote: false,
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'css',
  embeddedLanguageFormatting: 'auto',
  singleAttributePerLine: false,
  overrides: [
    {
      files: '*.{json,json5}',
      options: {
        singleQuote: false,
        quoteProps: 'always',
        trailingComma: 'none'
      }
    }
  ]
} 