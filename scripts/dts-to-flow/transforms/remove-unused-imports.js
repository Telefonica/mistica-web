/**
 * Removes unused imports
 * e.g:
 *   `import { UsedSpecifier, NonUsedSpecifier } from "./module"` => `import { UsedSpecifier } from "./module"`;
 *   `import type { UsedSpecifier, NonUsedSpecifier } from "./module"` => `import type { UsedSpecifier } from "./module"`;
 *   `import  UsedSpecifier, { NonUsedSpecifier } from "./module"` => `import UsedSpecifier from "./module"`;
 *   `import  NonUsedSpecifier, { UsedSpecifier } from "./module"` => `import {UsedSpecifier} from "./module"`;
 *   `import  { NonUsedSpecifier } from "./module"` => ``;
 *
 */
module.exports = (file, api) => {
    const j = api.jscodeshift;
    const root = j(file.source);

    const removeIfUnused = (importSpecifier, importDeclaration) => {
        const varName = importSpecifier.value.local.name;

        const isUsedInScopes = () => {
            return (
                j(importDeclaration)
                    .closestScope()
                    .find(j.Identifier, {name: varName})
                    .filter((p) => {
                        return p.parentPath.value !== importSpecifier.value;
                    })
                    .size() > 0
            );
        };

        if (!isUsedInScopes()) {
            j(importSpecifier).remove();
            return true;
        }
        return false;
    };

    const removeUnusedImports = (importDeclaration, specifierType) => {
        return (
            j(importDeclaration)
                .find(specifierType)
                .filter((s) => removeIfUnused(s, importDeclaration))
                .size() > 0
        );
    };

    const processImportDeclaration = (importDeclaration) => {
        // e.g. import 'styles.css'; // Don't Touch these imports!
        if (importDeclaration.value.specifiers.length === 0) return false;

        const hadUnusedDefaultImport = removeUnusedImports(importDeclaration, j.ImportDefaultSpecifier);
        const hadUnusedNonDefaultImports = removeUnusedImports(importDeclaration, j.ImportSpecifier);

        if (importDeclaration.value.specifiers.length === 0) {
            j(importDeclaration).remove();
            return true;
        }
        return hadUnusedDefaultImport || hadUnusedNonDefaultImports;
    };

    /**
     * Sometimes, in TS we need to add void object type properties in discriminant unions (Touchable props for example)
     * These properties are not needed in Flow, and in most of the cases including them in the Flow types will make the
     * the types to not behave as expected. To avoid this, we remove those property type annotations in Flow types.
     */
    root.find(j.ObjectTypeProperty, {
        value: {type: 'VoidTypeAnnotation'},
        optional: true,
    }).forEach((path) => {
        j(path).remove();
    });

    /**
     * transforms array annotations to generic
     *
     * `(number|string)[]` => `Array<number|string>`
     *
     * https://astexplorer.net/#/gist/70ae33000e4b6ce7696c7aeca455b6f6/fc4f4f06bc4f7a49a20a5a0543dfca6db8618403
     */
    root.find(j.ArrayTypeAnnotation).replaceWith((arrayTypeAnnotation) =>
        j.genericTypeAnnotation(
            j.identifier('Array'),
            j.typeParameterInstantiation([arrayTypeAnnotation.node.elementType])
        )
    );

    root.find(j.ImportDeclaration).filter(processImportDeclaration);
    return root.toSource();
};

module.exports.parser = 'flow';
