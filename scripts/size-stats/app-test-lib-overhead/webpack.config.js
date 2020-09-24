const path = require('path');

const config = {
    entry: './src/index.js',
    // entry: './src/index-baseline.js', // uncomment to generate the baseline
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        alias: {'@telefonica/mistica': path.resolve(__dirname, '../../..')},
    },
};

module.exports = config;
