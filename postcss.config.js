// vite automatically apply postcss to css files, like the generated mistica.css file from vanilla extract.
module.exports = {
    plugins: [require('autoprefixer'), require('./postcss/box-sizing-border-box')],
};
