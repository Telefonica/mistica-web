const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');

const FLOW_BASE_PATH = 'dist';
const SRC_BASE_PATH = 'src';

const getAST = (srcPath) =>
    parser.parse(fs.readFileSync(srcPath, 'utf8'), {
        sourceType: 'module',
        plugins: ['typescript', 'jsx', 'classProperties'],
    });

/**
 * This codemod adds "type" to selected imports
 *
 * https://astexplorer.net/#/gist/46d90ec7ab0f17eafa5bfcc61b963731/d2b6ce4f7c8e951bc18ddcabb988d4c122cb9a08
 */
module.exports = (file, api) => {
    const j = api.jscodeshift;

    const srcFilePath = path.resolve(
        file.path.replace(FLOW_BASE_PATH, SRC_BASE_PATH).replace('.js.flow', '.tsx')
    );
    if (!fs.existsSync(srcFilePath)) {
        return null;
    }
    const srcFileAST = getAST(srcFilePath);

    const srcFileImportTypeNames = [];
    traverse.default(srcFileAST, {
        ImportSpecifier(importNodePath) {
            if (importNodePath.parent.importKind === 'type') {
                srcFileImportTypeNames.push(importNodePath.node.imported.name);
            }
        },
    });

    return j(file.source)
        .find(j.ImportSpecifier, {
            importKind: (importKind) => importKind !== 'type',
        })
        .forEach((importSpecifierPath) => {
            if (srcFileImportTypeNames.includes(importSpecifierPath.node.imported.name)) {
                importSpecifierPath.node.importKind = 'type';
            }
        })
        .toSource();
};

module.exports.parser = 'flow';
