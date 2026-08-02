---
"@ithinku/oxlint-config": minor
---

Remove the ineffective `plugins` override for test files. Oxlint activates rules via `categories` / `rules`, not by merely listing a plugin — and `categories` is not supported at the override level — so the previous `plugins: [oxc, typescript, unicorn, jest, vitest]` enabled **zero** extra rules (a silent no-op that gave a false sense of test-file coverage). The test-file `env` globals (`jest`, `vitest`) are retained so `describe` / `it` / `expect` are not flagged as undefined. README updated to match.
