---
name: academic-homepage-redesign
overview: 将现有个人学术主页升级为现代极简英文风格：首页改为总览与精选成果，Research 页保留并增强完整论文展示（含分组/筛选/重点标记），同时统一视觉与交互体验。
design:
  architecture:
    framework: html
  styleKeywords:
    - Modern Minimal
    - Academic
    - Clean Whitespace
    - Structured Typography
  fontSystem:
    fontFamily: Helvetica Neue
    heading:
      size: 36px
      weight: 600
    subheading:
      size: 22px
      weight: 500
    body:
      size: 16px
      weight: 400
  colorSystem:
    primary:
      - "#1F3A5F"
      - "#2E5B8A"
      - "#3E7CB1"
    background:
      - "#F8FAFC"
      - "#FFFFFF"
      - "#EEF2F7"
    text:
      - "#0F172A"
      - "#334155"
      - "#64748B"
    functional:
      - "#0F766E"
      - "#B45309"
      - "#B91C1C"
      - "#2563EB"
todos:
  - id: scan-impact-files
    content: 使用[subagent:code-explorer]核对首页与研究页改版影响文件
    status: completed
  - id: revamp-home-overview
    content: 重构index.html为总览首页并加入Highlight Publications区块
    status: completed
    dependencies:
      - scan-impact-files
  - id: rebuild-research-structure
    content: 重构research.html分组结构并添加重点标记与筛选控件
    status: completed
    dependencies:
      - scan-impact-files
  - id: upgrade-visual-system
    content: 升级styles.css并新增research.css统一现代极简视觉规范
    status: completed
    dependencies:
      - revamp-home-overview
      - rebuild-research-structure
  - id: implement-filter-interaction
    content: 新增research-filter.js实现论文筛选、分组联动与状态反馈
    status: completed
    dependencies:
      - rebuild-research-structure
      - upgrade-visual-system
  - id: responsive-regression-check
    content: 完成双页响应式与可用性回归检查并修正样式边界问题
    status: completed
    dependencies:
      - implement-filter-interaction
---

## User Requirements

- 将现有个人学术主页改版为更好的版本，整体风格为**现代极简**，界面干净、留白充足、接近高校 faculty page。
- 信息结构采用：**首页总览 + Research 详细页**。
- 页面语言为**全英文**。
- 需要新增和优化内容表现：  
- 首页加入 **Highlight Publications**（精选论文）  
- Research 页支持论文的**筛选、分组、重点标记**

## Product Overview

- 首页作为总览入口，集中展示个人简介、研究方向、代表性成果和关键链接。
- Research 页承载完整论文清单，提升浏览效率与信息层次。
- 视觉上从旧的双栏固定布局升级为更现代、统一、响应式的学术站点样式。

## Core Features

- 现代极简首页：Hero 简介区、研究概览、精选论文卡片、快速跳转入口。
- 研究页结构化展示：按年份或类别分组，重点论文标签化（如 Highlight）。
- 论文检索体验增强：前端筛选（如年份、类型、是否精选）与清晰的视觉层级。
- 全站一致的导航、排版与间距系统，保证桌面端与移动端阅读体验。

## 技术栈选择

- 延续现有静态站点方案：**HTML + CSS + 原生 JavaScript**（基于 GitHub Pages 直接托管）。
- 复用现有资源：`assets/css/academicons*.css`、`stylesheets/styles.css`、`javascripts/scale.fix.js`。
- 不引入后端与构建工具，保证部署简单、维护成本低。

## 实现方案

- 采用“**结构先行 + 样式系统统一 + 轻量交互增强**”策略：先重构页面信息架构，再统一视觉系统，最后补充筛选交互。
- 首页 `index.html` 改为总览型信息流；`research.html` 改为结构化论文浏览页，并通过数据属性和轻量脚本实现筛选。
- 关键决策：保持纯静态实现，避免技术栈迁移；在不破坏现有内容可维护性的前提下增加可扩展标记（data-*）。

## 实施要点（Execution Details）

- 复用已有导航与社交链接，减少内容迁移风险。
- 筛选逻辑采用前端单次遍历，复杂度约 **O(n)**（n 为论文条目数）；避免重复 DOM 重排，使用批量 class 切换控制显隐。
- 保留旧页面核心链接与内容语义，避免 SEO 和外链失效。
- 样式拆分为“全站基础样式 + Research 页面增强样式”，降低后续改动冲突。
- 脚本仅挂载到 Research 页，控制影响范围与加载体积。

## 架构设计

- 页面层：
- `index.html`：总览入口与精选成果
- `research.html`：完整成果浏览与筛选
- 样式层：
- 全站统一排版、色彩、组件间距
- 研究页专用列表、筛选条、标签样式
- 交互层：
- Research 页筛选与高亮状态管理
- 保持无 JS 时基础可读（渐进增强）

## 目录结构

### Directory Structure Summary

本次改版在现有静态站点上进行，核心是两页重构、样式系统升级与研究页筛选脚本新增。

```text
/Users/xuchengming/codebank/chmxu.github.io/
├── index.html                           # [MODIFY] 首页总览重构：Hero、Research Overview、Highlight Publications、快速链接区
├── research.html                        # [MODIFY] 研究页重构：分组展示、重点标记、筛选控件与条目结构化
├── stylesheets/
│   ├── styles.css                       # [MODIFY] 全站视觉系统升级：排版、间距、色彩、导航、响应式规则
│   └── research.css                     # [NEW] 研究页专用样式：筛选条、论文卡片、标签与分组标题样式
└── javascripts/
    └── research-filter.js               # [NEW] 研究页筛选逻辑：按年份/类型/Highlight 过滤与状态同步
```

## 设计方案

采用现代极简学术风格：大面积留白、清晰层级、克制配色。首页以“个人价值主张 + 精选成果 + 快速导航”为主线；Research 页以“筛选器 + 分组列表 + 标签化重点信息”为核心。交互强调轻量与可读性，使用微弱 hover 与状态过渡，避免花哨动画，保持专业可信的学术气质。

## Agent Extensions

### SubAgent

- **code-explorer**
- Purpose: 在实施前后对改动涉及的页面、样式与脚本进行定向扫描，确保结构映射完整且无遗漏引用。
- Expected outcome: 输出准确的文件影响面与依赖关系，降低改版回归风险，确保计划与落地一致。