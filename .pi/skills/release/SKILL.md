---
name: release
description: 在本 pnpm + Changesets monorepo 中发布包（dev→main PR→release PR→publish）。用于发版、升级版本号、创建 release。强制 patch 为默认版本级别，除非用户明确指定 minor/major 或具体版本号。
---

# Release（发布流程）

本仓库：pnpm workspace + Changesets，发布走 **dev → main → release PR → publish**。

## ⚠️ 版本规则（强制，不可违反）

> **所有 changeset 默认使用 `patch` 级别**（如 `0.1.0 → 0.1.1`）。
>
> 只有当用户**明确指定**（如「用 minor」「发 1.0.0」「升次版本」）时，才使用 `minor` / `major` 或给定具体版本号。
>
> 项目处于 `0.0.x` 早期阶段，所有发布按最小幅度递增。**禁止擅自使用 `minor` / `major`。**
>
> npm 版本号一经发布即**永久占用、不可删除**——版本规则务必遵守，避免误操作。

## 前置检查（每次发布前必做）

```bash
git status --short                                       # 应为空（工作树干净）
git fetch origin dev && git log origin/dev..dev --oneline  # 应为空（与远程同步）
gh run list --workflow=ci.yml --branch dev --limit 1      # dev CI 应为 success
ls .changeset/*.md | grep -v README                       # 应有待发布的 changeset
```

若 dev 有未推送的改动：先提交推送，等 dev CI 通过再继续。

## 创建 changeset（如尚未存在）

```bash
pnpm changeset
```

- **包**：勾选受影响的包
- **级别：选 `patch`**（强制默认；用户明确指定时才选其他）
- **摘要**：简述变更

```bash
git add -A && git commit -m "chore: add changeset" && git push origin dev
```

## 发布流程

### 1. 创建并合并 dev → main PR

```bash
gh pr create --base main --head dev --title "<conventional commit 标题>"
# 等 dev CI 通过（gh pr checks <PR编号> 全绿）
gh pr merge <PR编号> --merge   # ⚠️ dev→main 禁止 --delete-branch（dev 是长期分支）
```

### 2. 等待 release PR（Changesets 自动创建）

合并 dev→main 后，`release.yml` 在 main 触发。当存在 pending changeset 时，Changesets 会自动开一个「Version Packages」PR（分支 `changeset-release/main`）。

```bash
gh run list --workflow=release.yml --limit 1          # 找到 release run
gh run watch <release-run-id> --exit-status
gh pr list --state open --head changeset-release/main  # 找到 release PR
```

### 3. 合并 release PR → 触发 publish

```bash
gh pr merge <release-PR编号> --merge --delete-branch
gh run list --workflow=release.yml --limit 1          # 找到 publish run
gh run watch <publish-run-id> --exit-status
```

### 4. 确认发布（关键：用 registry 源头，避免传播延迟误判）

`npm view` 对新包/新版本有传播延迟（可能 404 数分钟），**必须用 registry 源头确认**：

```bash
curl -s "https://registry.npmjs.org/@ithinku/<包名>" \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print('latest:', d.get('dist-tags',{}).get('latest')); print('versions:', list(d.get('versions',{})))"
```

## 注意事项

- main 上的 release run 行为：**有 pending changeset → 开 release PR**；**无 pending changeset 但存在未发布版本 → 直接 publish**。
- 本仓库 `.npmrc` 走 npmmirror 镜像，`npm view` 有镜像同步延迟；确认发布时**始终**用官方源 `--registry https://registry.npmjs.org` 或直接 `curl` registry 源头。
- 发布是**两段式**：代码进 main 不会直接发，必须再合并 release PR 才 publish。若发现「代码已合并但没发布」，多半是 release PR 没合并。
- **`gh pr merge` 的 `--delete-branch` 只用于临时分支**（如 `changeset-release/main`）。**dev→main PR 永远不要加 `--delete-branch`**——dev 是长期开发分支，加了会被删除。
