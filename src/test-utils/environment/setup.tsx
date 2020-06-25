import puppeteerSetup from 'jest-environment-puppeteer/setup';
import {join} from 'path';
import StaticServer from 'static-server';

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
    await puppeteerSetup(jestConfig);
};
