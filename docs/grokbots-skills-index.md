# GrokBots skills 索引与分级

审阅日期：2026-10-16。固定源码版本：`ae8dce0adfb6551cd782247eab520f80d407e31b`。

完整目录树扫描：572 项 / 428 个文件 / 30 份 SKILL.md / 53 份 built-in-skills 文档。下表覆盖全部 30 个 skill 入口，另列 7 个重点模块。并非 428 个文件都已逐行审计。深读重点为选题、口播、录屏、动画、编码与依赖接口。

来源仓库为私有仓库，链接需要原有权限；索引保留源码定位；本次按仓库所有者要求仅提炼改写三个 P0 工作流，不包含账号配置、运行日志或凭据。机器可读版本：[grokbots-skills-index.json](grokbots-skills-index.json)。

## 推荐执行顺序

1. P0：先适配 viral-topic-picking、speak-in-my-voice、story-research，串成选题 → 口播 → 分镜。
2. P1：按内容选择真实录屏或动画；补依赖后完成一段 9:16 成片验收。
3. P2：复用已有营销技能，按需引入站外传播能力。
4. P3：基础设施及其他项目专用技能暂缓。

P0/P1 是整合优先级，不代表发现了生产事故。三个 P0 已适配入库并通过格式与链接检查；其他候选仍为源码评估。均未做成片或手机排版验收，不代表安装到 ChatGPT。

## 已核实的整合问题

- 6 个 marketing skills 与本仓库已有内容重复：content-creation 完全一致，其余五个保留相同正文并追加连接器附录，不重复引入。
- animated-video 指定 animations-v3.jsx；本地 gen-video 默认要求 window.__animStage，而读取的 v3 文件未声明这个桥接。需要适配并实测。
- gen-video 的 encode.ts 只接受 PNG 帧，没有音轨输入与混合；宿主文档描述的音频能力不等于本地 CLI 已实现。
- record-production-feature 的 ui-demo 依赖不在此次目录树内；强制英文 UI、全量试抠图等规则来自 ChatCut 场景，不应直接扩展到所有抖音内容。
- selfmedia-mcp 此处只有 verifier 文档，没有它引用的 server.py / verify.py，不能据此宣称账号数据接口已就绪。
- viral-topic-picking 的四问和老书要求是创作方法，不是已验证的流量保证或科学定律。

## 完整分级

| 优先级 | Skill / 模块 | 状态 | 用途 | 下一步 / 边界 |
|---|---|---|---|---|
| P3 | [verify](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/daily-brief/verify/SKILL.md) | 暂缓 | 基础设施或项目专用参考 | 不纳入抖音创作主链 |
| P1 | [record-production-feature](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/feature-recorder/skills/record-production-feature/SKILL.md) | 依赖未齐 | 真实产品录屏与 MP4/GIF | 补齐 ui-demo；拆出 ChatCut 英文 UI、抠图、Mac mini 专属约束 |
| P1 | [baoyu-design](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/github-cover-bot/skills/baoyu-design/SKILL.md) | 接口待修 | 动画、封面、画板与视频导出 | 重点接通 animations-v3 与 gen-video；音轨需单独实现并验收 |
| P1 | [selfmedia-mcp](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/grok-bot/verify/selfmedia-mcp/SKILL.md) | 参考方法 | 只读账号数据验收 | 本仓库缺其 server.py / verify.py；提炼验收标准，不视为可运行 MCP |
| P3 | [verify-mcp](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/grokbotwaker/skills/verify-mcp/SKILL.md) | 暂缓 | 基础设施或项目专用参考 | 不纳入抖音创作主链 |
| P2 | [product-photo-fetch](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/just-chat-bot/skills/product-photo-fetch/SKILL.md) | 条件复用 | 产品图素材搜集 | 获取图片不等于获得再发布许可 |
| P2 | [seo-geo-opc](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/just-chat-bot/skills/seo-geo-opc/SKILL.md) | 待核实 | 网站 SEO/GEO | 核实平台能力和引用；仅用于外部落地页 |
| P2 | [grok-skill-creator-cowork-style](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/liu-s-assitant/skills/grok-skill-creator-cowork-style/SKILL.md) | 条件复用 | skill 评估与迭代 | 映射当前工具；不自动调用 Grokbot |
| P3 | [mini-svg-open-pr-board](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/liu-s-assitant/skills/mini-svg-open-pr-board/SKILL.md) | 暂缓 | 基础设施或项目专用参考 | 不纳入抖音创作主链 |
| P2 | [brand-review](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/marketing-bot/skills/brand-review/SKILL.md) | 已覆盖 | 已导入的通用营销能力 | 正文与已导入版本一致，仅追加连接器附录 |
| P2 | [campaign-plan](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/marketing-bot/skills/campaign-plan/SKILL.md) | 已覆盖 | 已导入的通用营销能力 | 正文与已导入版本一致，仅追加连接器附录 |
| P2 | [competitive-brief](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/marketing-bot/skills/competitive-brief/SKILL.md) | 已覆盖 | 已导入的通用营销能力 | 正文与已导入版本一致，仅追加连接器附录 |
| P2 | [content-creation](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/marketing-bot/skills/content-creation/SKILL.md) | 已覆盖 | 已导入的通用营销能力 | 正文完全一致，无需复制 |
| P2 | [draft-content](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/marketing-bot/skills/draft-content/SKILL.md) | 已覆盖 | 已导入的通用营销能力 | 正文与已导入版本一致，仅追加连接器附录 |
| P2 | [email-sequence](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/marketing-bot/skills/email-sequence/SKILL.md) | 低关联 | 邮件内容序列 | 仅在站外转化需求明确时使用 |
| P2 | [performance-report](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/marketing-bot/skills/performance-report/SKILL.md) | 已覆盖 | 已导入的通用营销能力 | 正文与已导入版本一致，仅追加连接器附录 |
| P3 | [claude-design-reference](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/mbp-monitor/skills/claude-design-reference/SKILL.md) | 暂缓 | 基础设施或项目专用参考 | 不纳入抖音创作主链 |
| P3 | [claude-skill-design](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/mbp-monitor/skills/claude-skill-design/SKILL.md) | 暂缓 | 基础设施或项目专用参考 | 不纳入抖音创作主链 |
| P3 | [verify](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/paperradar/verify/SKILL.md) | 暂缓 | 基础设施或项目专用参考 | 不纳入抖音创作主链 |
| P0 | [speak-in-my-voice](../skills/speak-in-my-voice/SKILL.md) | 已适配入库 | 个人口吻与照念稿 | 按实际 brief 使用；成片与手机排版需实测 |
| P2 | [yc-pitch-customer](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/pitch-bot/skills/yc-pitch-customer/SKILL.md) | 低关联 | 客户访谈、销售话术 | 只提炼表达方法；不引入会议 app 和定时录音流程 |
| P2 | [seo-audit](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/seo-audit/skills/seo-audit/SKILL.md) | 低关联 | 网站 SEO | 不把网页 SEO 当作抖音推荐算法优化 |
| P3 | [archifax](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/shared-skills/archifax/SKILL.md) | 暂缓 | 基础设施或项目专用参考 | 不纳入抖音创作主链 |
| P3 | [clash-node-probe](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/shared-skills/clash-node-probe/SKILL.md) | 暂缓 | 基础设施或项目专用参考 | 不纳入抖音创作主链 |
| P0 | [viral-topic-picking](../skills/viral-topic-picking/SKILL.md) | 已适配入库 | 选题、钩子、六段口播 | 按实际 brief 使用；成片与手机排版需实测 |
| P2 | [yc-pitch](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/shared-skills/yc-pitch/SKILL.md) | 低关联 | 项目价值表达 | 只提炼叙事结构，不复制融资流程 |
| P3 | [tailscale-site-monitor](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/tailnetbot/skills/tailscale-site-monitor/SKILL.md) | 暂缓 | 基础设施或项目专用参考 | 不纳入抖音创作主链 |
| P1 | [eli5-gen-gb](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/voice-call-setter/skills/eli5-gen-gb/SKILL.md) | 待适配 | 图解分镜 | 映射当前 image tool；另补旁白、剪辑与合成 |
| P1 | [eli5-svg-gb](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/voice-call-setter/skills/eli5-svg-gb/SKILL.md) | 待适配 | 可编辑 SVG 图解 | 保留 SVG/PNG 源；另补动画与视频合成 |
| P2 | [eli5](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/voice-call-setter/skills/eli5/SKILL.md) | 入口重复 | 图解默认入口 | 与 eli5-gen-gb 合并；避免 /eli5 同时触发 SVG 与图片路径 |
| P0 | [story-research](../skills/story-research/SKILL.md) | 已适配入库 | 故事调研和候选评分 | 按实际 brief 使用；成片与手机排版需实测 |
| P1 | [animated-video](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/github-cover-bot/skills/baoyu-design/built-in-skills/animated-video.md) | 待适配 | 9:16 连续分镜、可调时间线 | 需要 animations-v3.jsx 与 Tweaks 组件 |
| P1 | [export-as-video](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/github-cover-bot/skills/baoyu-design/built-in-skills/export-as-video.md) | 待适配 | 逐帧导出使用说明 | 默认 __animStage 与 v3 未接通 |
| P1 | [gen-video](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/github-cover-bot/skills/baoyu-design/agents/gen-video/package.json) | 待适配 | 实际视频渲染程序 | Playwright + Chromium + FFmpeg；补桥接；本地编码器无音频混合 |
| P1 | [social-media-content](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/github-cover-bot/skills/baoyu-design/built-in-skills/social-media-content.md) | 待适配 | 封面、轮播、多尺寸素材板 | 适配抖音预览；宿主协议不能假定可用 |
| P1 | [tweaks-protocol](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/github-cover-bot/skills/baoyu-design/built-in-skills/tweaks-protocol.md) | 待适配 | 调整面板与持久化协议 | 需实现宿主消息处理和保存，单发 postMessage 不保证持久化 |
| P1 | [build-feature-media](https://github.com/liush2yuxjtu/GrokBots/blob/ae8dce0adfb6551cd782247eab520f80d407e31b/feature-recorder/skills/record-production-feature/scripts/build_feature_media.py) | 待适配 | 原片派生 MP4/GIF | 依赖 probe_email_media、FFmpeg、ffprobe；默认校验 Darwin 与目标主机 |

## 验收标准

- 内容：一条视频一个主要结果；明确目标人群、钩子、分镜、引用与待查证项，不虚构个人经历。
- 动画：逐场景边界检查；实际 MP4 可播放且画面变化；尺寸、时长、音轨与字幕符合 brief。
- 录屏：保存不可变原片，操作与结果有真实可见证据，派生文件可追溯。
- 数据：只读、确认账号、保留时间窗和指标口径；缺失不能填零，曝光不能代替转化。
