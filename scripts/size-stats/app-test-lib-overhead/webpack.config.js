const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
    entry: './src/index.js',
    // entry: './src/index-baseline.js', // uncomment to generate the baseline
    output: {
        path: path.resolve(__dirname, 'dist'),
    },

    optimization: {
        splitChunks: {chunks: 'async'},
    },

    plugins: [process.env.BUNDLE_ANALYZER ? new BundleAnalyzerPlugin() : null].filter(Boolean),

    resolve: {
        alias: {'@telefonica/mistica': path.resolve(__dirname, '../../..')},
    },
};

module.exports = config;
