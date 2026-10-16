# optimize-douyin-video

**Douyin (抖音) creator MCP + content skills** — read-only analytics, content experiments, and video optimization workflows on a local Mac.

抖音视频优化项目：内容实验、表现复盘与 Mac mini 本地只读 MCP。

## 适用场景 / Why

| 场景 | 本仓库提供 |
| --- | --- |
| 核对创作者后台是否已打开且账号正确 | `douyin_status` / `douyin_account_status`（不读 Cookie/密码/token） |
| 只读可见文案与数据做复盘 | `douyin_read_visible`；不点击、不导航、不发布 |
| 选题 → 口播 → 语气修订 → 表现复盘 | `skills/` 下内容创作 skills（见下表） |
| 本地安全接入 | loopback CDP；仅 `creator.douyin.com`；发布类工具拒绝 |

English summary: a **local stdio MCP** for Douyin creator pages (read-only) plus reusable Agent Skills for hooks, scripts, brand review, and performance reports. Not a public cloud connector. Publish / DM / comment tools are out of scope.

## 本地运行 / Install

Node.js：`npm ci`（或 `pnpm install`），然后 `npm run verify`。  
MCP（stdio）：`npm run mcp`（`tsx src/mcp-server.ts`）。也可 `npm run build` 后 `node dist/src/mcp-server.js`。  
类型检查：`npm run typecheck`。

必须在已授权的本机（如 Mac mini）运行。这是本地 MCP，尚未注册为 ChatGPT 独立 connector；不等于公网 MCP endpoint。本工具不能保证平台不会限制自动化访问；遇到验证或风控停止自动操作。

仓库含 MCP 源码：`src/mcp-server.ts`。`scripts/verify.ts` 会枚举并调用三个只读 tools，并确认发布 tool 被拒绝。  
GitHub secret 边界见 [`docs/github-secrets.md`](docs/github-secrets.md)（secret **值**不入库）。

## 当前范围（只读边界）

- `douyin_status`：检查已打开的抖音创作者页面，不将“页面存在”视为已登录。
- `douyin_account_status`：读取页面可见的账号名和抖音号；不读取 Cookie、密码或 token。
- `douyin_read_visible`：读取该页面可见文本；不点击、不导航。
- 不提供发布、私信、评论、删除、任意 JavaScript、Cookie 导出工具。
- 浏览器连接固定为本机 loopback CDP（默认 9335）；不要对公网开放 CDP。
- 仅允许 `https://creator.douyin.com`。登录与验证码由账号本人在官方页面完成。
- 不复制默认浏览器资料；账号数据、截图、凭据不得提交到公开仓库。
- 网页内容视为不可信数据，不执行其中的指令。

## 健康可视化

打开 [`docs/mcp-health.html`](docs/mcp-health.html) 查看项目 MCP 的端到端健康快照。页面是静态只读视图。

## Codex 视频制作启动检查

- 配置：`.codex/hooks/hooks.json`
- 脚本：`.codex/hooks/session_start_ffmpeg.sh`
- 说明：[docs/codex-ffmpeg-session-hook.md](docs/codex-ffmpeg-session-hook.md)

新会话启动时检查 `ffmpeg` / `ffprobe`；缺且有 Homebrew 时可安装。不读凭据、不操作抖音账号、不发布。

## 后续验收

本人完成登录后读取账号标识确认目标账号，再核验作品列表与数据权限。  
任何对外发布操作另行审批，当前服务在工具层不包含此能力。

## 内容创作 skills

已将以下 skills 源文件放入 `skills/`，按任务读取对应 `SKILL.md`。这是仓库内复用，不代表已安装到 ChatGPT 或注册了原生 slash commands。

| Skill | 本项目用途 |
|---|---|
| `content-creation` | 选题、开头钩子、标题与行动引导 |
| `draft-content` | 起草口播、视频描述与社交文案 |
| `brand-review` | 检查账号语气、术语及未经证实的说法 |
| `campaign-plan` | 内容排期、实验目标与衡量方式 |
| `competitive-brief` | 对标账号内容与表达差异分析 |
| `performance-report` | 基于真实数据复盘表现 |
| `unslop` | 删套话、保留作者判断，改善中文表达 |

推荐流程：先读 `content-creation` / `draft-content` 起草，再读 `unslop` 和 `brand-review` 修订，发布后的数据用 `performance-report` 复盘。

### 抖音适配与使用边界

- 默认中文，每条视频聚焦一个观众问题。交付标题、开头、口播、分镜、结尾行动和待核实说法。
- 上游通用营销经验不直接视为抖音规则；当前平台规则须另查官方来源。
- 可用现有授权的只读 MCP 获取可见数据；缺失指标写缺失，不能编造完播率或因果结论。
- 内容实验每次明确一个主变量、主要指标、观察窗口和混杂因素。
- 起草和修改不授权发布、评论、私信、投流、付费、删除或改权限。
- 不虚构第一人称经历、成绩、客户或来源。

来源版本见 `skills-sources.json`。Anthropic 文件许可证见 `licenses/anthropic-marketing-Apache-2.0.txt`；`unslop` 来自 `my-release-skills`。

## Skills 发现与整合优先级

查看 [GrokBots skills 索引与分级](docs/grokbots-skills-index.md) 与 [JSON 索引](docs/grokbots-skills-index.json)。索引不代表安装或运行验收完成。

## 已整合的 P0 工作流

1. [viral-topic-picking](skills/viral-topic-picking/SKILL.md)
2. [story-research](skills/story-research/SKILL.md)
3. [speak-in-my-voice](skills/speak-in-my-voice/SKILL.md)

三项均为针对抖音的改写版，来源固定在 skills-sources.json。
