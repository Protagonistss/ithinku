// JS entry — lets consumers `import ithinku from '@ithinku/oxfmt-config'`
// inside `oxfmt.config.ts`, instead of pointing `-c` at a node_modules path.
// The JSON file remains the single source of truth.
import config from './index.json' with { type: 'json' }

export default config
