// Webpack loader to inject story source code into story parameters
const fs = require('fs');
const ts = require('typescript');

module.exports = function (source) {
    // Only process story files
    if (this.resourcePath.includes('-story.tsx') || this.resourcePath.includes('.stories.tsx')) {
        const filePath = this.resourcePath;

        // Read the original source file
        const originalSource = fs.readFileSync(filePath, 'utf-8');

        // Escape backticks and template literals in the source code
        const escapedSource = originalSource
            .replace(/\\/g, '\\\\')
            .replace(/`/g, '\\`')
            .replace(/\$\{/g, '\\${');

        // Collect exported story ranges using TypeScript AST (robust, no extra deps)
        const sourceFile = ts.createSourceFile(
            filePath,
            originalSource,
            ts.ScriptTarget.Latest,
            true,
            ts.ScriptKind.TSX
        );

        const focusMap = {};
        const fnLookup = new Map();

        // Collect potential render functions by identifier to resolve Template.bind cases
        sourceFile.forEachChild((node) => {
            if (ts.isFunctionDeclaration(node) && node.name) {
                fnLookup.set(node.name.text, node);
            }
            if (ts.isVariableStatement(node)) {
                node.declarationList.declarations.forEach((decl) => {
                    if (ts.isIdentifier(decl.name) && decl.initializer) {
                        fnLookup.set(decl.name.text, decl.initializer);
                    }
                });
            }
        });

        const isExported = (node) =>
            Array.isArray(node.modifiers) &&
            node.modifiers.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);

        const addRange = (name, node) => {
            if (!name) return;

            // Prefer inline render functions; for bind() keep the story declaration line
            let targetNode = node;

            if (ts.isVariableDeclaration(node) && node.initializer) {
                const init = node.initializer;
                if (ts.isArrowFunction(init) || ts.isFunctionExpression(init)) {
                    targetNode = init;
                }
            }

            const start = sourceFile.getLineAndCharacterOfPosition(targetNode.getStart());
            const end = sourceFile.getLineAndCharacterOfPosition(targetNode.getEnd());
            focusMap[name] = [start.line + 1, end.line + 1];
        };

        sourceFile.forEachChild((node) => {
            if (ts.isFunctionDeclaration(node) && isExported(node) && node.name) {
                addRange(node.name.text, node);
                return;
            }

            if (ts.isVariableStatement(node) && isExported(node)) {
                node.declarationList.declarations.forEach((decl) => {
                    if (ts.isIdentifier(decl.name)) {
                        addRange(decl.name.text, decl);
                    }
                });
            }
        });

        // Inject a global variable with the source code and line ranges
        const injection = `
// Injected by story-source-loader
if (typeof window !== 'undefined') {
    window.__STORY_SOURCE__ = window.__STORY_SOURCE__ || {};
    window.__STORY_SOURCE__['${filePath}'] = \`${escapedSource}\`;
    window.__STORY_SOURCE_LINES__ = window.__STORY_SOURCE_LINES__ || {};
    window.__STORY_SOURCE_LINES__['${filePath}'] = ${JSON.stringify(focusMap)};
}
`;

        // After stories are defined, attach focus ranges into their parameters automatically
        const parameterInjection = Object.entries(focusMap)
            .map(
                ([exportName, range]) => `
try {
    if (typeof ${exportName} !== 'undefined') {
        ${exportName}.parameters = {
            ...(typeof ${exportName}.parameters === 'object' ? ${exportName}.parameters : {}),
            storyCode: {
                ...(typeof ${exportName}.parameters?.storyCode === 'object'
                    ? ${exportName}.parameters.storyCode
                    : {}),
                focus: [${range[0]}, ${range[1]}],
            },
        };
    }
} catch (e) {
    // Ignore errors when story export is not found
}
`
            )
            .join('\n');

        return injection + '\n' + source + '\n' + parameterInjection;
    }

    return source;
};
