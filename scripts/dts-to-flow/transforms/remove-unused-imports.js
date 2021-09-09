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
        console.log(importSpecifier);

        const isUsedInScopes = () => {
            return (
                j(importDeclaration)
                    .closestScope()
                    .find(j.Identifier, {name: varName})
                    .filter((p) => {
                        console.log(p.parentPath.value);
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

    return root.find(j.ImportDeclaration).filter(processImportDeclaration).size() > 0
        ? root.toSource()
        : null;
};

module.exports.parser = 'flow';
