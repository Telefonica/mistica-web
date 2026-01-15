import {resolve} from 'node:path';
import {defineConfig} from 'vite';

export default defineConfig({
    base: '/mistica-css/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(import.meta.dirname, 'index.html'),
                'error-feedback': resolve(import.meta.dirname, 'error-feedback.html'),
            },
        },
    },
});
