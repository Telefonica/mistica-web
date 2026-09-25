import path from 'path';
import {defineConfig} from 'vite';
import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin';
import EntryShakingPlugin from 'vite-plugin-entry-shaking';

const ICONS_DIR = path.resolve(__dirname, '..', 'packages', 'mistica-icons', 'src', 'generated');

export default defineConfig({
    /**
     * Read the icons from their source, not from the build of the workspace, and give the icons the
     * theme of the root package. The same pairs live in tsconfig.json, jest.base.config.js and
     * playroom.config.js.
     */
    resolve: {
        alias: [
            {
                find: /^@telefonica\/mistica$/,
                replacement: path.resolve(__dirname, '..', 'src', 'index.tsx'),
            },
            {
                find: /^@telefonica\/mistica-icons\/keywords$/,
                replacement: path.join(ICONS_DIR, 'icons-keywords.tsx'),
            },
            {
                find: /^@telefonica\/mistica-icons\/(icon-.*)$/,
                replacement: path.join(ICONS_DIR, '$1.tsx'),
            },
        ],
    },
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
