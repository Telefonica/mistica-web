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
                loose: true,
            },
        ],
    ],
    plugins: ['lodash'],
};
