const path = require('path');

const replaceBabelWithSwc = (config) => {
    // Replace default webpack babel-loader with swc-loader
    config.module.rules.forEach((rule) => {
        if (rule.use) {
            rule.use = rule.use.map((loaderConfig) => {
                if (loaderConfig.loader?.includes('babel-loader')) {
                    return {
                        loader: require.resolve('swc-loader'),
                    };
                }
                return loaderConfig;
            });
        }
    });
    return config;
};

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
        './dark-mode-addon/register',
        './font-size-addon/register',
        '@storybook/addon-controls',
    ],
    webpackFinal: async (config) => {
        config.watchOptions = {
            ...config.watchOptions,
            ignored: [/node_modules/, /__tests__/, /__acceptance_tests__/, /__screenshot_tests__/],
        };

        return replaceBabelWithSwc(config);
    },
    managerWebpack: async (config) => {
        return replaceBabelWithSwc(config);
    },
    typescript: {
        // workaround for https://github.com/storybookjs/storybook/issues/15067
        reactDocgen: 'none',
    },
};
