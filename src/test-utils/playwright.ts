import {test as base, expect} from '@playwright/test';
import path from 'path';
import {kebabCase} from 'lodash';
import {initializeBrowser, closeBrowserContext} from './browser';

import type {Server} from 'http';
import type {Locator, Page, PageAssertionsToHaveScreenshotOptions} from '@playwright/test';

let ssrPort: number | undefined;
let screenshotIndex = 0;

export const getSSRPort = (): number => {
    if (ssrPort === undefined) {
        throw new Error('SSR pages require the SSR Playwright project');
    }
    return ssrPort;
};

export const test = base.extend<{browserSession: void}, {ssrServer: Server | undefined}>({
    ssrServer: [
        async ({}, use, workerInfo) => {
            if (workerInfo.project.name !== 'ssr') {
                await use(undefined);
                return;
            }
            process.env.SSR_TEST = 'true';
            const {createServer} = await import('./ssr');
            const server = createServer();
            await new Promise<void>((resolve) => server.listen(0, resolve));
            try {
                await use(server);
            } finally {
                await new Promise<void>((resolve, reject) =>
                    server.close((error) => (error ? reject(error) : resolve()))
                );
            }
        },
        {scope: 'worker'},
    ],
    browserSession: [
        async ({browser, ssrServer}, use) => {
            const address = ssrServer?.address();
            ssrPort = address && typeof address !== 'string' ? address.port : undefined;
            screenshotIndex = 0;
            await initializeBrowser(browser);
            const messages: Array<string> = [];
            const originalError = console.error;
            const originalWarn = console.warn;
            console.error = (...args) => {
                messages.push(args.map(String).join(' '));
                originalError(...args);
            };
            console.warn = (...args) => {
                messages.push(args.map(String).join(' '));
                originalWarn(...args);
            };
            try {
                await use();
            } finally {
                console.error = originalError;
                console.warn = originalWarn;
                await closeBrowserContext();
            }
            expect(messages, 'Unexpected console warnings or errors').toEqual([]);
        },
        {auto: true},
    ],
});

export {expect};

export type ScreenshotOptions = PageAssertionsToHaveScreenshotOptions;

export const expectScreenshot = async (
    target: Page | Locator | Buffer,
    options: ScreenshotOptions = {}
): Promise<void> => {
    const info = test.info();
    const name = `${kebabCase(`${path.basename(info.file)} ${info.titlePath.slice(1).join(' ')} ${++screenshotIndex}`)}-snap.png`;
    if (Buffer.isBuffer(target)) {
        expect(target).toMatchSnapshot(name, options);
        return;
    }
    await expect(target).toHaveScreenshot(name, {caret: 'initial', animations: 'allow', ...options});
};

export const renderingTolerance = {maxDiffPixelRatio: 0.001};
