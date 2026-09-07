# Weird Matter Lab Architecture

## 模块

- `src/App.tsx`：视图、工具、挑战、完成、导入导出与 fallback。
- `src/lab-core.ts`：确定性世界、反应、校验和与 Remix 合同。
- simulation Worker：隔离高频计算；失败时保留可理解降级。
- `src/audio.ts`：主题背景床与事件音。
- `src/specimens.ts`：标本资产映射。

## 状态

世界命令日志支持 undo/redo；save/restore 与 Remix JSON 使用本地状态。导入必须验证 schema，不能执行任意内容。

## Resilience

网络不影响核心沙盒；音频静默失败；宿主分享失败保留本地导出。减少动态效果关闭自动视频与非必要动效。

## 性能

Worker、画布批处理和按需素材避免阻塞主线程；大素材与 SDK chunk 仍需预算复核。
