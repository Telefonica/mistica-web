module.exports = {
    stories: ['./welcome-story.js', '../src/**/__stories__/*-story.js'],
    addons: ['@storybook/addon-links', require.resolve('./theme-selector-addon/register')],
};
