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
 * Marks @telefonica/mistica and each of its subpaths external, so each built icon keeps `import ...
 * from '@telefonica/mistica/icon-runtime'` in its output instead of a private copy of the library.
 * Two failures make that mandatory.
 * enforce: 'pre' answers before any resolver, so the specifier never reaches the file system. This
 * build needs no built root package, and the order of the two builds is free.
 */
const externalMisticaPlugin = {
    name: 'external-mistica',
    enforce: 'pre',
    resolveId(source) {
        if (source === MISTICA || source.startsWith(`${MISTICA}/`)) {
            return {id: source, external: true};
        }
        return null;
    },
};

export default defineConfig({
    /**
     * vite-plugin-no-bundle keeps one file for each module, relative to this root. Every module of
     * this build must live under it: rollup raises the base directory to the common parent, so one
     * hand-written file in src/ would move every icon to dist-es/generated/ and break the paths of
     * the "exports" map. Keep the shared code of an icon in @telefonica/mistica/icon-runtime.
     */
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
