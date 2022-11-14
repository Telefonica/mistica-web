import puppeteerSetup from 'jest-environment-puppeteer/setup';
import {compileSsrClient} from '../ssr';

export default async (jestConfig: any = {}): Promise<void> => {
    console.log();
    console.log('Building SSR client bundles...');
    await compileSsrClient({build: process.env.NO_BUILD !== 'true'});

    await puppeteerSetup(jestConfig);
};
