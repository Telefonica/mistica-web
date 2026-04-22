# AI Integration in Mistica

This document records everything Mistica has built to improve the experience of AI coding agents — both when
consuming the library and when contributing to it. It covers the motivation, what was built in each iteration,
quality benchmark results, and what's planned next.

---

## Why this matters

AI coding agents (Claude Code, GitHub Copilot, Cursor, etc.) generate React code from natural-language
instructions. Without guidance, they produce generic HTML with hardcoded colors, raw `<div>` layouts, and
manual font sizes — none of which are correct in Mistica. With guidance, agents produce idiomatic Mistica
code: `skinVars` tokens, layout primitives, text components, and proper theme setup.

The goal is that any agent, working in any editor, produces correct Mistica code on the first attempt.

---

## Timeline

| Period                      | What was done                                                                                                                                                                                                            | Rubric score                                    |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| **Baseline** (pre-Feb 2026) | Minimal `AGENTS.md`, no `doc/llms.md`, no skills                                                                                                                                                                         | **21/30 — 70%**                                 |
| **Feb 2026 w09**            | First `mistica-react` skill + `doc/llms.md` shipped in npm package                                                                                                                                                       | **20/30 — 67%** _(rubric expanded to 30 rules)_ |
| **Mar 2026 w12**            | Improved skill, fixed patterns example, thin `AGENTS.md`                                                                                                                                                                 | **27/30 — 90%**                                 |
| **Apr 2026**                | Full contributor + consumer skills, `ai-test/` eval harness, four slash commands, `CLAUDE.md` proper import, Copilot instructions, PostToolUse hook, component registry, recipe docs, skin docs, eval harness v2 scripts | **28/30 — 93%** _(target: 95%)_                 |

The score dipped from 70% to 67% in the Feb iteration because the rubric was simultaneously expanded from a
smaller set of checks to 30 rules. The absolute number of correct rules rose.

---

## What was built

### Consumer layer — for agents building apps with Mistica

These artifacts help an AI agent generate correct Mistica UI in a consumer application.

#### `doc/llms.md` (shipped in npm package)

The primary entry point for agents. Located at `node_modules/@telefonica/mistica/doc/llms.md` after install.
Contains 10 critical rules, a quick-start example, component categories overview, design tokens summary, and a
step-by-step reading order for the supporting docs.

#### `doc/patterns.md`, `doc/components.md`, `doc/layout.md`, `doc/design-tokens.md`

Supporting reference docs, also shipped in the npm package. Together with `llms.md` they form the minimum
required reading before generating any Mistica UI code.

#### `doc/recipes/`

13 opinionated, fully compilable screen blueprints covering the most common app screens:

| Recipe                 | Key components                                               |
| ---------------------- | ------------------------------------------------------------ |
| `login.md`             | Form, EmailField, PasswordField, ButtonFixedFooterLayout     |
| `onboarding.md`        | FunnelNavigationBar, Stepper, ButtonFixedFooterLayout        |
| `settings.md`          | MainNavigationBar, RowList, Row, NegativeBox, Switch         |
| `tariff-comparison.md` | DataCard, Carousel, Tag                                      |
| `product-details.md`   | CoverHero, Carousel, DataCard, ButtonFixedFooterLayout       |
| `dashboard.md`         | MainNavigationBar, GridLayout, Carousel, RowList             |
| `checkout.md`          | Stepper, CreditCardFields, SuccessFeedbackScreen             |
| `paywall.md`           | CoverHero, MediaCard carousel, Tag                           |
| `form-wizard.md`       | Stepper, DoubleField, all field types, FunnelNavigationBar   |
| `error-state.md`       | ErrorFeedbackScreen, EmptyState                              |
| `master-detail.md`     | MasterDetailLayout, RowList, EmptyState                      |
| `skeleton-loading.md`  | SkeletonLine, SkeletonText, SkeletonRow, SkeletonRectangle   |
| `content-feed.md`      | Slideshow, CoverCard, Carousel, MediaCard, MainNavigationBar |

#### `doc/skins/`

One doc per brand skin with getter function, font family, brand identity notes, and a minimal app shell:

- `movistar-new.md` — Movistar España (Movistar Sans)
- `o2-new.md` — O2 UK/DE (On Air font)
- `vivo-new.md` — Vivo Brasil, `pt-BR` locale (Vivo Type font)
- `telefonica.md` — Corporate Telefónica (Telefonica Sans)
- `blau.md` — Blau Deutschland, `de-DE` locale (Roboto)

#### `skills/mistica-react/SKILL.md`

A Claude Code skill that triggers whenever an agent is building Mistica UI. Reads `doc/llms.md`, enforces the
mandatory doc-reading order, and includes a UI-zone → component mapping table for complex screens.

Install with:

```bash
npx skills add telefonica/mistica-web
```

#### `/implement-screen` slash command

Loads `mistica-react`, reads all four minimum docs, and produces a single complete page file.

#### `registry/` (component JSON, shipped in npm)

Machine-readable metadata for every exported component, generated by `scripts/generate-registry.js` from
TypeScript props and Playroom snippets. Available at `node_modules/@telefonica/mistica/registry/` after
install. `registry/index.json` provides a compact component list for `list_components` lookups.

---

### Contributor layer — for agents working inside the library

These artifacts help an AI agent correctly extend Mistica itself.

#### `AGENTS.md`

The primary contributor guide. Contains:

- 9 critical rules (never-break invariants)
- Component architecture diagram (6-file bundle)
- Complete code templates for `.tsx`, `.css.ts`, story, test, snippet, and index export
- Add-prop checklist (4 locations to update)
- Internal design token quick reference (`vars.*`)
- Hooks reference table
- Verification commands: `yarn ts-check && yarn lint && yarn test`

#### `CLAUDE.md`

Imports `AGENTS.md` via the `@AGENTS.md` syntax (Claude Code's supported import mechanism — not a symlink).
Can have Claude-specific additions below the import.

#### `.github/copilot-instructions.md`

GitHub Copilot doesn't auto-read `AGENTS.md`. This file bridges the gap with the critical rules inlined and a
pointer to `AGENTS.md` for the full guide.

#### `.claude/settings.json` — PostToolUse hook

Fires after any Write/Edit on `src/*.tsx` files and echoes a checklist reminder: _"did you update
src/index.tsx, the story, the test, and playroom/snippets.tsx?"_ This directly targets the most common failure
modes in the rubric (R11–R15).

#### `doc/contributor-ai.md`

Mirrors `AGENTS.md` as a doc-tree file, formatted for GitHub rendering. Useful for agents that discover docs
via the `doc/` folder rather than the root `AGENTS.md`.

#### `skills/mistica-contributor/SKILL.md`

A Claude Code skill for working inside the library. Provides 13 convention checks, full file templates, and
the verification commands. Loaded by the `/new-component`, `/add-prop`, and `/check-conventions` slash
commands.

#### Slash commands

| Command              | What it does                                                                               |
| -------------------- | ------------------------------------------------------------------------------------------ |
| `/new-component`     | Loads contributor skill, reads `badge` as reference, produces all 6 files, runs `ts-check` |
| `/add-prop`          | Loads contributor skill, updates the 4 required locations, runs `ts-check`                 |
| `/check-conventions` | Loads contributor skill, reports all violations with file:line and fix                     |
| `/implement-screen`  | Loads consumer skill, reads all 4 minimum docs, produces one complete page file            |

---

### Quality evaluation harness — `ai-test/`

A custom benchmark suite measuring how accurately AI agents use Mistica.

#### Structure

- **12 prompt files** (4 tasks × 3 variants: base, no-docs, with-docs) covering: new component creation,
  add-prop, consumer screen, complex Netflix-style page
- **30-rule rubric** (`ai-test/rubric.md`) — regex checks against extracted code blocks
- **`scripts/score-ai-output.js`** — extracts code blocks from response `.txt` files, applies all 30 rules,
  writes `score.json`
- **`scripts/test-ai-quality.sh`** — runner with `baseline | after | compare | score <dir>` commands
- **`scripts/screenshot-ai-output.js`** — Puppeteer visual pipeline; renders generated components at 1440×900
- **Archived results** in `ai-test/results/{baseline,2026-02-w09,2026-03-w12,after}/`
- **Visual screenshots** in `ai-test/screenshots/` for the Netflix-page prompt

#### Running

```bash
yarn ai:test       # Run all 4 prompts, save results to ai-test/results/after/
yarn ai:score      # Score an existing results directory
yarn ai:screenshot # Render and screenshot AI outputs
yarn ai:compare    # Diff baseline vs after
```

See [doc/ai-evaluation.md](./ai-evaluation.md) for the full harness documentation.

---

## Score progression

```
Baseline (pre-Feb 2026)  21/30  ██████████████░░░░░░  70%  No AI tooling
Feb 2026 w09             20/30  █████████████░░░░░░░  67%  First skill (rubric expanded)
Mar 2026 w12             27/30  ██████████████████░░  90%  Improved skill + AGENTS.md
Apr 2026                 28/30  ███████████████████░  93%  Full skills + harness + registry
Target                   29/30  ████████████████████  95%  + recipes + compile gates
```

The two still-failing rules as of Apr 2026:

- **R10**: Test uses semantic queries (`getByRole`/`getByLabelText`) — agent still sometimes uses
  `getByTestId`
- **R16**: No hardcoded colors in consumer screen — agent occasionally inlines a hex for image overlays

---

## Roadmap

| Item                                          | Workstream | Status     |
| --------------------------------------------- | ---------- | ---------- |
| Component registry (`registry/`)              | WS2        | ✅ done    |
| Recipe blueprints (`doc/recipes/`)            | WS3        | ✅ done    |
| Per-skin docs (`doc/skins/`)                  | WS3        | ✅ done    |
| Figma Code Connect (`.figma.ts` mappings)     | WS3        | 🔲 planned |
| Eval harness v2: compile + lint + axe gates   | WS4        | 🔲 planned |
| New eval prompts: recipe-reuse, skin-specific | WS4        | ✅ done    |
| Multi-agent evaluation (Copilot, Cursor)      | WS4        | 🔲 planned |
