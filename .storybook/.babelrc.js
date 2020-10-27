const projectConfig = require('../.babelrc.js');

/**
 * Take the project config, but set loose to true for class properties and private methods for Storybook.
 *
 * As Storybook updates, it's probably worth trying to delete this file and seeing if it will run without
 * the workaround.
 *
 * @see https://github.com/storybookjs/storybook/issues/10939#issuecomment-702196647
 */
projectConfig.plugins = projectConfig.plugins.map((plugin) => {
    if (
        ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-private-methods'].includes(plugin)
    ) {
        return [plugin, {loose: true}];
    }
    return plugin;
});

module.exports = projectConfig;
