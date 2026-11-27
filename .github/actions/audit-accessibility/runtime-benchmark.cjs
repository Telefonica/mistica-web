const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const {spawnSync} = require('child_process');
const {getAuditCases, getAxeReportPath, PATH_AXE_REPORTS} = require('./audit-rules');

const IMAGE = 'mcr.microsoft.com/playwright:v1.64.1-noble';
const ROOT = path.resolve(__dirname, '../../..');
const OUTPUT = path.join(ROOT, 'reports/a11y-runtime-benchmark');
const SUMMARY = path.join(OUTPUT, 'summary.json');
const CLI = path.join(path.dirname(require.resolve('playwright/package.json')), 'cli.js');
const cases = getAuditCases();
fs.mkdirSync(OUTPUT, {recursive: true});
const summary = fs.existsSync(SUMMARY)
    ? JSON.parse(fs.readFileSync(SUMMARY, 'utf8'))
    : {
          environment: {
              commit: process.env.GITHUB_SHA,
              node: process.version,
              playwright: require('playwright/package.json').version,
              platform: process.platform,
              architecture: process.arch,
              cpus: os.cpus().length,
              cpu: os.cpus()[0].model,
              workers: 2,
              caseCount: cases.length,
              image: IMAGE,
          },
          setup: {},
          runs: [],
      };
const save = () => fs.writeFileSync(SUMMARY, JSON.stringify(summary, null, 2));
const execute = (command, args, env = process.env) => {
    const start = process.hrtime.bigint();
    const result = spawnSync(command, args, {cwd: ROOT, env, stdio: 'inherit'});
    const durationMs = Number(process.hrtime.bigint() - start) / 1e6;
    if (result.error) throw result.error;
    return {exitCode: result.status ?? 1, durationMs};
};
const action = process.argv[2];
if (action === 'prepare-container' || action === 'prepare-native') {
    const result =
        action === 'prepare-container'
            ? execute('docker', ['pull', IMAGE])
            : execute(process.execPath, [CLI, 'install', '--with-deps', 'chromium']);
    summary.setup[action] = result;
    save();
    process.exitCode = result.exitCode;
} else if (action === 'container' || action === 'native') {
    const runRoot = path.join(OUTPUT, action);
    fs.mkdirSync(runRoot, {recursive: true});
    fs.rmSync(PATH_AXE_REPORTS, {recursive: true, force: true});
    const overrides = {
        CI: 'true',
        LANG: 'C.UTF-8',
        TZ: 'UTC',
        PLAYWRIGHT_WS_ENDPOINT: '',
        PLAYWRIGHT_JSON_OUTPUT_NAME: path.join(runRoot, 'results.json'),
        PLAYWRIGHT_HTML_OUTPUT_DIR: path.join(runRoot, 'html'),
        PLAYWRIGHT_HTML_OPEN: 'never',
    };
    const args = [
        CLI,
        'test',
        '-c',
        path.join(__dirname, 'playwright.config.ts'),
        '--workers=2',
        '--reporter=list,html,json',
        '--output',
        path.join(runRoot, 'output'),
    ];
    let result;
    if (action === 'native') {
        result = execute(process.execPath, args, {...process.env, ...overrides});
    } else {
        const nodeRoot = path.dirname(path.dirname(process.execPath));
        result = execute('docker', [
            'run',
            '--rm',
            '--ipc=host',
            '--platform=linux/amd64',
            '--user',
            `${process.getuid()}:${process.getgid()}`,
            '--volume',
            `${ROOT}:${ROOT}`,
            '--volume',
            `${nodeRoot}:${nodeRoot}:ro`,
            '--workdir',
            ROOT,
            '--env',
            `PATH=${nodeRoot}/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin`,
            '--env',
            'XDG_CACHE_HOME=/tmp/a11y-cache',
            ...Object.entries(overrides).flatMap(([key, value]) => ['--env', `${key}=${value}`]),
            IMAGE,
            process.execPath,
            ...args,
        ]);
    }
    const reportPath = path.join(runRoot, 'results.json');
    const report = fs.existsSync(reportPath) ? JSON.parse(fs.readFileSync(reportPath, 'utf8')) : null;
    let engine;
    let browser;
    let viewport;
    const outcomes = cases.map(({story, skin}) => {
        const reportPath = getAxeReportPath(story, skin);
        if (!fs.existsSync(reportPath)) return {story, skin, missing: true};
        const axe = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
        engine = axe.testEngine;
        browser = axe.testEnvironment.userAgent;
        viewport = {width: axe.testEnvironment.windowWidth, height: axe.testEnvironment.windowHeight};
        return {
            story,
            skin,
            violations: axe.violations.map(({id, nodes}) => ({id, targets: nodes.map(({target}) => target)})),
        };
    });
    fs.writeFileSync(path.join(OUTPUT, `outcomes-${action}.json`), JSON.stringify(outcomes, null, 2));
    summary.runs.push({
        mode: action,
        ...result,
        stats: report?.stats,
        engine,
        browser,
        viewport,
        outcomeHash: crypto.createHash('sha256').update(JSON.stringify(outcomes)).digest('hex'),
    });
    save();
    console.log(JSON.stringify(summary.runs.at(-1), null, 2));
    if (
        result.exitCode !== 0 ||
        report?.stats.expected !== cases.length ||
        report?.stats.unexpected !== 0 ||
        report?.stats.skipped !== 0
    ) {
        process.exitCode = 1;
    }
} else if (action === 'compare') {
    const container = summary.runs.find(({mode}) => mode === 'container');
    const native = summary.runs.find(({mode}) => mode === 'native');
    if (!container || !native) throw new Error('Both audit runs are required');
    const passed = (run) =>
        run.exitCode === 0 &&
        run.stats?.expected === cases.length &&
        run.stats.unexpected === 0 &&
        run.stats.skipped === 0;
    const equalResults = passed(container) && passed(native) && container.outcomeHash === native.outcomeHash;
    const containerTotalMs = container.durationMs + summary.setup['prepare-container'].durationMs;
    const nativeTotalMs = native.durationMs + summary.setup['prepare-native'].durationMs;
    summary.comparison = {
        equalResults,
        auditOnlyNativeImprovementPercent:
            (100 * (container.durationMs - native.durationMs)) / container.durationMs,
        includingPreparationNativeImprovementPercent:
            (100 * (containerTotalMs - nativeTotalMs)) / containerTotalMs,
        containerTotalMs,
        nativeTotalMs,
        caveat: 'One complete run per environment, sequentially on the same Linux runner. Preparation measured separately. Same Node binary, Chromium release, static Storybook, two workers and reporters. Checkout, dependencies and build are common and excluded.',
    };
    save();
    console.log(JSON.stringify(summary, null, 2));
    if (process.env.GITHUB_STEP_SUMMARY) {
        const seconds = (ms) => `${(ms / 1000).toFixed(1)} s`;
        fs.appendFileSync(
            process.env.GITHUB_STEP_SUMMARY,
            [
                '# Accessibility runtime comparison',
                '',
                '| Environment | Preparation | Audit + reporters | Total excluding common build |',
                '| --- | ---: | ---: | ---: |',
                ...summary.runs.map(
                    (run) =>
                        `| ${run.mode} | ${seconds(summary.setup[`prepare-${run.mode}`].durationMs)} | ${seconds(run.durationMs)} | ${seconds(run.durationMs + summary.setup[`prepare-${run.mode}`].durationMs)} |`
                ),
                '',
                `Same results for all ${cases.length} cases: ${equalResults}.`,
                '',
                summary.comparison.caveat,
                '',
            ].join('\n')
        );
    }
    if (!equalResults) process.exitCode = 1;
} else {
    throw new Error(`Unknown action: ${action}`);
}
