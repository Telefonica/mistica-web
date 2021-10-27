import puppeteerSetup from 'jest-environment-puppeteer/setup';
import {compileSsrClient} from '../ssr';

export default async (jestConfig: any = {}): Promise<void> => {
    console.log();
    if (process.env.NO_SSR) {
        console.log('⚠️ Skip building SSR bundles (NO_SSR env var set - use for development only!)');
    } else {
        console.log('Building SSR client bundles...');
        await compileSsrClient();
    }

    await puppeteerSetup(jestConfig);
};
