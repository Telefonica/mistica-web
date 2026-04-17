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

    viteFinal: (config) => {
        config.server = {
            ...config.server,
            allowedHosts: ['host.docker.internal'],
        };
        config.build = {
            ...config.build,
            rollupOptions: {
                ...config.build?.rollupOptions,
                // https://github.com/vitejs/vite/issues/15012#issuecomment-1815854072
                onLog(level, log, handler) {
                    if (
                        log.cause &&
                        (log.cause as {message?: string}).message ===
                            `Can't resolve original location of error.`
                    ) {
                        return;
                    }
                    handler(level, log);
                },
                // https://github.com/remix-run/remix/issues/8891#issuecomment-1965244096
                onwarn(warning, warn) {
                    if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
                        return;
                    }
                    warn(warning);
                },
            },
        };
        return config;
    },

    core: {
        allowedHosts: ['host.docker.internal'],
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
