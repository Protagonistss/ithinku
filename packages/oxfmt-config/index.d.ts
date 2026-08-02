import type { OxfmtConfig } from 'oxfmt'

// `index.json` provides every field below, so we widen to `Required` —
// consumers get `string[]` (not `string[] | undefined`) for arrays like
// `ignorePatterns`, avoiding spurious "possibly undefined" errors on iteration.
declare const config: Required<OxfmtConfig>

export default config
