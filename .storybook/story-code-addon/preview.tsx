import * as React from 'react';
import {addons} from 'storybook/preview-api';

import type {Decorator} from '@storybook/react';

// Extend window type to include our global variable
declare global {
    interface Window {
        __STORY_SOURCE__?: Record<string, string>;
    }
}

const StoryCodeDecorator: Decorator = (Story, context) => {
    React.useEffect(() => {
        const channel = addons.getChannel();

        const handleCodeRequest = () => {
            const fileName = context.parameters.fileName;
            const focusParam = context.parameters.storyCode?.focus;

            const focus =
                Array.isArray(focusParam) &&
                focusParam.length === 2 &&
                focusParam.every((n) => typeof n === 'number' && Number.isFinite(n) && n > 0)
                    ? ([focusParam[0], focusParam[1]] as [number, number])
                    : undefined;

            // Try to get the source from our global variable
            let storySource: string | undefined;

            // eslint-disable-next-line no-underscore-dangle
            if (typeof window !== 'undefined' && window.__STORY_SOURCE__) {
                // Try to find the source by matching the file path
                // eslint-disable-next-line no-underscore-dangle
                const sources = window.__STORY_SOURCE__;

                // Find a matching key in the sources object
                const matchingKey = Object.keys(sources).find((key) => {
                    return (
                        fileName && (key.includes(fileName) || fileName.includes(key.split('/').pop() || ''))
                    );
                });

                if (matchingKey) {
                    storySource = sources[matchingKey];
                }
            }

            // Also check if it's in parameters
            if (!storySource && context.parameters.storySource) {
                storySource = context.parameters.storySource;
            }

            if (storySource) {
                channel.emit('story-code-update', {code: storySource, focus});
            } else if (fileName) {
                channel.emit('story-code-update', {
                    code: `// Story file: ${fileName}\n// No source code available. The source should be added to story parameters.\n\n// Available sources: ${Object.keys(window['__STORY_SOURCE__'] || {}).join(', ')}`,
                    focus,
                });
            } else {
                channel.emit('story-code-update', {code: '// Story source not available', focus});
            }
        };

        channel.on('story-code-request', handleCodeRequest);

        // Send code on mount
        handleCodeRequest();

        return () => {
            channel.off('story-code-request', handleCodeRequest);
        };
    }, [context.id, context.parameters]);

    return <Story {...context} />;
};

export const decorators = [StoryCodeDecorator];
