# Doc-map experiment

Measures whether the `# Documentation` map in `AGENTS.md` improves agentic
performance, and whether the per-line descriptions earn their token cost.

## Arms

The arms differ only in the content of `AGENTS.md`:

- `A-no-map` — no documentation map (the `master` baseline).
- `B-bare-tree` — the `doc/` tree with filenames only, no descriptions.
- `C-described` — the `doc/` tree with a one-line description per entry (current).

Three arms separate two questions: does a map help at all (C and B versus A),
and do the descriptions add value (C versus B).

## What is measured

Per `(arm, task)` cell, averaged over repetitions:

- `inputTotal` — input tokens processed (raw + cache read + cache creation); the primary cost signal.
- `output`, `cost$`, `turns` — output tokens, USD cost, conversation turns.
- `tools` — number of tool calls.
- `docsTouched` — distinct `doc/*.md` files the run opened.
- `readExpected%` — share of runs that opened the task's expected doc (doc-dependent tasks only).
- `wrongDocs` — doc files opened that were not the expected one.

Tasks are split by tag. `doc-dependent` tasks require a specific doc; the map
should help. `control` tasks need no doc; they expose the map's fixed overhead.

## Running

Requires the `claude` CLI and `jq` on `PATH`.

```bash
cd eval/doc-map
REPS=3 MODEL=sonnet ./run.sh      # first pass
node parse.mjs                    # tabulate; also writes runs.csv
```

Set `MODEL=opus` to measure your real working model. Set `REPS` higher to
reduce noise from model nondeterminism. Restrict arms with `ARMS="A-no-map C-described"`.

The runner swaps `AGENTS.md` per arm and always restores it on exit. It warns
if a task writes files outside `AGENTS.md` and this directory.

## Reading the result

- On `doc-dependent` tasks, C (and B) should show lower `inputTotal` and
  `tools`, higher `readExpected%`, and lower `wrongDocs` than A.
- On `control` tasks, all arms should be close; a large gap means the map costs
  tokens without benefit.
- If C clearly beats B, the descriptions justify themselves; if not, the bare
  tree is the better trade.

## Caveats

- **Quality is not auto-scored.** Token savings are meaningless if answers get
  worse. Grade answer correctness separately (manual rubric or a blind
  LLM-judge pass over `results/*.jsonl`) before drawing conclusions.
- **Prompt caching** can mask token differences; keep `REPS` high and compare averages.
- **Nondeterminism** requires repetition; a single run proves nothing.
- For strict isolation against accidental writes, run the experiment inside a
  throwaway `git worktree`.
