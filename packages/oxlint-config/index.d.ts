import type { OxlintConfig } from 'oxlint'

// `index.json` provides every field below, so we widen to `Required` —
// consumers get concrete types (not `T | undefined`) for arrays like
// `plugins`, avoiding spurious "possibly undefined" errors on iteration.
declare const config: Required<OxlintConfig>

export default config
