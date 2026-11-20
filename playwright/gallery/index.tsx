import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {flushSync} from 'react-dom';
import ThemeContextProvider from '../../src/theme-context-provider';
import {makeTheme} from '../../src/test-utils/theme';
import * as testStyles from './styles';

import '../../.storybook/css/main.css';
import '../../.storybook/css/movistar-font.css';

const stories = import.meta.glob('../../src/__component_tests__/*.story.tsx');
const element = document.getElementById('root');
if (!element) {
    throw new Error('Component gallery root was not found');
}
let root = createRoot(element);

type GalleryWindow = Window & {
    mount: (params: {story: string; props?: Record<string, unknown>}) => Promise<void>;
    unmount: () => void;
};

const gallery = window as unknown as GalleryWindow;
Object.assign(window, {misticaTestStyles: testStyles});

gallery.mount = async ({story, props}) => {
    const [file, name] = story.split('/');
    const load = stories[`../../src/__component_tests__/${file}.story.tsx`];
    if (!load) {
        throw new Error(`Unknown component story: ${story}`);
    }
    const module = (await load()) as Record<string, unknown>;
    const Story = module[name] as React.ComponentType<Record<string, unknown>>;
    if (!Story) {
        throw new Error(`Unknown component scenario: ${story}`);
    }
    flushSync(() => {
        root.render(
            module.withTheme === false ? (
                <Story {...props} />
            ) : (
                <ThemeContextProvider theme={makeTheme()}>
                    <Story {...props} />
                </ThemeContextProvider>
            )
        );
    });
};

gallery.unmount = () => {
    flushSync(() => root.unmount());
    root = createRoot(element);
};
