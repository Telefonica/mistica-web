import path from 'path';
import {fileURLToPath} from 'url';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import noBundlePlugin from 'vite-plugin-no-bundle';
import preserveDirectivesPlugin from 'rollup-plugin-preserve-directives';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const GENERATED = path.join(dirname, 'src', 'generated');
const MISTICA = '@telefonica/mistica';

/**
 * Marks @telefonica/mistica external, so each built icon keeps `import ... from
 * '@telefonica/mistica'` in its output instead of a private copy of the library. Two failures make
 * that mandatory.
 * enforce: 'pre' answers before any resolver, so the specifier never reaches the file system. This
 * build needs no built root package, and the order of the two builds is free.
 */
const externalMisticaPlugin = {
    name: 'external-mistica',
    enforce: 'pre',
    resolveId(source) {
        if (source === MISTICA) {
            return {id: MISTICA, external: true};
        }
        return null;
    },
};

export default defineConfig({
    // vite-plugin-no-bundle keeps one file for each module, relative to this root
    root: GENERATED,
    publicDir: false,
    plugins: [
        externalMisticaPlugin,
        react(),
        noBundlePlugin(),
        {
            ...preserveDirectivesPlugin(),
            enforce: 'post',
            apply: 'build',
        },
    ],
    build: {
        outDir: path.join(dirname, 'dist-es'),
        emptyOutDir: true,
        lib: {
            // the barrel of the repository reaches every icon, and scripts/build-icons.js removes it
            // from the output afterward, because the published package has no entry point
            entry: [path.join(GENERATED, 'index.tsx')],
            formats: ['es'],
            fileName: (_, entryName) => `${entryName}.js`,
        },
        rollupOptions: {
            onwarn(warning, warn) {
                if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
                    return;
                }
                warn(warning);
            },
        },
    },
});
