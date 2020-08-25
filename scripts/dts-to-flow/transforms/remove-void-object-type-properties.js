/**
 * Sometimes, in TS we need to add void object type properties in discriminant unions (Touchable props for example)
 * These properties are not needed in Flow, and in most of the cases including them in the Flow types will make the
 * the types to not behave as expected. To avoid this, we remove those property type annotations in Flow types.
 */
module.exports = (file, api) => {
    const j = api.jscodeshift;

    return j(file.source)
        .find(j.ObjectTypeProperty, {
            value: {type: 'VoidTypeAnnotation'},
            optional: true,
        })
        .forEach((path) => {
            j(path).remove();
        })
        .toSource();
};

module.exports.parser = 'flow';
