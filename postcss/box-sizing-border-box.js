const addBoxSizing = (decl) => {
    decl.cloneBefore({prop: 'box-sizing', value: 'border-box'});
};

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = () => {
    return {
        postcssPlugin: 'box-sizing-border-box',

        Declaration: {
            width: addBoxSizing,
            height: addBoxSizing,
            'min-width': addBoxSizing,
            'min-height': addBoxSizing,
            'max-width': addBoxSizing,
            'max-height': addBoxSizing,
        },
    };
};

module.exports.postcss = true;
