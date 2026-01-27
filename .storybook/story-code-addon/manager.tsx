import * as React from 'react';
import {addons, types} from 'storybook/manager-api';
import {AddonPanel} from 'storybook/internal/components';

import type {API} from 'storybook/manager-api';

const ADDON_ID = 'story-code';
const PANEL_ID = `${ADDON_ID}/panel`;
const PANEL_TITLE = 'Story Code';

interface StoryCodePanelProps {
    api: API;
}

// Simple syntax highlighting for TypeScript/React
const highlightCode = (code: string): React.ReactElement => {
    const lines = code.split('\n');

    return (
        <>
            {lines.map((line, lineIndex) => {
                // Process each line character by character to apply syntax highlighting
                const tokens: Array<{text: string; color: string}> = [];
                let currentToken = '';
                let currentColor = '#d4d4d4';
                let i = 0;

                while (i < line.length) {
                    const char = line[i];
                    const remaining = line.slice(i);

                    // String literals (single and double quotes)
                    if (char === "'" || char === '"' || char === '`') {
                        if (currentToken) {
                            tokens.push({text: currentToken, color: currentColor});
                            currentToken = '';
                        }
                        const quote = char;
                        let stringContent = quote;
                        i++;
                        while (i < line.length && line[i] !== quote) {
                            if (line[i] === '\\' && i + 1 < line.length) {
                                stringContent += line[i] + line[i + 1];
                                i += 2;
                            } else {
                                stringContent += line[i];
                                i++;
                            }
                        }
                        if (i < line.length) stringContent += line[i];
                        tokens.push({text: stringContent, color: '#ce9178'});
                        i++;
                        continue;
                    }

                    // Comments
                    if (remaining.startsWith('//')) {
                        if (currentToken) {
                            tokens.push({text: currentToken, color: currentColor});
                        }
                        tokens.push({text: remaining, color: '#6a9955'});
                        break;
                    }

                    // Multi-line comments
                    if (remaining.startsWith('/*')) {
                        if (currentToken) {
                            tokens.push({text: currentToken, color: currentColor});
                            currentToken = '';
                        }
                        let commentContent = '/*';
                        i += 2;
                        while (i < line.length - 1 && !line.slice(i).startsWith('*/')) {
                            commentContent += line[i];
                            i++;
                        }
                        if (line.slice(i).startsWith('*/')) {
                            commentContent += '*/';
                            i += 2;
                        }
                        tokens.push({text: commentContent, color: '#6a9955'});
                        continue;
                    }

                    // JSX tags
                    if (char === '<' && /[A-Z]/.test(line[i + 1] || '')) {
                        if (currentToken) {
                            tokens.push({text: currentToken, color: currentColor});
                            currentToken = '';
                        }
                        currentColor = '#4ec9b0';
                        currentToken = char;
                        i++;
                        while (i < line.length && /[A-Za-z.]/.test(line[i])) {
                            currentToken += line[i];
                            i++;
                        }
                        tokens.push({text: currentToken, color: currentColor});
                        currentToken = '';
                        currentColor = '#d4d4d4';
                        continue;
                    }

                    // Keywords
                    if (/[a-zA-Z_]/.test(char)) {
                        currentToken += char;
                        i++;
                        while (i < line.length && /[a-zA-Z0-9_]/.test(line[i])) {
                            currentToken += line[i];
                            i++;
                        }

                        const keywords = [
                            'import',
                            'export',
                            'from',
                            'const',
                            'let',
                            'var',
                            'function',
                            'return',
                            'if',
                            'else',
                            'for',
                            'while',
                            'break',
                            'continue',
                            'class',
                            'interface',
                            'type',
                            'extends',
                            'implements',
                            'new',
                            'this',
                            'super',
                            'static',
                            'public',
                            'private',
                            'protected',
                            'async',
                            'await',
                            'try',
                            'catch',
                            'finally',
                            'throw',
                            'typeof',
                            'instanceof',
                            'void',
                            'null',
                            'undefined',
                            'true',
                            'false',
                            'as',
                            'default',
                        ];

                        if (keywords.includes(currentToken)) {
                            tokens.push({text: currentToken, color: '#569cd6'});
                        } else if (/^[A-Z]/.test(currentToken)) {
                            // Types/Components start with uppercase
                            tokens.push({text: currentToken, color: '#4ec9b0'});
                        } else {
                            tokens.push({text: currentToken, color: '#d4d4d4'});
                        }
                        currentToken = '';
                        continue;
                    }

                    // Numbers
                    if (/[0-9]/.test(char)) {
                        currentToken += char;
                        i++;
                        while (i < line.length && /[0-9.]/.test(line[i])) {
                            currentToken += line[i];
                            i++;
                        }
                        tokens.push({text: currentToken, color: '#b5cea8'});
                        currentToken = '';
                        continue;
                    }

                    // Operators and punctuation
                    if (currentToken) {
                        tokens.push({text: currentToken, color: currentColor});
                        currentToken = '';
                    }

                    const operatorColor = '{}[]()'.includes(char) ? '#ffd700' : '#d4d4d4';
                    tokens.push({text: char, color: operatorColor});
                    i++;
                }

                if (currentToken) {
                    tokens.push({text: currentToken, color: currentColor});
                }

                return (
                    <div key={lineIndex}>
                        {tokens.map((token, tokenIndex) => (
                            <span key={tokenIndex} style={{color: token.color}}>
                                {token.text}
                            </span>
                        ))}
                        {'\n'}
                    </div>
                );
            })}
        </>
    );
};

const StoryCodePanel = ({api}: StoryCodePanelProps): React.ReactElement => {
    const [storyCode, setStoryCode] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const channel = addons.getChannel();

        const handleStoryCodeUpdate = (code: string) => {
            setStoryCode(code);
            setLoading(false);
        };

        channel.on('story-code-update', handleStoryCodeUpdate);

        // Request code when story changes
        const handleStoryChanged = () => {
            setLoading(true);
            channel.emit('story-code-request');
        };

        api.on('storyChanged', handleStoryChanged);

        // Initial request
        channel.emit('story-code-request');

        return () => {
            channel.off('story-code-update', handleStoryCodeUpdate);
            api.off('storyChanged', handleStoryChanged);
        };
    }, [api]);

    return (
        <div
            style={{
                padding: '16px',
                height: '100%',
                overflow: 'auto',
                backgroundColor: '#1e1e1e',
                color: '#d4d4d4',
                fontFamily: 'Menlo, Monaco, "Courier New", monospace',
                fontSize: '13px',
                lineHeight: '1.5',
            }}
        >
            {loading ? (
                <div style={{color: '#888'}}>Loading story code...</div>
            ) : storyCode ? (
                <pre style={{margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word'}}>
                    {highlightCode(storyCode)}
                </pre>
            ) : (
                <div style={{color: '#888'}}>No code available for this story</div>
            )}
        </div>
    );
};

addons.register(ADDON_ID, (api) => {
    addons.add(PANEL_ID, {
        type: types.PANEL,
        title: PANEL_TITLE,
        render: ({active}) => (
            <AddonPanel active={!!active}>
                <StoryCodePanel api={api} />
            </AddonPanel>
        ),
    });
});
