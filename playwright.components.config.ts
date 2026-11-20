import {defineConfig} from '@playwright/test';

export default defineConfig({
    testDir: './src/__component_tests__',
    testMatch: '*-test.tsx',
    outputDir: './reports/playwright-components',
    timeout: 40000,
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    workers: process.env.CI ? 2 : undefined,
    retries: 0,
    use: {
        baseURL: 'http://127.0.0.1:5173/playwright/gallery/index.html',
        serviceWorkers: 'block',
        trace: 'retain-on-failure',
    },
    webServer: {
        command: 'yarn vite --config playwright/gallery/vite.config.ts',
        url: 'http://127.0.0.1:5173/playwright/gallery/index.html',
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
    },
});
