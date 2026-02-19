import path from 'path';
import {defineConfig} from 'vite';
import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin';
import EntryShakingPlugin from 'vite-plugin-entry-shaking';

export default defineConfig({
    define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.SSR_TEST': JSON.stringify(''),
    },
    plugins: [
        vanillaExtractPlugin(),
        EntryShakingPlugin({
            targets: [path.resolve(__dirname, '../src', 'index.tsx')],
        }),
    ],
});
