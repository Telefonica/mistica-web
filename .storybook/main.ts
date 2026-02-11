import type {StorybookConfig} from '@storybook/react-vite';

const stories = [
    './welcome-story.tsx',
    '../src/__stories__/*-story.tsx',
    '../src/icons/__stories__/*-story.tsx',
    '../src/community/__stories__/index-story.tsx',
    '../src/community/__stories__/*-story.tsx',
];

const shouldIncludePrivateStories = !process.env.VERCEL_PROD_BUILD;

if (shouldIncludePrivateStories) {
    stories.push('../src/**/__private_stories__/*-story.tsx');
}

const config: StorybookConfig = {
    stories,

    addons: [
        './theme-selector-addon/preset.ts',
        './dark-mode-addon/preset.ts',
        './font-size-addon/preset.ts',
        './theme-selector-addon/preset.ts',
        './platform-selector-addon/preset.ts',
    ],

    framework: '@storybook/react-vite',

    staticDirs: ['./css/fonts'],

    /** hide interactions tab */
    features: {
        interactions: false,
    },

    core: {
        disableWhatsNewNotifications: true,
        builder: {
            name: '@storybook/builder-vite',
            options: {
                viteConfigPath: '.storybook/vite.config.mjs',
            },
        },
    },
};

export default config;
