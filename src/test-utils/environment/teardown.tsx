import puppeteerTeardown from 'jest-environment-puppeteer/teardown';
import path from 'path';
import os from 'os';
import fs from 'fs';
import {execSync} from 'child_process';

export default async (): Promise<void> => {
    if (process.argv.includes('--ci')) {
        console.log('\nStopping storybook server');
        // @ts-expect-error __STORYBOOK_SERVER__ does not exist in global
        global.__STORYBOOK_SERVER__.stop();
    }
    const hasToKillDockerPath = path.join(os.tmpdir(), 'jest_puppeteer_setup', 'killDocker');
    if (fs.existsSync(hasToKillDockerPath)) {
        fs.unlinkSync(hasToKillDockerPath);
        execSync('yarn down-chromium', {stdio: 'inherit'});
    }
    await puppeteerTeardown();
};
