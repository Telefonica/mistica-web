# Testing changes to the Mistica skill — methodology

This document defines a methodology for evaluating a proposed change to the `mistica-react` skill — or to
anything that influences how Claude Code implements Mistica UIs: the skill files themselves, the Mistica
package the skill references, or an accompanying agent definition.

## How to use this document

There are two ways to put it to work:

1. **Have Claude run the test.** Point Claude Code at this file — for example, "Read
   `TESTING-MISTICA-SKILL.md` and run an A/B test of _<the
   change>_." Claude sets up the workspaces, executes the runs, computes the metrics, and writes the report,
   following the principles below. The exact scripts are improvised per run; only the methodology is fixed.
2. **Have Claude prepare a run prompt.** Ask Claude to read this file and draft the single task prompt plus
   the per-arm setup, so a human can launch the runs.

Either way, the principles in this document are the contract, and you must verify that Claude does what you
expect it to do.

---

## 1. Principle

Run the **same task** through Claude Code many times under two conditions that differ in **exactly one
variable** — the change under test — and compare the outcomes statistically.

- **Baseline arm:** the current skill, unmodified.
- **Modified arm:** the baseline plus the single change under test.
- **At least three runs per arm** (six total). Three is the minimum that exposes run-to-run variance; raise it
  when the expected effect is small.
- **One identical task prompt, byte-for-byte, in every run.**
- **One fixed model in every run** (for example `claude-opus-4-8`).
- **Full isolation per run**, so no state leaks between runs or from the developer's own environment.

Everything that is not the variable under test is held constant. A label convention such as `with-1..3`
(modified) and `no-1..3` (baseline) keeps artefacts organised.

---

## 2. What you need

- An **example project** with the Mistica skill installed, pinned to the version under test — a minimal app
  that depends on a fixed `@telefonica/mistica` version and mounts the skill under
  `.claude/skills/mistica-react`. This prevents the LLM from losing context by keeping the task small.
- The **Claude Code CLI** (`claude`) available headless.

---

## 3. Define the single variable

Identify the one variable under test and the vector by which it is applied to the modified arm. For example:

1. **Skill content.** Edit the files under `.claude/skills/mistica-react`.
2. **`node_modules` files.** Edit the Mistica package files the skill reads or the build consumes. When
   `node_modules` is shared across workspaces, give the modified arm its own copy of the affected files so the
   change does not leak into the baseline.
3. **Agent definition.** Add, remove, or edit an agent file under `.claude/agents/` (for example
   `figma-mistica-implementer.md`). This was the variable in PR #1560: the modified arm carried the agent
   file; the baseline did not.

Confirm that the baseline and modified workspaces are **identical except for that one change**.

---

## 4. Build the isolated workspaces

Create one workspace per run, outside the developer's main repository, so no parent `.claude` state leaks in.
Each workspace is a copy of the example project in which:

- `node_modules` is shared with the example project (consistent and fast), except for any package files
  deliberately varied for the modified arm.
- The skill under test is mounted under `.claude/skills/mistica-react`.
- The variable under test is present (modified arm) or absent (baseline arm).

Isolated git worktrees and plain copied directories are both valid containers; the requirement is isolation,
not the mechanism. Before launching, verify that the only difference between a modified and a baseline
workspace is the variable under test.

---

## 5. Run each iteration (headless, reproducible)

Drive each run headless with the same task prompt and the same model. The pattern is:

```bash
claude -p "<the single, identical task prompt>" \
  --output-format stream-json --verbose \
  --model <fixed-model>
```

- Define the prompt **once** and reuse it verbatim across all runs.
- `--output-format stream-json --verbose` emits the full event stream, including the terminal `result` event
  that carries the authoritative token and cost totals — this is the source of truth for measurement.
- Record a **start and end timestamp** for each run for wall-clock timing.
- Apply a **per-run timeout** so a stuck run cannot block the batch.
- Let delegation happen **naturally** — do not nudge the agent toward or away from a subagent in the prompt
  unless you do the same for all the prompts.

Persist each run's full stream to a file; every metric below is derived from it.

---

## 6. Render and screenshot the output

For each completed run, boot the generated app on a dev server and capture a **full-page screenshot at the
design's native width** (for example 1368 px). Also capture console errors and any build/runtime error
overlay, so a run that compiles but fails at runtime is flagged rather than scored as a success.

---

## 7. Measure

Derive every figure from the persisted run streams and the generated source.

### 7.1 Run-level metrics (from the `result` event)

- Token usage, aggregated across all models.
- Wall-clock seconds and the reported run duration.

### 7.2 Mistica primitive compliance (static analysis of the generated code)

Analyse the generated `.tsx`/`.ts` files, excluding identical boilerplate, and count:

- Mistica component imports and JSX usages from `@telefonica/mistica`.
- Raw HTML elements (with a per-tag breakdown), inline `style=` props, and `className` usages — all signals of
  escaping the design system.
- Hardcoded hex colours and `px` values versus `skinVars` token usage.
- A compliance ratio: Mistica component usages over (Mistica usages + raw HTML).

This is how "Mistica primitive usage" is quantified objectively rather than impressionistically.

### 7.3 Cross-checks

Compute arm aggregates as mean and min–max for the chosen n, and verify internal consistency before trusting
any headline number (for example if there are outlier values).

---

## 8. Comparison dimensions

A complete comparison reports five dimensions, with cost and latency cited alongside:

1. **Token usage.** Decompose into input-side (input + cache read + cache creation) and output. In practice
   the input side is the overwhelming majority of volume and is dominated by cache reads, so any "fewer
   tokens" claim must be checked against the decomposition rather than asserted from totals.
2. **Time consumed.** Wall-clock seconds per run and the arm mean; report the spread, not only the mean, given
   small n.
3. **Mistica primitive usage.** The compliance figures from the static analysis.
4. **Pixel parity** (when implementing a Figma design). Score each rendered screenshot 1–5 against the
   baseline design across layout, hero, sidebar, grid, pagination, and typography/colour, then compare arm
   means. State explicitly that fidelity scoring is subjective.
5. **Other checks.** For a given change the tester might want to have other additional comparison dimensions
   relevant to the change.

---

## 9. Reporting

Summarise the result as:

- A **TL;DR verdict table** with one row per dimension and an explicit tie/win/loss call.
- A **methodology section** stating the prompt, model, n, isolation scheme, and the single variable under
  test.
- **Per-run tables** and **arm aggregates** with spreads.
- A **screenshot gallery** placing the arms side by side.
- An **interpretation** that separates measured effects from artefacts, and a **recommendation** grounded only
  in the verified figures.

The standard to meet: a reader who never saw the experiment can reproduce it from this document plus the
report, and arrive at the same conclusion.
