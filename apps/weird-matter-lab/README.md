# Weird Matter Lab

一个确定性的教育型物质沙盒：用游戏材料完成挑战，并区分事实、简化模型与虚构玩法。

## Project contract

- Package: `@eazo/weird-matter-lab`
- Local URL: <http://127.0.0.1:5105>
- Runtime: React + TypeScript + Vite + simulation Worker
- Locale: English (`en-US`)
- E2E: `tests/e2e/project.spec.ts`

## Commands

```bash
pnpm --filter @eazo/weird-matter-lab dev --host 127.0.0.1
pnpm --filter @eazo/weird-matter-lab typecheck
pnpm --filter @eazo/weird-matter-lab build
pnpm exec playwright test --project=lab-chromium-mobile
```

The sandbox opens without credentials. Eazo sharing is optional; local export remains the web fallback.
Content-review, performance, physical-device and host gates are tracked in [Testing](./TESTING.md) and [Release](./RELEASE.md).

## Project documents

- [Product](./PRODUCT.md) · [Design](./DESIGN.md) · [Content](./CONTENT.md)
- [Architecture](./ARCHITECTURE.md) · [Testing](./TESTING.md) · [Release](./RELEASE.md)
