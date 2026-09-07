# Weird Matter Lab Testing

## 自动化

`src/lab-core.test.ts` 覆盖确定性、反应、命令、导入导出与边界；项目 E2E 覆盖封面进入，最终需覆盖材料选择、反应完成、Fact/Simplified/Fictional、Try again、静音和 Worker fallback。

## 视口

Chromium 320×568、390×844、1440×1000；WebKit 390×844；补横屏、减少动态、大字号和无精细拖动路径。

## 已验证证据

2026-09-04：目标 TypeScript 通过。完整 lint、unit、build、E2E 待最终实跑记录。

## Mobile run 1 / 2

待执行：iPhone 17 / iOS 26.6 两轮完整挑战，记录 SHA、catalog hash、截图/视频、触觉/声音与缺陷。

## 缺口

低端 GPU、Worker 崩溃恢复、72 条科学审校、视频权利、真机与 Owner 审美签字未完成。

## 2026-09-04 自动化记录

目标范围 lint/typecheck/build 通过；13 个测试文件共 131 项通过；九应用 Chromium/WebKit 五视口矩阵 45/45 通过。390×844 截图：`test-results/visual-nine/weird-matter-lab-390x844.png`。构建仍有大 chunk 警告；两轮真实 iPhone 与 Owner 签字仍阻塞。
