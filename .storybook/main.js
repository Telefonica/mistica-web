const path = require('path');
const {VanillaExtractPlugin} = require('@vanilla-extract/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const replaceBabelWithSwc = (config) => {
    // Replace default webpack babel-loader with swc-loader
    config.module.rules.forEach((rule) => {
        if (rule.use) {
            rule.use = rule.use.map((loaderConfig) => {
                if (loaderConfig.loader && loaderConfig.loader.includes('babel-loader')) {
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

const addVanillaExtractSupport = (config) => {
    // Look for rules that match CSS files and make them ignore `.vanilla.css` files (CSS files generated by vanilla-extract)
    config.module.rules.forEach((rule) => {
        if (
            rule.test &&
            (Array.isArray(rule.test)
                ? rule.test.some((exp) => exp.test('random.css'))
                : rule.test.test('random.css'))
        ) {
            const previousExclude = rule.exclude || [];
            rule.exclude = [
                ...(Array.isArray(previousExclude) ? previousExclude : [previousExclude]),
                /\.vanilla\.css$/,
            ];
        }
    });

    // We add the ignoreOrder flag to supress several warnings regarding conflicts in the order of imports.
    // https://stackoverflow.com/questions/51971857/mini-css-extract-plugin-warning-in-chunk-chunkname-mini-css-extract-plugin-con/67579319#67579319
    config.plugins.push(new VanillaExtractPlugin(), new MiniCssExtractPlugin({ignoreOrder: true}));
    config.module.rules.push({
        test: /\.vanilla\.css$/i, // Targets only CSS files generated by vanilla-extract
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: require.resolve('css-loader'),
                options: {
                    url: false, // Required as image imports should be handled via JS/TS import statements
                },
            },
            require.resolve('postcss-loader'),
        ],
    });
};

const stories = [
    './welcome-story.js',
    '../src/__stories__/*-story.tsx',
    '../src/icons/__stories__/*-story.tsx',
    '../src/community/__stories__/index-story.tsx',
    '../src/community/__stories__/*-story.tsx',
];

const shouldIncludePrivateStories = !process.env.VERCEL_PROD_BUILD;

if (shouldIncludePrivateStories) {
    stories.push('../src/**/__private_stories__/*-story.tsx');
}

module.exports = {
    stories,
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-controls',
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
    ],
    webpackFinal: async (config) => {
        config.watchOptions = {
            ...config.watchOptions,
            ignored: [
                '**/node_modules',
                '**/__tests__',
                '**/__acceptance_tests__',
                '**/__screenshot_tests__',
            ],
        };
        addVanillaExtractSupport(config);

        return replaceBabelWithSwc(config);
    },
    managerWebpack: async (config) => {
        return replaceBabelWithSwc(config);
    },
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    // building stories is slow without this workaround
    // https://github.com/storybookjs/storybook/issues/10784#issuecomment-868329216
    typescript: {
        check: false,
        reactDocgen: false,
    },
};
