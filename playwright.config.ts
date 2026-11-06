import {defineConfig} from '@playwright/test';

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
    workers: process.env.CI ? 2 : undefined,
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
        locale: 'es-ES',
        timezoneId: 'UTC',
        trace: 'retain-on-failure',
        launchOptions: {
            args: ['--font-render-hinting=none', '--disable-lcd-text', '--disable-smooth-scrolling'],
        },
    },
    webServer: {
        command: process.env.CI ? 'yarn serve-static-storybook' : 'yarn storybook-for-acceptance-tests',
        port: 6006,
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
    },
});
