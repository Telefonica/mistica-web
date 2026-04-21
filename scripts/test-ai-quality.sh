#!/usr/bin/env bash
# Mistica AI quality test runner
# Usage:
#   ./scripts/test-ai-quality.sh baseline   — run all 3 prompts, save to ai-test/results/baseline/
#   ./scripts/test-ai-quality.sh after      — run all 3 prompts, save to ai-test/results/after/
#   ./scripts/test-ai-quality.sh compare    — diff baseline vs after scores
#   ./scripts/test-ai-quality.sh score <dir> — score an existing results dir

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PROMPTS_DIR="$REPO_ROOT/ai-test/prompts"
RESULTS_BASE="$REPO_ROOT/ai-test/results"

usage() {
    echo "Usage: $0 [baseline|after|compare|score <dir>]"
    exit 1
}

run_prompts() {
    local label="$1"
    local out_dir="$RESULTS_BASE/$label"
    mkdir -p "$out_dir"

    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  Running prompts → $out_dir"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    for i in 01 02 03; do
        prompt_file=$(ls "$PROMPTS_DIR"/${i}-*.md 2>/dev/null | head -1)
        if [[ -z "$prompt_file" ]]; then
            echo "  [!] No prompt file for $i — skipping"
            continue
        fi

        echo ""
        echo "  ▶ Prompt $i: $(basename "$prompt_file")"
        echo "    Running claude..."

        # Run claude with read-only tools so it can explore the codebase.
        # --print outputs the response as plain text to stdout.
        claude --print \
            --allowedTools "Read,Glob,Grep" \
            -p "$(cat "$prompt_file")" \
            > "$out_dir/${i}.txt" 2>&1

        local lines
        lines=$(wc -l < "$out_dir/${i}.txt")
        echo "    Saved ${lines} lines → $out_dir/${i}.txt"
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
    baseline|after) run_prompts "$CMD" ;;
    compare)        compare_runs ;;
    score)          score_only "${2:-}" ;;
    *)              usage ;;
esac
