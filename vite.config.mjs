import path from 'path';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin';
import noBundlePlugin from 'vite-plugin-no-bundle';
import preserveDirectivesPlugin from 'rollup-plugin-preserve-directives';
import {version as packageVersion} from './package.json';

/**
 * Identifiers must start with a letter (not number) and can't contain dots
 * Removing trailing zeros to reduce the size of the identifier
 *
 * 1.2.3 => v1_2_3
 * 1.2.0 => v1_2
 * 1.0.0 => v1
 */
const version = 'v' + packageVersion.replace(/(\.0)*$/, '').replace(/\./g, '_');

export default defineConfig({
    plugins: [
        react(),
        vanillaExtractPlugin({
            identifiers: ({hash}) => `${version}_${hash}`,
        }),
        noBundlePlugin({
            // Change .css.js files to something else so that they don't get re-processed by consumer apps using vanilla extract too
            fileNames: ({name}) => `${name.replace(/\.css$/, '.css-mistica')}.js`,
        }),
        {
            ...preserveDirectivesPlugin(),
            enforce: 'post',
            apply: 'build',
        },
    ],
    resolve: {
        alias: {
            // forbid lodash usage
            lodash: '/dev/null',
            'lodash-es': '/dev/null',
        },
    },
    publicDir: false,
    build: {
        lib: {
            entry: [
                path.resolve(__dirname, 'src', 'index.tsx'),
                path.resolve(__dirname, 'src', 'community', 'index.tsx'),
            ],
            formats: ['es'],
        },
        outDir: 'dist-es',
        // https://github.com/vitejs/vite/issues/15012#issuecomment-1815854072
        rollupOptions: {
            onLog(level, log, handler) {
                if (log.cause && log.cause.message === `Can't resolve original location of error.`) {
                    return;
                }
                handler(level, log);
            },
        },
    },
});
