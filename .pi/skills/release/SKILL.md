---
name: release
description: 在本 Changesets monorepo 中创建符合版本规则的 changeset。用于记录变更、升级版本号。强制 patch 为默认版本级别，除非用户明确指定 minor/major 或具体版本号。实际的 PR 合并、release PR、publish 在 GitHub 上操作。
---

# Release / Changeset

本仓库用 Changesets 管理版本与发布。本 skill **只负责创建符合版本规则的 changeset**；实际的 PR 合并、release PR、publish 都在 GitHub 上操作（不代劳，避免操作事故）。

## ⚠️ 版本规则（强制，不可违反）

> **所有 changeset 默认使用 `patch` 级别**（如 `0.1.0 → 0.1.1`）。
>
> 只有当用户**明确指定**（如「用 minor」「发 1.0.0」「升次版本」）时，才使用 `minor` / `major` 或给定具体版本号。
>
> 项目处于 `0.0.x` 早期阶段，所有发布按最小幅度递增。**禁止擅自使用 `minor` / `major`。**
>
> npm 版本号一经发布即**永久占用、不可删除**——版本规则务必遵守。

## 创建 changeset

```bash
pnpm changeset
```

交互式选择：
- **包**：勾选受影响的包
- **级别：选 `patch`**（强制默认；仅当用户明确指定时才选其他）
- **摘要**：简述变更

生成的 `.changeset/*.md` 内容示例（patch 级别）：

```markdown
---
"@ithinku/<包名>": patch
---

<变更摘要>
```

## 提交 changeset

```bash
git add .changeset/
git commit -m "chore: add changeset"
```

changeset 文件随常规 PR 一起提交即可。

## 后续发布（在 GitHub 操作，无需 agent）

changeset 进 main 后，Changesets 会自动处理版本与发布：

1. 在 GitHub 合并 dev → main 的 PR
2. Changesets 自动开「Version Packages」release PR（基于 main）
3. 在 GitHub 合并该 release PR → 自动 publish 到 npm

> 发布是**两段式**：代码进 main 不会直接发，必须再合并 release PR 才 publish。若「代码已合并但没发布」，多半是 release PR 没合并。

## 确认发布（可选）

`npm view` 对新包/新版本有传播延迟（可能 404 数分钟），需用 registry 源头确认：

```bash
curl -s "https://registry.npmjs.org/@ithinku/<包名>" \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print('latest:', d.get('dist-tags',{}).get('latest')); print('versions:', list(d.get('versions',{})))"
```
