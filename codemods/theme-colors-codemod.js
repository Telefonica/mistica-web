/**
 * We have deprecated colors in Theme (useTheme) and replaced it with css variables defined in skinVars.colors
 *
 * To apply this codemod you need to install jscodeshift: https://github.com/facebook/jscodeshift
 *
 * Then just run:
 *
 * jscodeshift -t theme-colors-codemod.js <your codebase dir>
 *
 * Note that you may need to change the parser if you dont use tsx. See available parser options here:
 * https://github.com/facebook/jscodeshift#parser
 */

export default function transformer(file, api) {
    const j = api.jscodeshift;

    let needsSkinVarsImport = false;
    let needsUseThemeImport = false;

    // Handle: createUseStyles
    const handleCreateUseStyles = (path) => {
        path.find(j.CallExpression, {callee: {name: 'createUseStyles'}}).forEach((path) => {
            const fun = path.value.arguments[0];
            if (fun.params.length) {
                const param = fun.params[0];

                // Handle: createUseStyles((theme) => ({
                if (param.type === 'Identifier') {
                    let needsIdentifier = false;
                    const themeName = param.name;
                    j(fun.body)
                        .find(j.Identifier, {name: themeName})
                        .forEach((path) => {
                            if (path.name === 'object') {
                                if (path.parentPath.value.property.name === 'colors') {
                                    path.value.name = 'skinVars';
                                    needsSkinVarsImport = true;
                                } else {
                                    needsIdentifier = true;
                                }
                            }
                        });
                    if (!needsIdentifier) {
                        fun.params = [];
                    }
                }

                // Handle: createUseStyles(({colors}) => ({
                if (param.type === 'ObjectPattern') {
                    param.properties = param.properties.filter((p) => p.key.name !== 'colors');
                    if (param.properties.length === 0) {
                        fun.params = [];
                    }
                    j(fun.body)
                        .find(j.Identifier, {name: 'colors'})
                        .forEach((path) => {
                            if (!['key', 'value', 'property', 'name'].includes(path.name)) {
                                needsSkinVarsImport = true;
                                path.replace(
                                    j.memberExpression(j.identifier('skinVars'), j.identifier('colors'))
                                );
                            }
                        });
                }
            }
        });
    };

    // Handle: const theme = useTheme();
    const handleThemeUseTheme = (path) => {
        path.find(j.VariableDeclarator, {
            id: {
                type: 'Identifier',
            },
            init: {
                type: 'CallExpression',
                callee: {
                    name: 'useTheme',
                },
            },
        }).forEach((path) => {
            const themeName = path.value.id.name;
            const scopeBlock = j(path).closest(j.BlockStatement);
            let shouldRemove = true;
            scopeBlock.find(j.MemberExpression, {object: {name: themeName}}).forEach((path) => {
                if (path.value.property.name === 'colors') {
                    path.value.object.name = 'skinVars';
                    needsSkinVarsImport = true;
                } else {
                    needsUseThemeImport = true;
                    shouldRemove = false;
                }
            });
            if (shouldRemove) {
                path.parentPath.parentPath.replace(); // remove
            }
        });
    };

    // Handele: const {colors} = useTheme();
    const handleColorsUseTheme = (path) => {
        path.find(j.VariableDeclarator, {
            id: {
                type: 'ObjectPattern',
            },
            init: {
                type: 'CallExpression',
                callee: {
                    name: 'useTheme',
                },
            },
        }).forEach((path) => {
            const filteredProperties = path.value.id.properties.filter((p) => p.key.name !== 'colors');
            if (filteredProperties.length > 0) {
                path.value.id.properties = filteredProperties;
                needsUseThemeImport = true;
            } else {
                path.parentPath.parentPath.replace(); // remove
            }
            const scopeBlock = j(path).closest(j.BlockStatement);
            scopeBlock.find(j.Identifier, {name: 'colors'}).forEach((path) => {
                if (!['key', 'value', 'property', 'name'].includes(path.name)) {
                    path.replace(j.memberExpression(j.identifier('skinVars'), j.identifier('colors')));
                    needsSkinVarsImport = true;
                }
            });
        });
    };

    // Handle: useTheme().colors
    const handleUseThemeExpressions = (path) => {
        path.find(j.MemberExpression, {
            object: {
                type: 'CallExpression',
                callee: {
                    name: 'useTheme',
                },
            },
            property: {
                name: 'colors',
            },
        }).forEach((path) => {
            path.value.object = j.identifier('skinVars');
            needsSkinVarsImport = true;
        });
    };

    // Adds the skinVars import if needed and removes the useTheme import if no longer needed
    const handleImports = (path) => {
        path.find(j.ImportDeclaration, {source: {value: '@telefonica/mistica'}, importKind: 'value'}).forEach(
            (path) => {
                const addSkinVarsImport = () => {
                    if (!path.value.specifiers.map((s) => s.local.name).includes('skinVars')) {
                        path.value.specifiers.push(
                            j.importSpecifier(j.identifier('skinVars'), j.identifier('skinVars'))
                        );
                    }
                };

                if (!needsUseThemeImport) {
                    // You may think these conditions are convoluted and we could simply remove the useTheme
                    // import when not needed and add the skinVars import when needed, but I found that changing
                    // the useThemeSpecifier.local.name to skinVars when possible is more safe, because for some
                    // reason when I push a new specifier to the array, the type import specifiers break.
                    if (needsSkinVarsImport) {
                        const useThemeSpecifier = path.value.specifiers.find(
                            (s) => s.local.name === 'useTheme'
                        );
                        if (useThemeSpecifier) {
                            useThemeSpecifier.local.name = 'skinVars';
                        } else {
                            addSkinVarsImport();
                        }
                    } else {
                        path.value.specifiers = path.value.specifiers.filter(
                            (s) => s.local.name !== 'useTheme'
                        );
                    }
                } else if (needsSkinVarsImport) {
                    addSkinVarsImport();
                }
            }
        );
    };

    const path = j(file.source);

    handleColorsUseTheme(path);
    handleThemeUseTheme(path);
    handleUseThemeExpressions(path);
    handleCreateUseStyles(path);
    handleImports(path);

    return path.toSource();
}

export const parser = 'tsx';
