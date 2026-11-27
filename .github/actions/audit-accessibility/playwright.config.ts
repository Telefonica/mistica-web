import path from 'path';
import {defineConfig} from 'playwright/test';

const PATH_REPO_ROOT = path.join(__dirname, '../../..');
const STORYBOOK_PORT = 6006;
const PLAYWRIGHT_WS_ENDPOINT = process.env.PLAYWRIGHT_WS_ENDPOINT;

export default defineConfig({
    testDir: __dirname,
    testMatch: 'audit.spec.ts',
    fullyParallel: true,
    outputDir: path.join(PATH_REPO_ROOT, 'reports/playwright-a11y'),
    reporter: [
        ['list'],
        ['html', {open: 'never', outputFolder: path.join(PATH_REPO_ROOT, 'reports/playwright-a11y-html')}],
    ],
    use: {
        baseURL: `http://localhost:${STORYBOOK_PORT}`,
        viewport: {width: 800, height: 600},
        trace: 'retain-on-failure',
        // `<loopback>` lets a dockerized browser reach the static storybook through the client's localhost
        connectOptions: PLAYWRIGHT_WS_ENDPOINT
            ? {wsEndpoint: PLAYWRIGHT_WS_ENDPOINT, exposeNetwork: '<loopback>'}
            : undefined,
    },
    webServer: {
        command: 'node scripts/serve-static-storybook.js',
        cwd: PATH_REPO_ROOT,
        url: `http://localhost:${STORYBOOK_PORT}/index.json`,
        reuseExistingServer: !process.env.CI && !PLAYWRIGHT_WS_ENDPOINT,
    },
});
