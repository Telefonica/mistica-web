module.exports = {
    presets: [
        '@babel/preset-react',
        [
            '@babel/preset-typescript',
            {
                isTSX: true,
                allExtensions: true,
                allowNamespaces: false,
                allowDeclareFields: true,
            },
        ],
        [
            '@babel/preset-env',
            {
                modules: false,
                useBuiltIns: false,
                loose: false,
            },
        ],
    ],
    plugins: [
        'lodash',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-transform-property-literals',

        // ['@babel/plugin-proposal-class-properties', {loose: true}],
        // ['@babel/plugin-proposal-private-methods', {loose: true}],
        // ['@babel/plugin-proposal-private-property-in-object', {loose: true}],

        ['@babel/plugin-proposal-class-properties'],
        ['@babel/plugin-proposal-private-methods'],
        ['@babel/plugin-proposal-private-property-in-object'],
    ],
};
// https://github.com/storybookjs/storybook/pull/15055
