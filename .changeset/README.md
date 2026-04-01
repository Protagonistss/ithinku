# Changesets

Workflow:

1. Add a changeset
   - `pnpm changeset`
2. Version packages
   - `pnpm changeset:version`
3. Build and publish
   - `pnpm release`

Notes:
 - `pnpm changeset:publish` runs `changeset publish` without building.
