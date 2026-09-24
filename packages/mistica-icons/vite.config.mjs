import path from 'path';
import {fileURLToPath} from 'url';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import noBundlePlugin from 'vite-plugin-no-bundle';
import preserveDirectivesPlugin from 'rollup-plugin-preserve-directives';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const GENERATED = path.join(dirname, 'src', 'generated');
// the specifier of the sources, which the aliases of the repository map to src/icon-runtime.tsx
const RUNTIME_MODULE = '@telefonica/mistica/icon-runtime';
// the ES module build of that contract. scripts/build-icons.js rewrites it for the CommonJS output.
const RUNTIME_MODULE_ESM = '@telefonica/mistica/dist-es/icon-runtime.js';

/**
 * The icons read the theme of @telefonica/mistica at run time, and the CSS variable names of the
 * skin contract carry the version of that package. This build must therefore never compile the
 * contract. The plugin answers "external" without a file lookup, so the build also needs no built
 * root package, and the order between the two builds never matters.
 *
 * It also rewrites the specifier to the concrete file of the ES module build. The root package has
 * no "exports" map, on purpose: a map would break every extensionless deep import of every
 * consumer. Each world therefore points at its own build, and the two packages release together.
 */
const externalRuntimePlugin = {
    name: 'external-mistica-icon-runtime',
    enforce: 'pre',
    resolveId(source) {
        if (source === RUNTIME_MODULE) {
            return {id: RUNTIME_MODULE_ESM, external: true};
        }
        return null;
    },
};

export default defineConfig({
    // vite-plugin-no-bundle keeps one file for each module, relative to this root
    root: GENERATED,
    publicDir: false,
    plugins: [
        externalRuntimePlugin,
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
            // from the output afterwards, because the published package has no entry point
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
