import * as React from 'react';
import * as url from 'url';
import ReactDomServer from 'react-dom/server';
import path from 'path';
import webpack from 'webpack';
import http from 'http';
import fs from 'fs';
import {ThemeContextProvider, ServerSideStyles} from '..';
import {MOVISTAR_SKIN} from '../skins/constants';
import {getSkinByName} from '../skins/utils';
import {SkinName} from '../skins/types';

const createWebpackEntries = (): {[entryName: string]: string} => {
    const entries: {[entryName: string]: string} = {};

    // create an entry for each .tsx file in __ssr_pages__ folder
    const files = fs
        .readdirSync(path.join(__dirname, '..', '__acceptance_tests__/__ssr_pages__'))
        .filter((f) => f.endsWith('.tsx'));

    files.forEach((f) => {
        const moduleName = f.replace('.tsx', ''); //remove file extension

        // create a temporary file for the entry, it'll be removed after webpack compilation
        const clientSideEntryFile = path.join(__dirname, `temporary-file-do-not-commit-${f}`);
        fs.writeFileSync(
            clientSideEntryFile,
            `
            import * as React from 'react';
            import ReactDOM from 'react-dom';
            import Component from '../__acceptance_tests__/__ssr_pages__/${moduleName}';
            import {ThemeContextProvider, getSkinByName} from '..';

            const skin = new URL(location).searchParams.get('skin');

            ReactDOM.hydrate(
                <ThemeContextProvider
                    theme={{
                        skin: getSkinByName(skin || 'Movistar'),
                        i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'}
                    }}
                >
                    <Component />
                </ThemeContextProvider>,
                document.getElementById('root')
            );`
        );

        entries[moduleName] = clientSideEntryFile;
    });

    return entries;
};

export const compileSsrClient = (): Promise<webpack.Stats> => {
    const entries = createWebpackEntries();
    const webpackConfig: webpack.Configuration = {
        mode: 'development',
        // While testing NODE_ENV will get evaluated to test on the server, so it should be the same on the browser bundles.
        optimization: {
            nodeEnv: 'test',
        },
        entry: entries,
        output: {
            path: path.resolve(__dirname, '..', '..', 'public', 'ssr'),
            filename: '[name].js',
        },
        module: {
            rules: [
                {
                    test: /\.tsx$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            configFile: path.join(__dirname, '..', '..', '.babelrc'),
                        },
                    },
                    exclude: [/node_modules/],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.js', '.json', '.wasm', '.mjs', '*'],
        },
    };

    const stats = new Promise<webpack.Stats>((resolve, reject) => {
        const compiler = webpack(webpackConfig);
        compiler.run((err, stats: any) => {
            if (err || stats.hasErrors()) {
                reject(stats.compilation.errors);
            }
            resolve(stats);
        });
    }).finally(() => {
        // remove all temporary entry files
        Object.values(entries).forEach((file) => {
            fs.unlinkSync(file);
        });
    });

    return stats;
};

export const createServer = (): http.Server => {
    const server = http.createServer((req, res) => {
        const parsedUrl = url.parse(req.url || '', true);
        const pathParts = (parsedUrl.pathname || '').split('/');
        const moduleName = pathParts[pathParts.length - 1];

        if (moduleName === 'favicon.ico') {
            res.end();
            return;
        }

        if (moduleName.endsWith('.css') || moduleName.endsWith('.woff2')) {
            fs.readFile(
                path.join(__dirname, '..', '..', '.storybook', 'css', parsedUrl.path as string),
                (err, data) => {
                    if (err) {
                        throw err;
                    }
                    res.writeHead(200);
                    res.end(data);
                }
            );
            return;
        }

        let Component;
        try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            Component = require('../__acceptance_tests__/__ssr_pages__/' + moduleName).default;
        } catch (e) {
            res.writeHead(404);
            res.end();
            return;
        }

        const serverSideStyles = new ServerSideStyles();

        const userAgent = req.headers['user-agent'];

        const renderedComponent = ReactDomServer.renderToString(
            serverSideStyles.render(
                <ThemeContextProvider
                    theme={{
                        skin: getSkinByName(String(parsedUrl.query.skin || MOVISTAR_SKIN) as SkinName),
                        i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
                        platformOverrides: {
                            userAgent,
                        },
                    }}
                >
                    <Component />
                </ThemeContextProvider>
            )
        );

        const css = serverSideStyles.getStylesString();
        const clientCode = fs.readFileSync(
            path.join(__dirname, '..', '..', 'public', 'ssr', `${moduleName}.js`)
        );

        res.writeHead(200);

        res.end(`
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no,viewport-fit=cover">
                    <link rel="stylesheet" href="main.css">
                    <link rel="stylesheet" href="roboto.css">
                    <style id="server-side-styles">${css}</style>
                </head>
                <body>
                    <div id="root">${renderedComponent}</div>
                    <script>${clientCode}</script>
                </body>
            </html>`);
    });

    return server;
};
