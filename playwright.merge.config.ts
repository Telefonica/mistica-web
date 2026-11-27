import {defineConfig} from '@playwright/test';

// `playwright merge-reports` reads only the reporters, to join the blobs of the SSR job and of every acceptance shard.
export default defineConfig({
    testDir: './src',
    reporter: [
        ['html', {outputFolder: 'reports/playwright-merged/html', open: 'never'}],
        ['json', {outputFile: 'reports/playwright-merged/results.json'}],
    ],
});
