#!/usr/bin/env bash
# Mistica AI quality test runner
# Usage:
#   ./scripts/test-ai-quality.sh baseline         — 4 nodocs prompts, save to ai-test/results/baseline/
#   ./scripts/test-ai-quality.sh after            — 4 withdocs prompts, save to ai-test/results/after/
#   ./scripts/test-ai-quality.sh worktree <path>  — 4 nodocs prompts against a git worktree at <path>
#   ./scripts/test-ai-quality.sh compare          — diff baseline vs after scores
#   ./scripts/test-ai-quality.sh score <dir>      — score an existing results dir

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PROMPTS_DIR="$REPO_ROOT/ai-test/prompts"
RESULTS_BASE="$REPO_ROOT/ai-test/results"

usage() {
    echo "Usage: $0 [baseline|after|worktree <path>|compare|score <dir>]"
    exit 1
}

# Run a single prompt file and save output to a .txt file.
# $1 = prompt file path, $2 = output file path, $3 = optional preamble
run_single() {
    local prompt_file="$1"
    local out_file="$2"
    local preamble="${3:-}"
    local prompt

    if [[ -n "$preamble" ]]; then
        prompt="${preamble} $(cat "$prompt_file")"
    else
        prompt="$(cat "$prompt_file")"
    fi

    claude --print \
        --allowedTools "Read,Glob,Grep" \
        -p "$prompt" \
        > "$out_file" 2>&1

    local lines
    lines=$(wc -l < "$out_file")
    echo "    Saved ${lines} lines → $out_file"
}

# $1 = result label (baseline|after), $2 = variant suffix (nodocs|withdocs)
run_prompts() {
    local label="$1"
    local suffix="$2"
    local out_dir="$RESULTS_BASE/$label"
    mkdir -p "$out_dir"

    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  Running ${suffix} prompts → $out_dir"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    for i in 01 02 03 04; do
        local prompt_file="$PROMPTS_DIR/${i}-"*"-${suffix}.md"
        # shellcheck disable=SC2086
        prompt_file=$(ls $prompt_file 2>/dev/null | head -1)
        if [[ -z "$prompt_file" ]]; then
            echo "  [!] No ${suffix} prompt file for $i — skipping"
            continue
        fi

        echo ""
        echo "  ▶ Prompt $i: $(basename "$prompt_file")"
        echo "    Running claude..."
        run_single "$prompt_file" "$out_dir/${i}.txt"
    done

    echo ""
    echo "  Scoring..."
    node "$REPO_ROOT/scripts/score-ai-output.js" "$out_dir"
}

# Run nodocs prompts against a git worktree at a different repo state.
# $1 = result label, $2 = worktree path
run_worktree() {
    local label="$1"
    local worktree="$2"
    local out_dir="$RESULTS_BASE/$label"
    mkdir -p "$out_dir"

    if [[ ! -d "$worktree" ]]; then
        echo "Worktree not found: $worktree"
        exit 1
    fi

    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  Running nodocs prompts against worktree: $worktree"
    echo "  Saving → $out_dir"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    local preamble="The repo root is ${worktree}. Read ${worktree}/AGENTS.md first, then:"

    for i in 01 02 03 04; do
        local prompt_file="$PROMPTS_DIR/${i}-"*"-nodocs.md"
        # shellcheck disable=SC2086
        prompt_file=$(ls $prompt_file 2>/dev/null | head -1)
        if [[ -z "$prompt_file" ]]; then
            echo "  [!] No nodocs prompt file for $i — skipping"
            continue
        fi

        echo ""
        echo "  ▶ Prompt $i: $(basename "$prompt_file")"
        echo "    Running claude against $worktree..."
        run_single "$prompt_file" "$out_dir/${i}.txt" "$preamble"
    done

    echo ""
    echo "  Scoring..."
    node "$REPO_ROOT/scripts/score-ai-output.js" "$out_dir"
}

score_only() {
    local out_dir="$1"
    if [[ ! -d "$out_dir" ]]; then
        echo "Directory not found: $out_dir"
        exit 1
    fi
    node "$REPO_ROOT/scripts/score-ai-output.js" "$out_dir"
}

compare_runs() {
    local base="$RESULTS_BASE/baseline/score.json"
    local after="$RESULTS_BASE/after/score.json"

    if [[ ! -f "$base" ]]; then echo "No baseline score found. Run: $0 baseline"; exit 1; fi
    if [[ ! -f "$after" ]]; then echo "No after score found. Run: $0 after"; exit 1; fi

    node - "$base" "$after" <<'EOF'
const fs = require('fs');
const [, , basePath, afterPath] = process.argv;
const base  = JSON.parse(fs.readFileSync(basePath,  'utf8'));
const after = JSON.parse(fs.readFileSync(afterPath, 'utf8'));

console.log('\n╔══════════════════════════════════════════════════════════════╗');
console.log('║  Mistica AI Quality — Baseline vs After                      ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');
console.log(`  Baseline : ${base.score}  (${base.percent}%)`);
console.log(`  After    : ${after.score}  (${after.percent}%)`);
const delta = after.percent - base.percent;
const sign  = delta >= 0 ? '+' : '';
console.log(`  Delta    : ${sign}${delta}%\n`);

const regressions = after.rules.filter(r => {
    const b = base.rules.find(x => x.id === r.id);
    return b && b.pass && !r.pass;
});
const newPasses = after.rules.filter(r => {
    const b = base.rules.find(x => x.id === r.id);
    return b && !b.pass && r.pass;
});
const stillFailing = after.rules.filter(r => {
    const b = base.rules.find(x => x.id === r.id);
    return b && !b.pass && !r.pass;
});

if (newPasses.length) {
    console.log('  ✓ New passes:');
    newPasses.forEach(r => console.log(`      [${r.id}] ${r.label}`));
    console.log('');
}
if (regressions.length) {
    console.log('  ✗ Regressions:');
    regressions.forEach(r => console.log(`      [${r.id}] ${r.label}`));
    console.log('');
}
if (stillFailing.length) {
    console.log('  ○ Still failing:');
    stillFailing.forEach(r => console.log(`      [${r.id}] ${r.label}`));
    console.log('');
}
EOF
}

CMD="${1:-}"
case "$CMD" in
    baseline) run_prompts "baseline" "nodocs" ;;
    after)    run_prompts "after"    "withdocs" ;;
    worktree) run_worktree "${3:-worktree}" "${2:-}" ;;
    compare)  compare_runs ;;
    score)    score_only "${2:-}" ;;
    *)        usage ;;
esac
