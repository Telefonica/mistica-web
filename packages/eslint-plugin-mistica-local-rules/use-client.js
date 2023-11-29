// @ts-check

/**
 * Eslint rule to detect usage of hooks in components and suggest adding the "use client" directive
 *
 * Implementation based on https://github.com/roginfarrer/eslint-plugin-react-server-components but simplified
 */

const HOOK_REGEX = /^use[A-Z]/;

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    defaultOptions: [],
    meta: {
        type: 'suggestion',
        messages: {
            addUseClientHooks:
                '{{hook}} only works in client components. Add the "use client" directive at the top of the file to use it.',
            addUseClientSuggestion: "Add the 'use client' directive at the top of the file",
        },
        docs: {
            description:
                'Force adding "use client" directive to components that can not be server components',
        },
        fixable: 'code',
        hasSuggestions: true,
        schema: [], // no options
    },
    create(context) {
        let hasReported = false;
        let isClientComponent = false;

        let parentNode;

        const reportMissingDirective = (expression, hookName) => {
            if (isClientComponent || hasReported) {
                return;
            }
            hasReported = true;
            context.report({
                node: expression,
                data: {hook: hookName},
                messageId: 'addUseClientHooks',
                suggest: [
                    {
                        messageId: 'addUseClientSuggestion',
                        *fix(fixer) {
                            const sourceCode = context.getSourceCode();
                            const firstToken = sourceCode.getFirstToken(parentNode.body[0]);
                            if (firstToken) {
                                const isFirstLine = firstToken.loc.start.line === 1;
                                yield fixer.insertTextBefore(
                                    firstToken,
                                    `${isFirstLine ? '' : '\n'}'use client';\n`
                                );
                            }
                        },
                    },
                ],
            });
        };

        return {
            Program(node) {
                for (const block of node.body) {
                    if (
                        block.type === 'ExpressionStatement' &&
                        block.expression.type === 'Literal' &&
                        block.expression.value === 'use client'
                    ) {
                        isClientComponent = true;
                    }
                }

                parentNode = node;
            },

            CallExpression(expression) {
                let name = '';
                if (expression.callee.type === 'Identifier' && 'name' in expression.callee) {
                    name = expression.callee.name;
                } else if (
                    expression.callee.type === 'MemberExpression' &&
                    'name' in expression.callee.property
                ) {
                    name = expression.callee.property.name;
                }

                if (HOOK_REGEX.test(name) && context.getScope().type === 'function') {
                    reportMissingDirective(expression.callee, name);
                }
            },

            ExpressionStatement(node) {
                const expression = node.expression;
                // @ts-ignore
                if (!expression.callee) {
                    return;
                }

                if (
                    // @ts-ignore
                    expression.callee &&
                    // @ts-ignore
                    HOOK_REGEX.test(expression.callee.name)
                ) {
                    // @ts-ignore
                    reportMissingDirective(expression.callee, expression.callee.name);
                }
            },
        };
    },
};
