// JS entry — lets consumers `import ithinku from '@ithinku/oxlint-config'`
// inside `oxlint.config.ts`, instead of pointing `extends` at a node_modules path.
// The JSON file remains the single source of truth.
import config from './index.json' with { type: 'json' }

export default config
