import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin';
import noBundlePlugin from 'vite-plugin-no-bundle';
import preserveDirectivesPlugin from 'rollup-plugin-preserve-directives';
import packageJson from './package.json';

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
            entry: ['./src/index.tsx', './src/community/index.tsx'],
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
            // otherwise, all dependencies are included in a "node_modules" folder inside "./dist"
            external: [
                ...Object.keys(packageJson.dependencies),
                ...Object.keys(packageJson.peerDependencies),
                'react/jsx-runtime',
                'moment/locale/de',
                'moment/locale/es',
                'moment/locale/en-gb',
                'moment/locale/pt-br',
                'moment/moment',
                '@vanilla-extract/sprinkles/createRuntimeSprinkles',
            ],
        },
    },
});
