import path from 'path';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin';
import noBundlePlugin from 'vite-plugin-no-bundle';

export default defineConfig({
    plugins: [react(), vanillaExtractPlugin(), noBundlePlugin()],
    publicDir: false,
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src', 'index.tsx'),
            formats: ['es'],
        },
        outDir: 'dist-es',
    },
});
