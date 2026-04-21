import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin';
import path from 'path';

const root = path.resolve(__dirname, '../..');

export default defineConfig({
    plugins: [react(), vanillaExtractPlugin()],
    resolve: {
        alias: {
            '@telefonica/mistica/css/mistica.css': path.resolve(root, 'css/mistica.css'),
            '@telefonica/mistica': path.resolve(root, 'src/index.tsx'),
        },
    },
    server: {
        port: 5199,
    },
});
