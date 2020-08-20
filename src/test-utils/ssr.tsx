import * as React from 'react';
import * as url from 'url';
import ReactDomServer from 'react-dom/server';
import path from 'path';
import webpack from 'webpack';
import http from 'http';
import fs from 'fs';
import {ThemeContextProvider, ServerSideStyles} from '..';

const createWebpackEntries = (): {[entryName: string]: string} => {
    const entries: {[entryName: string]: string} = {};

    // create an entry for each .tsx file in __ssr_pages__ folder
    const files = fs
        .readdirSync(path.join(__dirname, '..', '__acceptance_tests__/__ssr_pages__'))
        .filter((f) => f.endsWith('.tsx'));

    files.forEach((f) => {
        const moduleName = f.replace('.tsx', ''); //remove file extension

        // create a temporal file for the entry, it'll be removed after webpack compilation
        const clientSideEntryFile = path.join(__dirname, `temporal-file-do-not-commit-${f}`);
        fs.writeFileSync(
            clientSideEntryFile,
            `
            import * as React from 'react';
            import ReactDOM from 'react-dom';
            import Component from '../__acceptance_tests__/__ssr_pages__/${moduleName}'
            import {ThemeContextProvider} from '..'

            ReactDOM.hydrate(
                <ThemeContextProvider
                    theme={{skin: 'Movistar', i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'}}}
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

const compileClient = () => {
    const entries = createWebpackEntries();
    const webpackConfig: webpack.Configuration = {
        mode: 'development',
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

    const stats = new Promise((resolve, reject) => {
        const compiler = webpack(webpackConfig);
        compiler.run((err, stats) => {
            if (err || stats.hasErrors()) {
                reject(stats.compilation.errors);
            }
            resolve(stats);
        });
    }).finally(() => {
        // remove all temporal entry files
        Object.values(entries).forEach((file) => {
            fs.unlinkSync(file);
        });
    });

    return stats;
};

export const createServer = async (): Promise<http.Server> => {
    await compileClient();

    const server = http.createServer((req, res) => {
        const parsedUrl = url.parse(req.url || '');
        const pathParts = (parsedUrl.path || '').split('/');
        const moduleName = pathParts[pathParts.length - 1];

        if (moduleName === 'favicon.ico') {
            res.end();
            return;
        }

        let Component;
        let componentFound = true;
        try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            Component = require('../__acceptance_tests__/__ssr_pages__/' + moduleName).default;
        } catch (e) {
            console.error(e);
            componentFound = false;
            Component = () => e.message;
        }
        const serverSideStyles = new ServerSideStyles();

        const renderedComponent = ReactDomServer.renderToString(
            serverSideStyles.render(
                <ThemeContextProvider
                    theme={{skin: 'Movistar', i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'}}}
                >
                    <Component />
                </ThemeContextProvider>
            )
        );

        const css = serverSideStyles.getStylesString();
        const clientCode = componentFound
            ? fs.readFileSync(path.join(__dirname, '..', '..', 'public', 'ssr', `${moduleName}.js`))
            : '';

        res.writeHead(200);
        res.end(`
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no,viewport-fit=cover">
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
