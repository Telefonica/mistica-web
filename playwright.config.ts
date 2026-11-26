import {defineConfig} from '@playwright/test';

import type {ReporterDescription} from '@playwright/test';

const PLAYWRIGHT_WS_ENDPOINT = process.env.PLAYWRIGHT_WS_ENDPOINT;
const useStaticStorybook = Boolean(process.env.CI || PLAYWRIGHT_WS_ENDPOINT);

// Skia rounds colors by 1-2 units on a different CPU (CI runners, Rosetta on a Mac) even with the same image.
const PIXEL_COLOR_THRESHOLD = 0.01;

/**
 * A CI job runs only a part of the tests, so it writes a blob that the build-test-report job merges with the
 * other blobs into one HTML report and one JSON report (see playwright.merge.config.ts).
 * The JSON report lets scripts and AI agents filter the failures without a read of the full run.
 */
export const createReporters = (reportName: string, blobFileName?: string): Array<ReporterDescription> =>
    process.env.CI
        ? [['list'], ['blob', {outputDir: 'reports/playwright-blob', fileName: blobFileName}]]
        : [
              ['list'],
              ['html', {outputFolder: `reports/${reportName}-html`, open: 'never'}],
              ['json', {outputFile: `reports/${reportName}-results.json`}],
          ];

export default defineConfig({
    testDir: './src',
    testMatch: [
        '**/__acceptance_tests__/*-acceptance-test.tsx',
        '**/__screenshot_tests__/*-screenshot-test.tsx',
    ],
    testIgnore: '**/*-ssr-acceptance-test.tsx',
    snapshotPathTemplate: '{testDir}/{testFileDir}/__image_snapshots__/{arg}{ext}',
    outputDir: './reports/playwright',
    timeout: 60000,
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    workers: useStaticStorybook ? 2 : undefined,
    retries: 0,
    updateSnapshots: 'none',
    reporter: createReporters('playwright'),
    expect: {
        timeout: 10000,
        toHaveScreenshot: {
            pathTemplate: '{testDir}/{testFileDir}/__image_snapshots__/{arg}{ext}',
            threshold: PIXEL_COLOR_THRESHOLD,
            animations: 'allow',
            caret: 'initial',
            scale: 'device',
        },
        toMatchSnapshot: {threshold: PIXEL_COLOR_THRESHOLD},
    },
    use: {
        browserName: 'chromium',
        headless: true,
        locale: 'es-ES',
        timezoneId: 'UTC',
        trace: 'retain-on-failure',
        connectOptions: PLAYWRIGHT_WS_ENDPOINT
            ? {wsEndpoint: PLAYWRIGHT_WS_ENDPOINT, exposeNetwork: '<loopback>'}
            : undefined,
        launchOptions: {
            env: {...process.env, LANG: 'es_ES.UTF-8', LANGUAGE: 'es_ES:es'},
            args: [
                '--lang=es-ES',
                '--font-render-hinting=none',
                '--disable-lcd-text',
                '--disable-smooth-scrolling',
            ],
        },
    },
    webServer: {
        command: useStaticStorybook ? 'yarn serve-static-storybook' : 'yarn storybook-for-acceptance-tests',
        port: 6006,
        reuseExistingServer: !useStaticStorybook,
        timeout: 120000,
    },
});
