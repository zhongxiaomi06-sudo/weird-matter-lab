// Generated glass-specimen jar illustrations — one unique AI-rendered specimen per material.
// Each of the 72 materials in content.ts gets its own bespoke jar illustration, keyed by material id.
import type { Material } from './content';

// Vite statically resolves this glob at build time into a map of eagerly-imported asset URLs.
const modules = import.meta.glob('./assets/specimens72/*.webp', { eager: true, import: 'default' }) as Record<string, string>;

const SPECIMENS: Record<string, string> = {};
for (const path in modules) {
  const id = path.replace('./assets/specimens72/', '').replace('.webp', '');
  SPECIMENS[id] = modules[path]!;
}

const FALLBACK = SPECIMENS['crystal'] ?? Object.values(SPECIMENS)[0]!;

// Every material id has its own generated jar; fall back defensively if content.ts ever adds a new id.
export const specimenFor = (material: Material): string => SPECIMENS[material.id] ?? FALLBACK;
