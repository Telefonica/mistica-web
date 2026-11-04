// eslint-disable-next-line @typescript-eslint/no-var-requires
const browserSetup = require('./setup-browser');
import {compileSsrClient} from '../ssr';

import type {Config} from '@jest/types';

export default async (
    jestConfig: Config.GlobalConfig,
    projectConfig: Config.ProjectConfig
): Promise<void> => {
    console.log();
    console.log('Building SSR client bundles...');
    await compileSsrClient({build: process.env.NO_BUILD !== 'true'});

    await browserSetup(jestConfig, projectConfig);
};
