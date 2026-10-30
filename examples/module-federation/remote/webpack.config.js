const path = require('path');
const {container} = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {common, shared, devServerHeaders} = require('../webpack.shared');

const PORT = 3002;

module.exports = {
    ...common,
    entry: './src/index.jsx',
    context: __dirname,
    output: {
        // without a unique name the two applications share the webpackChunk global and their
        // chunk registries collide, so a chunk promise of one application never settles
        uniqueName: 'remote',
        path: path.join(__dirname, 'dist'),
        publicPath: `http://localhost:${PORT}/`,
        clean: true,
    },
    // the host reads remoteEntry.js from another origin, so this server needs the headers
    devServer: {port: PORT, static: path.join(__dirname, 'dist'), headers: devServerHeaders},
    plugins: [
        new container.ModuleFederationPlugin({
            name: 'remote',
            filename: 'remoteEntry.js',
            exposes: {
                './PromoCard': './src/promo-card.jsx',
            },
            shared,
        }),
        new HtmlWebpackPlugin({template: './public/index.html'}),
    ],
};
