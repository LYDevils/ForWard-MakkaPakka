# GitHub Fork Automatic Sync

这个模板用来让你的 fork 自动跟进原仓库更新，并自动开一个 PR 给你确认。

这个版本已经改成了自动识别分支：

- 自动读取原仓库实际存在的分支
- 默认按“同名分支”同步
- 原仓库以后新增分支时，会自动发现
- 如果你 fork 里还没有这个同名目标分支，会先自动创建
- 后续更新再自动开 PR

当前成品版已经直接指向：

- 原仓库：`MakkaPakka518/FW`

默认行为：

- 定时从原仓库抓最新内容
- 自动扫描原仓库分支列表
- 把每个上游分支刷新到你 fork 里的同步分支
- 每个同名目标分支各自创建或更新一个 PR
- 不会直接改你的目标分支

## 适合什么场景

- 你只是 fork 了别人的仓库，想定时跟上游更新
- 你在 fork 的目标分支上还有自己的提交
- 你想在网页上先看 diff，再决定要不要合并

## 文件

- 工作流模板：`.github/workflows/sync-upstream.yml`

## 使用方法

1. 把这个模板仓库里的 `.github/workflows/sync-upstream.yml` 复制到你的 fork 仓库同路径
## 当前成品版

工作流已经默认写成：

```yaml
env:
  UPSTREAM_REPO: MakkaPakka518/FW
  INCLUDE_BRANCH_REGEX: ".*"
  EXCLUDE_BRANCH_REGEX: ""
  PR_LABELS: upstream-sync,auto-sync
  PR_ASSIGNEES: ""
  PR_REVIEWERS: ""
```

## 你现在要改的

如果你要直接用，通常只需要改这几个公共变量：

```yaml
env:
  INCLUDE_BRANCH_REGEX: ".*"
  EXCLUDE_BRANCH_REGEX: ""
  PR_LABELS: upstream-sync,auto-sync
  PR_ASSIGNEES: ""
  PR_REVIEWERS: ""
```

比如：

```yaml
env:
  UPSTREAM_REPO: MakkaPakka518/FW
  INCLUDE_BRANCH_REGEX: ".*"
  EXCLUDE_BRANCH_REGEX: "^gh-pages$"
  PR_LABELS: upstream-sync,auto-sync
  PR_ASSIGNEES: your-github-name
  PR_REVIEWERS: your-github-name
```

如果你暂时不想自动指派，就保留空字符串：

```yaml
PR_ASSIGNEES: ""
PR_REVIEWERS: ""
```

4. 提交到你的 fork
5. 到 GitHub 的 `Actions` 页面手动运行一次，确认能成功

## 管理增强项

你现在还可以控制同步 PR 的管理方式：

```yaml
PR_LABELS: upstream-sync,auto-sync
PR_ASSIGNEES: your-github-name
PR_REVIEWERS: your-github-name
```

说明：

- `PR_LABELS`
  - 逗号分隔
  - 例如：`upstream-sync,auto-sync`
- `PR_ASSIGNEES`
  - 逗号分隔
  - 例如：`your-github-name`
- `PR_REVIEWERS`
  - 逗号分隔
  - 例如：`your-github-name`

如果你不需要，就留空：

```yaml
PR_ASSIGNEES: ""
PR_REVIEWERS: ""
```

## 定时频率

当前示例：

```yaml
schedule:
  - cron: "23 */6 * * *"
```

这表示每 6 小时跑一次，时间是 UTC。

如果你想每天同步一次，可以改成：

```yaml
schedule:
  - cron: "23 2 * * *"
```

## 它具体怎么工作

每次运行时，工作流会：

1. 读取原仓库的实际分支列表
2. 按规则过滤出允许同步的分支
3. 对每个分支生成一组映射：
   - `upstream_branch = 分支名`
   - `target_branch = 同名分支`
   - `sync_branch = sync/upstream/分支名`
4. 如果你的 fork 里还没有这个 `target_branch`，先自动创建
5. 刷新 `sync_branch`
6. 用 `sync_branch -> target_branch` 自动创建或更新 PR

这样你的目标分支不会被直接推改。
同时它还会：

- 自动补标签
- 自动指派 assignee
- 自动请求 reviewer

## 常见失败原因

### 1. Workflow 没有写权限

如果报权限错误，去仓库：

- `Settings`
- `Actions`
- `General`
- `Workflow permissions`

确保 `GITHUB_TOKEN` 允许：

- 写仓库内容
- 写 Pull requests

### 2. 原仓库和你的目标分支已经出现冲突

这种情况下，工作流通常还是能成功创建 PR。

只是 PR 页面会提示有冲突，需要你手动解决后再合并。

### 3. 已经有一个同步 PR 开着

这是正常的。

工作流会优先更新已有 PR，而不是重复开新 PR。

### 4. reviewer 或 assignee 设置失败

常见原因：

- 名字写错
- 对方不是这个仓库可用的 reviewer
- 仓库权限不允许

可以先把这两项留空，等同步跑通后再加：

```yaml
PR_ASSIGNEES: ""
PR_REVIEWERS: ""
```

### 5. 第一次发现一个新的上游分支时没有 PR

这是当前设计里的正常行为。

第一次发现新分支时，工作流会先：

- 在你的 fork 里创建同名目标分支
- 把它对齐到上游当前状态

因为这时目标分支和上游完全一致，所以不需要 PR。

这个分支后续再有更新时，就会自动开 PR。

## 不适合什么场景

如果你的目标就是“让 fork 永远完全等于原仓库”，这个模板不是最直接的。

那种情况更适合“直接同步”或“强制镜像”版本。

## 分支过滤

如果你想只同步部分分支，可以用正则：

```yaml
INCLUDE_BRANCH_REGEX: "^(main|dev|release.*)$"
EXCLUDE_BRANCH_REGEX: ""
```

比如排除 `gh-pages`：

```yaml
INCLUDE_BRANCH_REGEX: ".*"
EXCLUDE_BRANCH_REGEX: "^gh-pages$"
```

## 参考

- GitHub Docs: Syncing a fork  
  https://docs.github.com/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork
- GitHub Docs: Fork a repository  
  https://docs.github.com/articles/fork-a-repo
- GitHub Docs: Workflow syntax for GitHub Actions  
  https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions
- GitHub CLI: `gh pr create`  
  https://cli.github.com/manual/gh_pr_create
- GitHub CLI: `gh pr edit`  
  https://cli.github.com/manual/gh_pr_edit
