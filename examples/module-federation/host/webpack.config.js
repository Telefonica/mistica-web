const path = require('path');
const {container} = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {common, shared, devServerHeaders} = require('../webpack.shared');

const PORT = 3001;

module.exports = {
    ...common,
    entry: './src/index.jsx',
    context: __dirname,
    output: {
        // without a unique name the two applications share the webpackChunk global and their
        // chunk registries collide, so a chunk promise of one application never settles
        uniqueName: 'host',
        path: path.join(__dirname, 'dist'),
        publicPath: 'auto',
        clean: true,
    },
    devServer: {port: PORT, static: path.join(__dirname, 'dist'), headers: devServerHeaders},
    plugins: [
        new container.ModuleFederationPlugin({
            name: 'host',
            remotes: {
                remote: 'remote@http://localhost:3002/remoteEntry.js',
            },
            shared,
        }),
        new HtmlWebpackPlugin({template: './public/index.html'}),
    ],
};
