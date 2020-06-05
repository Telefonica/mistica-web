// @flow
const path = require('path');

const config /*: any*/ = {
    stories: ['./welcome-story.js', '../src/**/__stories__/*-story.js'],
    addons: [
        '@storybook/addon-links',
        {
            name: '@storybook/addon-storysource',
            options: {
                rule: {
                    test: [/\-story\.js/],
                    include: [path.resolve(__dirname, '..', 'src'), __dirname],
                },
                loaderOptions: {
                    prettierConfig: {printWidth: 80, singleQuote: false},
                },
            },
        },
        require.resolve('./theme-selector-addon/register'),
    ],
};

module.exports = config;
