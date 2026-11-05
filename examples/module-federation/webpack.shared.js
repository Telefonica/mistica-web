/**
 * Configuration that the host and the remote of this example have in common.
 *
 * The package.json of this example links the two packages with the portal protocol, so the example
 * measures the build of this repository. A real application installs them from npm instead, and
 * needs no other change.
 */
const path = require('path');

/**
 * The icons package has no entry point, so a host cannot share its bare name: webpack finds no
 * module to provide. Set SHARE_ICONS=1 to share the path prefix instead, and note the trailing
 * slash. Without it, each application bundles the icons that it uses.
 */
const sharedIcons = process.env.SHARE_ICONS === '1' ? {'@telefonica/mistica-icons/': {}} : {};

/**
 * The version of @telefonica/mistica comes from a portal dependency, which webpack cannot read, so
 * this entry accepts any version. A real application removes that line.
 */
const shared = {
    react: {singleton: true},
    'react-dom': {singleton: true},
    '@telefonica/mistica': {singleton: true, requiredVersion: false},
    ...sharedIcons,
};

/**
 * webpack-dev-server 5.2.6 answers "Cross-Origin-Resource-Policy: same-origin" on every response
 * (see lib/Server.js:2055), so the page of the host cannot load the remoteEntry.js of another port.
 * The browser reports "blocked due to its Cross-Origin-Resource-Policy header". The dev server drops
 * that default header when a configuration declares the CORS wildcard, and every federated remote
 * needs the wildcard anyway. A production server of a remote must send the same two headers.
 */
const devServerHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Cross-Origin-Resource-Policy': 'cross-origin',
};

const common = {
    mode: 'production',
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            /**
             * The portal protocol keeps @telefonica/mistica in the repository, so it would resolve
             * the react of the repository while this example resolves its own. Two copies of react
             * break every hook, and they mix the two JSX runtimes. An application that installs the
             * library from npm has one copy already, and needs no alias.
             */
            react: path.dirname(require.resolve('react/package.json')),
            'react-dom': path.dirname(require.resolve('react-dom/package.json')),
            /**
             * Mistica ships no font, so each application declares the @font-face rules of its skin.
             * This alias reads the files of the repository. A real application serves its own copy
             * of the .woff2 files and imports them by a relative path.
             */
            '@fonts': path.join(__dirname, '..', '..', 'assets', 'fonts'),
        },
        /**
         * webpack 5.111 reads the nearest tsconfig.json and applies its "paths" (see
         * lib/config/defaults.js). The tsconfig of this repository maps @telefonica/mistica and
         * @telefonica/mistica-icons to their TypeScript sources, for Storybook and for the tests.
         * This example must read the build, exactly as an application does. An example outside this
         * repository needs no such line.
         */
        tsconfig: false,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'swc-loader',
                    options: {
                        jsc: {
                            parser: {syntax: 'ecmascript', jsx: true},
                            transform: {react: {runtime: 'automatic'}},
                        },
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.woff2$/,
                type: 'asset/resource',
            },
        ],
    },
    // the components of mistica carry the "use client" directive, which webpack does not know
    ignoreWarnings: [{message: /MODULE_LEVEL_DIRECTIVE/}],
    performance: {hints: false},
    stats: 'errors-warnings',
};

module.exports = {common, shared, devServerHeaders};
