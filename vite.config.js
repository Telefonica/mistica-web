import path from 'path';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin';
import noBundlePlugin from 'vite-plugin-no-bundle';
import preserveDirectivesPlugin from 'rollup-plugin-preserve-directives';

export default defineConfig({
    plugins: [
        react(),
        vanillaExtractPlugin(),
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
        outDir: 'dist',
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
