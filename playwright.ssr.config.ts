import {defineConfig} from '@playwright/test';
import path from 'path';
import config, {createReporters} from './playwright.config';

process.env.NODE_ENV = 'test';

export default defineConfig({
    ...config,
    name: 'ssr',
    // The tag tells the SSR tests apart from the acceptance tests in the merged CI report.
    tag: '@ssr',
    // Without a shard the blob is named report.zip, so a fixed name keeps it apart from the acceptance blobs.
    reporter: createReporters('playwright-ssr', 'report-ssr.zip'),
    // SSR renders the built packages without the aliases to TypeScript sources.
    tsconfig: './src/test-utils/tsconfig.ssr.json',
    testMatch: '**/__acceptance_tests__/*-ssr-acceptance-test.tsx',
    testIgnore: [],
    webServer: undefined,
    globalSetup: './src/test-utils/environment/setup-ssr.tsx',
    expect: {
        ...config.expect,
        toHaveScreenshot: {
            ...config.expect?.toHaveScreenshot,
            pathTemplate: path.resolve('reports/playwright-hydration/{testFilePath}/{testName}/{arg}{ext}'),
        },
    },
    updateSnapshots: 'none',
});
