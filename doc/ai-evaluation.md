# AI Output Quality Evaluation Harness

This document explains how the `ai-test/` evaluation harness works, how to run it, and how to extend it.

## Purpose

The harness measures how well an AI coding agent uses Mistica correctly when given natural-language
instructions. It runs four prompts against Claude (and optionally other agents), extracts code blocks from the
response, applies 30 automated rules, and produces a score. Results are archived so regressions are caught
when the library or its AI guidance changes.

## Directory layout

```
ai-test/
├── rubric.md              ← 30 rules, one per row, with ID and check description
├── prompts/               ← 12 prompt files (4 tasks × 3 variants: base, nodocs, withdocs)
│   ├── 01-new-component.md
│   ├── 01-new-component-nodocs.md
│   ├── 01-new-component-withdocs.md
│   ├── 02-add-prop.md / -nodocs / -withdocs
│   ├── 03-consumer-screen.md / -nodocs / -withdocs
│   ├── 04-netflix-frontpage-nodocs.md
│   └── 04-netflix-frontpage-withdocs.md
├── render/                ← Vite app for rendering generated page components
│   ├── index.html
│   ├── main.tsx
│   ├── vite.config.ts
│   └── streaming-home-page-*.tsx   (archived AI outputs)
├── results/               ← Archived score runs
│   ├── baseline/          (21/30 — 70%) pre-AI-tooling state
│   ├── 2026-02-w09/       (20/30 — 67%) first skill iteration
│   ├── 2026-03-w12/       (27/30 — 90%) improved skill + AGENTS.md
│   └── after/             (28/30 — 93%) full skills + contributor guide
└── screenshots/           ← Puppeteer visual renders of the Netflix-page prompt
    ├── 2026-02-w09-netflix.png
    ├── 2026-03-w12-netflix.png
    └── after-netflix.png
```

## Running the harness

```bash
# Run all 4 prompts against Claude and save to ai-test/results/after/
yarn ai:test

# Score an existing results directory
yarn ai:score

# Take visual screenshots of the rendered outputs
yarn ai:screenshot

# Compare baseline vs after — shows regressions, new passes, still-failing
yarn ai:compare
```

These commands wrap `scripts/test-ai-quality.sh`, `scripts/score-ai-output.js`, and
`scripts/screenshot-ai-output.js`.

## How the scorer works (`scripts/score-ai-output.js`)

1. Reads response `.txt` files from the target results directory
2. Extracts code blocks by filename heuristic (looks for ` ```tsx ` / ` ```ts ` blocks preceded by a filename
   comment)
3. Applies each rule from `ai-test/rubric.md` as a regex against the appropriate block
4. Writes `score.json` to the results directory

A rule **passes** when its condition holds; the score is `PASS count / 30 × 100%`.

## The 30 rules

Rules are grouped by prompt. See [ai-test/rubric.md](../ai-test/rubric.md) for the full table.

| Prompt                           | Rules   | What they check                                                                                              |
| -------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| 01 — New component (contributor) | R01–R12 | `'use client'`, namespaced hooks, no VE imports in tsx, no hex colors, story shape, test shape, index export |
| 02 — Add prop                    | R13–R15 | Story argTypes, story args, Playroom snippet all updated                                                     |
| 03 — Consumer screen             | R16–R20 | No hex colors, `skinVars` tokens, Mistica layout, Mistica text, `ThemeContextProvider`                       |
| 04 — Complex screen (Netflix)    | R21–R30 | All above + `MainNavigationBar`, `CoverHero`/`Slideshow`, `Carousel`, `CoverCard`/`MediaCard`                |

## Interpreting results

- **≥ 93%**: current baseline with full skills + AGENTS.md
- **< 90%**: regression — investigate which rules started failing
- **Specific prompt subscores**: `score.json` includes per-rule pass/fail; look at the prompt subgroup to
  pinpoint the problem

## Adding a new prompt

1. Write the prompt file in `ai-test/prompts/<N>-<name>.md`
2. Add `-nodocs` and `-withdocs` variants (same task, but without/with explicit doc path hints)
3. Add rules for the new prompt to `ai-test/rubric.md` with consecutive IDs
4. Implement the rules in `scripts/score-ai-output.js` in the corresponding section
5. Update `scripts/test-ai-quality.sh` to include the new prompt number

## Adding a new rule to an existing prompt

1. Append a row to the relevant prompt section in `ai-test/rubric.md` with the next ID
2. Add the rule implementation in `scripts/score-ai-output.js` — each rule is a `{id, prompt, label, check}`
   object where `check` is a function receiving the extracted code string
3. Rerun `yarn ai:score` to see the updated result — an existing passing result will now have the new rule as
   FAIL if the archived output doesn't satisfy it

## Visual pipeline (`scripts/screenshot-ai-output.js`)

The visual pipeline renders `streaming-home-page-*.tsx` components inside the `ai-test/render/` Vite app and
takes 1440×900 Puppeteer screenshots. This gives a human-readable before/after comparison of AI-generated
output quality, independent of the rule-based score.

To add a new visual snapshot: copy a generated component into `ai-test/render/`, name it
`streaming-home-page-<label>.tsx`, then run `yarn ai:screenshot`.
