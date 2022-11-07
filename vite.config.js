import path from 'path';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin';
import noBundlePlugin from 'vite-plugin-no-bundle';

export default defineConfig({
    plugins: [
        react(),
        vanillaExtractPlugin(),
        noBundlePlugin({
            // Change .css.js files to something else so that they don't get re-processed by consumer apps using vanilla extract too
            fileNames: ({name}) => `${name.replace(/\.css$/, '.css-mistica')}.js`,
        }),
    ],
    publicDir: false,
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src', 'index.tsx'),
            formats: ['es'],
        },
        outDir: 'dist-es',
    },
});
