import puppeteerSetup from 'jest-environment-puppeteer/setup';
import {join} from 'path';
import StaticServer from 'static-server';
import detectPort from 'detect-port';
import util from 'util';
import childProcess from 'child_process';
import {compileSsrClient} from '../ssr';

const exec = util.promisify(childProcess.exec);

const storybookPort = 6006;

const isStorybookRunning = async () => {
    try {
        const port = await detectPort(storybookPort);
        if (port !== storybookPort) {
            return true;
        }
    } catch {
        // do nothing
    }
    return false;
};

const serveStaticStorybook = () => {
    console.log(`Starting storybook server on port ${storybookPort}`);
    (global as any).__STORYBOOK_SERVER__ = new StaticServer({
        rootPath: join(__dirname, '../../../public'),
        port: storybookPort,
    });

    return new Promise((resolve) => {
        (global as any).__STORYBOOK_SERVER__.start(() => {
            console.log('Storybook server ready');
            resolve();
        });
    });
};

const buildStaticStorybook = () =>
    exec('yarn storybook-static', {env: {...process.env, NODE_ENV: 'development'}});

export default async (jestConfig: any = {}): Promise<void> => {
    console.log();
    if (process.argv.includes('--ci')) {
        await serveStaticStorybook();
    } else if (!(await isStorybookRunning())) {
        console.log('Storybook server not running. Building it...');
        await buildStaticStorybook();
        await serveStaticStorybook();
    } else {
        console.log(`Found server on port ${storybookPort}, assuming it's Storybook.`);
    }

    if (process.env.NO_SSR) {
        console.log('⚠️ Skip building SSR client (NO_SSR env var set - use for development only!)');
    } else {
        console.log('Building SSR client bundles...');
        await compileSsrClient();
    }

    await puppeteerSetup(jestConfig);
};
