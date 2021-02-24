const path = require('path');

module.exports = {
    stories: ['./welcome-story.js', '../src/**/__stories__/*-story.tsx'],
    addons: [
        '@storybook/addon-links',
        {
            name: '@storybook/addon-storysource',
            options: {
                rule: {
                    test: [/-story\.tsx/, /welcome-story\.js/],
                    include: [path.resolve(__dirname, '..', 'src'), __dirname],
                },
                loaderOptions: {
                    prettierConfig: {printWidth: 80, singleQuote: false},
                },
            },
        },
        './theme-selector-addon/register',
        './platform-selector-addon/register',
        './font-size-addon/register.js',
    ],
    webpackFinal: async (config) => {
        config.watchOptions = {
            ...config.watchOptions,
            ignored: [/node_modules/, /__tests__/, /__acceptance_tests__/, /__screenshot_tests__/],
        };

        config.module.rules.push({
            test: /\.(woff2)$/,
            loaders: ['file-loader'],
            include: path.resolve(__dirname, '../'),
        });

        return config;
    },
};
