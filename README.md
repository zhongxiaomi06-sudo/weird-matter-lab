# Weird Matter Lab

Ridiculous goals. Real ideas. A mobile-first deterministic matter sandbox for Eazo and the open web.

- 72 materials, 12 tools, 30 teaching challenges, and 12 free-play scenes.
- 256×144 TypedArray simulation in a dedicated Worker.
- Pause/step, undo/redo, atomic local save recovery, safe Remix validation, adaptive quality, and offline support.
- Real `@eazo/sdk@0.22.8` device and `share.compose` integration with local fallback.

## Local development

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm verify
pnpm test:e2e
```

For Eazo, copy `apps/weird-matter-lab/.env.example` to `.env` and provide the App ID issued by Eazo. No private key belongs in this client repository.

## Release state

`D2-exit / SELF_TEST candidate`. Engineering and emulated mobile gates pass. D3 is blocked until the real Eazo Mobile host, physical devices, named science/safety reviewers, and human S/S+ quality tests provide evidence. The complete decision is in [the production audit](./apps/weird-matter-lab/AUDIT.md).
