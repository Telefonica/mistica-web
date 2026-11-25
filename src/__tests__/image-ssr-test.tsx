import * as React from 'react';
import {ThemeContextProvider, Image} from '..';
import {makeTheme} from './test-utils';

// In the jsdom environment, `react-dom/server` resolves to the browser build, which needs a
// working `MessageChannel` and `TextEncoder`/`TextDecoder` in the global scope; use Node's
// ones and load the module lazily, after the globals are set.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const {MessageChannel} = require('worker_threads');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const {TextEncoder, TextDecoder} = require('util');
(globalThis as {MessageChannel?: unknown}).MessageChannel = MessageChannel;
(globalThis as {TextEncoder?: unknown}).TextEncoder = TextEncoder;
(globalThis as {TextDecoder?: unknown}).TextDecoder = TextDecoder;

/**
 * Renders the component as the server would: with no `window` in scope, so `isServerSide()`
 * checks behave like they do in a real SSR environment.
 */
const renderAsServer = async (element: React.ReactElement): Promise<string> => {
    const {renderToString} = await import('react-dom/server');
    const globalRef = globalThis as {window?: unknown};
    const originalWindow = globalRef.window;
    delete globalRef.window;
    try {
        return renderToString(element);
    } finally {
        globalRef.window = originalWindow;
    }
};

test('Image renders the inline script in SSR html, so the image becomes visible before hydration', async () => {
    const html = await renderAsServer(
        <ThemeContextProvider theme={makeTheme()}>
            <Image src="using-vr.jpg" aspectRatio="16:9" width={200} />
        </ThemeContextProvider>
    );

    // The script makes the img visible as soon as it finishes loading, without waiting for
    // React to hydrate, so it must be part of the server rendered html.
    expect(html).toContain('<script>');
    expect(html).toContain('var img = document.getElementById(');
    expect(html).toContain('if (img.complete)');
    expect(html).toContain("img.addEventListener('load'");
});
