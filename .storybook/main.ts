import {dirname} from 'path';
import {fileURLToPath} from 'url';

import type {StorybookConfig} from '@storybook/react-webpack5';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
    return dirname(fileURLToPath(import.meta.resolve?.(`${value}/package.json`) as any));
}

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [getAbsolutePath('@storybook/addon-webpack5-compiler-swc')],
    framework: getAbsolutePath('@storybook/react-webpack5'),
};
export default config;
