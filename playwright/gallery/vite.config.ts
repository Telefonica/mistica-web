import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin';

export default defineConfig({
    plugins: [react(), vanillaExtractPlugin({identifiers: 'debug'})],
    define: {'process.env.NODE_ENV': JSON.stringify('development')},
    build: {
        outDir: 'reports/component-gallery',
        rollupOptions: {input: 'playwright/gallery/index.html'},
    },
    preview: {host: '127.0.0.1', port: 5173, strictPort: true},
    optimizeDeps: {entries: ['playwright/gallery/index.html']},
    server: {
        host: '127.0.0.1',
        port: 5173,
        strictPort: true,
        hmr: false,
        watch: {ignored: ['**/reports/**']},
    },
});
