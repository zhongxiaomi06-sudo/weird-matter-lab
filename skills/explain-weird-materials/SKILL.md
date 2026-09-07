---
name: explain-weird-materials
description: "Explain counterintuitive material behavior through safe observations and demonstrate it as an experiment in Weird Matter Lab."
---

# Explain Weird Materials

Use this skill for non-Newtonian fluids, shape-memory materials, aerogels, ferrofluids, and other supported strange matter. It is educational, not a hazardous lab protocol.

## Workflow

1. Name the observable behavior, stimulus, and safe boundary. Distinguish demonstration from molecular explanation.
2. Choose the closest supported specimen and interaction in `apps/weird-matter-lab`; disclose catalog gaps.
3. Predict what the user should observe in plain language, then let the interaction supply the reveal.
4. Run `node scripts/showcase.mjs --json`, start the package, enter the lab, and complete the experiment steps.
5. Explain the observed response and uncertainty. Include the reset or next-specimen path.

Do not provide unsafe synthesis, ingestion, high-voltage, pressure, or uncontrolled heating instructions.
