#!/usr/bin/env node
/**
 * Renders AI-generated Netflix page components (month-ago vs after)
 * and saves PNG screenshots for visual comparison.
 *
 * Usage: node scripts/screenshot-ai-output.js
 */

const puppeteer = require('puppeteer');
const {execSync, spawn} = require('child_process');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const RENDER_DIR = path.join(ROOT, 'ai-test', 'render');
const SCREENSHOTS_DIR = path.join(ROOT, 'ai-test', 'screenshots');
const CHROMIUM = path.join(
    ROOT,
    'node_modules/puppeteer/.local-chromium/mac-901912/chrome-mac/Chromium.app/Contents/MacOS/Chromium'
);

const VARIANTS = [
    {
        name: '2026-03-w12',
        label: '2026-03-20 week 12 (thin AGENTS.md, no skills)',
        componentFile: 'streaming-home-page-month-ago.tsx',
        outputFile: '2026-03-w12-netflix.png',
        // Generated code is missing ThemeContextProvider — add it for rendering
        wrapWithTheme: true,
    },
    {
        name: 'after',
        label: 'After improvements (full skills + AGENTS.md)',
        componentFile: 'streaming-home-page-after.tsx',
        outputFile: 'after-netflix.png',
        wrapWithTheme: false,
    },
];

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function startVite(componentFile, wrapWithTheme) {
    // Write main.tsx pointing to the specific component
    const wrapperImport = wrapWithTheme
        ? `import {ThemeContextProvider, getMovistarNewSkin} from '@telefonica/mistica';
import '@telefonica/mistica/css/mistica.css';
const theme = {skin: getMovistarNewSkin(), i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'}};`
        : '';
    const wrapperOpen = wrapWithTheme
        ? 'React.createElement(ThemeContextProvider, {theme}, React.createElement(Component))'
        : 'React.createElement(Component)';

    const mainContent = `import * as React from 'react';
import {createRoot} from 'react-dom/client';
import Component from './${componentFile.replace('.tsx', '')}';
${wrapperImport}

const root = createRoot(document.getElementById('root'));
root.render(${wrapperOpen});
`;
    fs.writeFileSync(path.join(RENDER_DIR, 'main.tsx'), mainContent);

    console.log(`  Starting Vite for ${componentFile}...`);
    const proc = spawn('node', ['node_modules/.bin/vite', 'ai-test/render', '--port', '5199', '--host'], {
        cwd: ROOT,
        stdio: ['ignore', 'pipe', 'pipe'],
        env: {...process.env, FORCE_COLOR: '0'},
    });

    return new Promise((resolve, reject) => {
        let output = '';
        const timeout = setTimeout(() => {
            proc.kill();
            reject(new Error('Vite startup timed out'));
        }, 30000);

        // eslint-disable-next-line no-control-regex
        const stripAnsi = (s) => s.replace(/\x1B\[[0-9;]*[mGKHF]/g, '');
        const onData = (data) => {
            const text = stripAnsi(data.toString());
            output += text;
            if (output.includes('5199') || output.includes('ready in')) {
                clearTimeout(timeout);
                resolve(proc);
            }
        };
        proc.stdout.on('data', onData);
        proc.stderr.on('data', onData);
        proc.on('error', (err) => {
            clearTimeout(timeout);
            reject(err);
        });
    });
}

async function screenshot(variant) {
    console.log(`\n[${variant.name}] ${variant.label}`);

    let viteProc;
    try {
        viteProc = await startVite(variant.componentFile, variant.wrapWithTheme);
        console.log('  Vite ready. Launching browser...');

        await sleep(1000);

        const browser = await puppeteer.launch({
            executablePath: CHROMIUM,
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
        });

        const page = await browser.newPage();
        await page.setViewport({width: 1440, height: 900});

        console.log('  Loading page...');
        await page.goto('http://localhost:5199', {waitUntil: 'networkidle0', timeout: 20000});

        // Wait for React to hydrate
        await sleep(2000);

        const outputPath = path.join(SCREENSHOTS_DIR, variant.outputFile);
        await page.screenshot({path: outputPath, fullPage: true});
        console.log(`  Saved → ${path.relative(ROOT, outputPath)}`);

        await browser.close();
    } finally {
        if (viteProc) {
            viteProc.kill();
            await sleep(500);
        }
    }
}

async function main() {
    fs.mkdirSync(SCREENSHOTS_DIR, {recursive: true});

    console.log('=== AI Output Screenshot Tool ===\n');

    for (const variant of VARIANTS) {
        const componentPath = path.join(RENDER_DIR, variant.componentFile);
        if (!fs.existsSync(componentPath)) {
            console.log(`[${variant.name}] SKIP — ${variant.componentFile} not found`);
            continue;
        }
        await screenshot(variant);
    }

    console.log('\nDone. Screenshots saved to ai-test/screenshots/');
}

main().catch((err) => {
    console.error('Fatal:', err.message);
    process.exit(1);
});
