import {defineConfig} from '@playwright/test';

const PLAYWRIGHT_WS_ENDPOINT = process.env.PLAYWRIGHT_WS_ENDPOINT;
const useStaticStorybook = Boolean(process.env.CI || PLAYWRIGHT_WS_ENDPOINT);

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
    reporter: [['list'], ['html', {outputFolder: 'reports/playwright-html', open: 'never'}]],
    expect: {
        timeout: 10000,
        toHaveScreenshot: {
            pathTemplate: '{testDir}/{testFileDir}/__image_snapshots__/{arg}{ext}',
            threshold: 0.01,
            animations: 'allow',
            caret: 'initial',
            scale: 'device',
        },
        toMatchSnapshot: {threshold: 0.01},
    },
    use: {
        browserName: 'chromium',
        headless: true,
        // TODO https://github.com/Telefonica/mistica-web/issues/1840 switch to English.
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
