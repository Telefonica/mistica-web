/**
 * In mistica 18.0.0 the icons moved to their own package, @telefonica/mistica-icons, and each icon
 * has its own module. This codemod rewrites the imports of your codebase.
 *
 * Before:
 *     import {ButtonPrimary, IconStarRegular} from '@telefonica/mistica';
 *
 * After:
 *     import {ButtonPrimary} from '@telefonica/mistica';
 *     import IconStarRegular from '@telefonica/mistica-icons/icon-star-regular';
 *
 * To apply this codemod you need to install jscodeshift: https://github.com/facebook/jscodeshift
 *
 * Then just run:
 *
 * jscodeshift -t mistica-icons-codemod.js <your codebase dir>
 *
 * Note that you may need to change the parser if you dont use tsx. See available parser options here:
 * https://github.com/facebook/jscodeshift#parser
 *
 * If your codebase reaches mistica through another specifier, list every one of them:
 *
 * jscodeshift -t mistica-icons-codemod.js --barrelSources='@telefonica/mistica,../..' <dir>
 */

const MISTICA = '@telefonica/mistica';
const MISTICA_ICONS = '@telefonica/mistica-icons';

/**
 * Every generated icon ends with one of the three weights. The icons of the main package
 * (IconInfo, IconChevron, IconError, IconSuccess...) do not, and IconButton stays as well.
 */
const GENERATED_ICON = /^Icon[A-Z0-9]\w*(Filled|Light|Regular)$/;

const KEYWORD_MAPS = ['iconKeywords', 'iconCategories'];

/** IconStarRegular => icon-star-regular */
const kebabCase = (name) =>
    name
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
        .replace(/([a-zA-Z])(\d)/g, '$1-$2')
        .replace(/(\d)([a-zA-Z])/g, '$1-$2')
        .toLowerCase();

export default function transformer(file, api, options) {
    const j = api.jscodeshift;
    const parsedSource = j(file.source);

    const barrelSources = options.barrelSources ? options.barrelSources.split(',') : [MISTICA];

    parsedSource
        .find(j.ImportDeclaration)
        .filter((path) => barrelSources.includes(path.node.source.value))
        .forEach((path) => {
            const iconSpecifiers = [];
            const keywordSpecifiers = [];
            const remainingSpecifiers = [];

            path.node.specifiers.forEach((specifier) => {
                const importedName = specifier.type === 'ImportSpecifier' ? specifier.imported.name : null;

                if (importedName && GENERATED_ICON.test(importedName)) {
                    iconSpecifiers.push(specifier);
                } else if (importedName && KEYWORD_MAPS.includes(importedName)) {
                    keywordSpecifiers.push(specifier);
                } else {
                    remainingSpecifiers.push(specifier);
                }
            });

            if (iconSpecifiers.length === 0 && keywordSpecifiers.length === 0) {
                return;
            }

            const newImports = iconSpecifiers.map((specifier) =>
                j.importDeclaration(
                    [j.importDefaultSpecifier(j.identifier(specifier.local.name))],
                    j.literal(`${MISTICA_ICONS}/${kebabCase(specifier.imported.name)}`),
                    path.node.importKind
                )
            );

            if (keywordSpecifiers.length > 0) {
                newImports.push(
                    j.importDeclaration(
                        keywordSpecifiers,
                        j.literal(`${MISTICA_ICONS}/keywords`),
                        path.node.importKind
                    )
                );
            }

            if (remainingSpecifiers.length > 0) {
                path.node.specifiers = remainingSpecifiers;
                j(path).insertAfter(newImports);
            } else {
                j(path).replaceWith(newImports);
            }
        });

    return parsedSource.toSource();
}

export const parser = 'tsx';
