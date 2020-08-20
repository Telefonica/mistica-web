import puppeteerSetup from 'jest-environment-puppeteer/setup';
import {join} from 'path';
import StaticServer from 'static-server';
import {compileSsrClient} from '../ssr';

export default async (jestConfig: any = {}): Promise<void> => {
    if (process.argv.includes('--ci')) {
        console.log('\nStarting storybook server on port 6006');
        // @ts-expect-error __STORYBOOK_SERVER__ does not exist in global
        global.__STORYBOOK_SERVER__ = new StaticServer({
            rootPath: join(__dirname, '../../../public'),
            port: 6006,
        });
        // @ts-expect-error __STORYBOOK_SERVER__ does not exist in global
        global.__STORYBOOK_SERVER__.start(() => {
            console.log('Storybook server ready');
        });
    }

    const startTime = Date.now();
    await compileSsrClient();
    console.log('\nTime to compile ssr client bundles:', ((Date.now() - startTime) / 1000).toFixed(2) + 's');

    await puppeteerSetup(jestConfig);
};
