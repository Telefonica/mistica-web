#!/usr/bin/env bash
#
# Runs the doc-map A/B/C experiment.
#
# For each arm it swaps the repo AGENTS.md with the arm fixture, then runs every
# task REPS times through `claude -p` in headless mode, capturing the full
# stream-json event log per run under results/. The canonical AGENTS.md is
# always restored on exit.
#
# Usage:
#   REPS=3 MODEL=sonnet ./run.sh
#
# Environment:
#   REPS   repetitions per (arm, task) cell           (default: 3)
#   MODEL  model alias passed to claude --model        (default: sonnet)
#          Use the model you actually work with (e.g. opus) to measure your
#          real workflow; sonnet is the cheaper default for a first pass.
#   ARMS   space-separated arm names to run            (default: all in arms/)
#
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(git -C "$HERE" rev-parse --show-toplevel)"
AGENTS="$ROOT/AGENTS.md"
RESULTS="$HERE/results"
TASKS="$HERE/tasks.jsonl"

REPS="${REPS:-3}"
MODEL="${MODEL:-sonnet}"

command -v claude >/dev/null || { echo "claude CLI not found on PATH" >&2; exit 1; }
command -v jq >/dev/null || { echo "jq not found on PATH" >&2; exit 1; }

mkdir -p "$RESULTS"

# Back up the canonical AGENTS.md and guarantee restore on any exit.
BACKUP="$(mktemp)"
cp "$AGENTS" "$BACKUP"
restore() { cp "$BACKUP" "$AGENTS"; rm -f "$BACKUP"; echo "Restored canonical AGENTS.md"; }
trap restore EXIT

if [[ -n "${ARMS:-}" ]]; then
  arm_files=(); for a in $ARMS; do arm_files+=("$HERE/arms/$a.AGENTS.md"); done
else
  arm_files=("$HERE"/arms/*.AGENTS.md)
fi

echo "Model: $MODEL | Reps: $REPS | Results: $RESULTS"

for fixture in "${arm_files[@]}"; do
  arm="$(basename "$fixture" .AGENTS.md)"
  echo "=== Arm: $arm ==="
  cp "$fixture" "$AGENTS"

  jq -c '.' "$TASKS" | while IFS= read -r task; do
    id="$(jq -r '.id' <<<"$task")"
    prompt="$(jq -r '.prompt' <<<"$task")"

    for rep in $(seq 1 "$REPS"); do
      out="$RESULTS/${arm}__${id}__${rep}.jsonl"
      printf '  %-20s rep %s ... ' "$id" "$rep"

      before="$(cd "$ROOT" && git status --porcelain | grep -vE 'AGENTS.md|eval/doc-map/' || true)"

      ( cd "$ROOT" && claude -p "$prompt" \
          --output-format stream-json --verbose \
          --model "$MODEL" \
          --permission-mode bypassPermissions ) > "$out" 2> "${out%.jsonl}.err" || true

      after="$(cd "$ROOT" && git status --porcelain | grep -vE 'AGENTS.md|eval/doc-map/' || true)"
      if [[ "$before" != "$after" ]]; then
        echo "WARNING: working tree changed outside AGENTS.md/eval (a task wrote files). Inspect before trusting results." >&2
      fi
      echo "done"
    done
  done
done

echo "All runs complete. Parse with: node $HERE/parse.mjs"
