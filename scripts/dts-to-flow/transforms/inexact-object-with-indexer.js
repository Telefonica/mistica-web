/**
 * transforms object types with indexer to inexact
 *
 * `{[string]: string, foo: 'bar'}` => `{[string]: string, foo: 'bar', ...}`
 *
 * https://astexplorer.net/#/gist/f5bf7034127d0baf09c3cf2f48a12afe/a6cf8330161a7414d684680e88324b59ef748320
 */
module.exports = (file, api) => {
    const j = api.jscodeshift;
    const root = j(file.source);

    root.find(j.ObjectTypeAnnotation).forEach((objectTypeAnnotation) => {
        j(objectTypeAnnotation)
            .nodes()
            .some((node) => {
                if (node.indexers.length) {
                    objectTypeAnnotation.value.inexact = true;
                    objectTypeAnnotation.value.exact = false;
                }
            });
    });

    return root.toSource();
};

module.exports.parser = 'flow';
