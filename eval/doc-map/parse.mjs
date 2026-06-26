#!/usr/bin/env node
//
// Tabulates the doc-map experiment results.
//
// Reads every results/*.jsonl stream-json log, extracts token usage, cost,
// turns and tool activity per run, then prints a per-arm summary split by task
// tag (doc-dependent vs control) and writes runs.csv for further analysis.
//
// Usage: node parse.mjs

import {readFileSync, readdirSync, writeFileSync, existsSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const RESULTS = join(HERE, 'results');

const tasks = new Map(
  readFileSync(join(HERE, 'tasks.jsonl'), 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line))
    .map((task) => [task.id, task])
);

const docRefs = (text) => {
  const out = new Set();
  for (const match of String(text).matchAll(/doc\/[\w/.-]+\.md/g)) out.add(match[0]);
  return out;
};

const parseRun = (file) => {
  const [arm, id, repWithExt] = file.split('__');
  const rep = repWithExt.replace('.jsonl', '');
  const task = tasks.get(id);
  const lines = readFileSync(join(RESULTS, file), 'utf8').split('\n').filter(Boolean);

  let result = null;
  let toolCalls = 0;
  const docsTouched = new Set();

  for (const line of lines) {
    let event;
    try {
      event = JSON.parse(line);
    } catch {
      continue;
    }
    if (event.type === 'result') result = event;
    if (event.type === 'assistant' && Array.isArray(event.message?.content)) {
      for (const block of event.message.content) {
        if (block.type !== 'tool_use') continue;
        toolCalls += 1;
        for (const ref of docRefs(JSON.stringify(block.input ?? {}))) docsTouched.add(ref);
      }
    }
  }

  const usage = result?.usage ?? {};
  const inputTokens = usage.input_tokens ?? 0;
  const cacheRead = usage.cache_read_input_tokens ?? 0;
  const cacheCreate = usage.cache_creation_input_tokens ?? 0;
  const expected = task?.expect_doc ?? null;

  return {
    arm,
    id,
    rep,
    tag: task?.tag ?? 'unknown',
    ok: result?.subtype === 'success',
    inputTokens,
    cacheRead,
    cacheCreate,
    inputTotal: inputTokens + cacheRead + cacheCreate,
    outputTokens: usage.output_tokens ?? 0,
    costUsd: result?.total_cost_usd ?? 0,
    numTurns: result?.num_turns ?? 0,
    durationMs: result?.duration_ms ?? 0,
    toolCalls,
    docsTouchedCount: docsTouched.size,
    readExpected: expected ? docsTouched.has(expected) : null,
    wrongDocs: expected ? [...docsTouched].filter((d) => d !== expected).length : docsTouched.size,
  };
};

if (!existsSync(RESULTS)) {
  console.error(`No results/ directory yet. Run ./run.sh first.`);
  process.exit(1);
}
const files = readdirSync(RESULTS).filter((f) => f.endsWith('.jsonl'));
if (files.length === 0) {
  console.error(`No result logs in ${RESULTS}. Run ./run.sh first.`);
  process.exit(1);
}

const runs = files.map(parseRun);

// runs.csv
const cols = [
  'arm', 'id', 'tag', 'rep', 'ok', 'inputTotal', 'inputTokens', 'cacheRead',
  'cacheCreate', 'outputTokens', 'costUsd', 'numTurns', 'durationMs',
  'toolCalls', 'docsTouchedCount', 'readExpected', 'wrongDocs',
];
writeFileSync(
  join(HERE, 'runs.csv'),
  [cols.join(','), ...runs.map((r) => cols.map((c) => r[c]).join(','))].join('\n') + '\n'
);

const mean = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
const rate = (xs) => {
  const defined = xs.filter((x) => x !== null);
  return defined.length ? defined.filter(Boolean).length / defined.length : null;
};
const fmt = (n) => (Number.isFinite(n) ? n.toLocaleString('en-US', {maximumFractionDigits: 2}) : '-');

const arms = [...new Set(runs.map((r) => r.arm))].sort();
const tags = ['doc-dependent', 'control'];

for (const tag of tags) {
  console.log(`\n## ${tag}`);
  const header = ['arm', 'n', 'inputTotal', 'output', 'cost$', 'turns', 'tools', 'docsTouched', 'readExpected%', 'wrongDocs'];
  console.log(header.join('\t'));
  for (const arm of arms) {
    const cell = runs.filter((r) => r.arm === arm && r.tag === tag && r.ok);
    if (cell.length === 0) continue;
    const expectedRate = rate(cell.map((r) => r.readExpected));
    console.log([
      arm,
      cell.length,
      fmt(mean(cell.map((r) => r.inputTotal))),
      fmt(mean(cell.map((r) => r.outputTokens))),
      fmt(mean(cell.map((r) => r.costUsd))),
      fmt(mean(cell.map((r) => r.numTurns))),
      fmt(mean(cell.map((r) => r.toolCalls))),
      fmt(mean(cell.map((r) => r.docsTouchedCount))),
      expectedRate === null ? '-' : fmt(expectedRate * 100),
      fmt(mean(cell.map((r) => r.wrongDocs))),
    ].join('\t'));
  }
}

const failed = runs.filter((r) => !r.ok);
if (failed.length) {
  console.log(`\n${failed.length} failed run(s): ${failed.map((r) => `${r.arm}/${r.id}/${r.rep}`).join(', ')}`);
}
console.log(`\nWrote ${join(HERE, 'runs.csv')} (${runs.length} runs).`);
