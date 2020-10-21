/**
 * transforms array annotations to generic
 *
 * `(number|string)[]` => `Array<number|string>`
 *
 * https://astexplorer.net/#/gist/70ae33000e4b6ce7696c7aeca455b6f6/fc4f4f06bc4f7a49a20a5a0543dfca6db8618403
 */
module.exports = (file, api) => {
    const j = api.jscodeshift;
    const root = j(file.source);

    root.find(j.ArrayTypeAnnotation).replaceWith((arrayTypeAnnotation) =>
        j.genericTypeAnnotation(
            j.identifier('Array'),
            j.typeParameterInstantiation([arrayTypeAnnotation.node.elementType])
        )
    );

    return root.toSource();
};

module.exports.parser = 'flow';
