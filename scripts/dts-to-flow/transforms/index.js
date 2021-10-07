const transforms = [
    require('./array-to-generic'),
    require('./remove-unused-imports'),
    require('./remove-void-object-type-properties'),
];

module.exports = (file, api) => {
    const j = api.jscodeshift;
    const root = j(file.source);

    transforms.forEach((transform) => {
        transform(root, j);
    });

    return root.toSource();
};

module.exports.parser = 'flow';
