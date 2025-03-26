# iThinkU

A collection of utility packages.

## Packages

- `@ithinku/expr`: A TypeScript expression parser library
- `@ithinku/eslint-config-base`: Base ESLint configuration for iThinkU projects

## Development

### Prerequisites

- Node.js >= 14
- pnpm
- npm account with access to publish packages

### Setup

```bash
# Install dependencies
pnpm install

# Build packages
pnpm run build

# Run tests
pnpm run test

# Run linting
pnpm run lint
```

## Publishing

This project uses Lerna for package publishing. Each package can be published independently with its own version.

### Publishing All Packages

```bash
pnpm run release
```

This will:
1. Check which packages need to be updated
2. Prompt for version numbers for each package
3. Create git tags
4. Publish to npm

### Publishing Specific Package

```bash
# Publish @ithinku/expr
lerna publish --scope=@ithinku/expr

# Publish @ithinku/eslint-config-base
lerna publish --scope=@ithinku/eslint-config-base
```

### Publishing Specific Version

```bash
# Publish specific version
lerna publish --scope=@ithinku/expr 1.0.0
```

### Publishing Options

```bash
# Skip version prompts
lerna publish --yes

# Skip git operations
lerna publish --skip-git

# Skip npm publish
lerna publish --skip-npm

# Force publish all packages
lerna publish --force-publish
```

### Publishing Workflow

1. Make code changes
2. Commit changes
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```
3. Run tests and linting
   ```bash
   pnpm run test
   pnpm run lint
   ```
4. Build packages
   ```bash
   pnpm run build
   ```
5. Publish
   ```bash
   pnpm run release
   ```

### Version Management

- Each package can have its own version
- Versions follow semantic versioning
- Version types are determined by commit messages:
  - `feat:` - New feature (minor)
  - `fix:` - Bug fix (patch)
  - `BREAKING CHANGE:` - Breaking change (major)

### Troubleshooting

If publishing fails:
1. Check npm permissions
2. Ensure all tests pass
3. Verify package.json versions
4. Check git status
5. Try with `--skip-npm` to test without publishing

## License

MIT