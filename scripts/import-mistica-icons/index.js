// @ts-check

// https://github.com/facebook/create-react-app/blob/66bf7dfc43350249e2f09d138a20840dae8a0a4a/packages/react-scripts/config/webpack.config.js#L436

const fs = require('fs');
const mkdirp = require('mkdirp');
const {join} = require('path');
const {execSync} = require('child_process');
const svgr = require('@svgr/core').default;

const PATH_REPO_ROOT = join(__dirname, '..', '..');
const PATH_CACHE = join(PATH_REPO_ROOT, 'node_modules', '.cache');
const PATH_MISTICA_ICONS_REPO = join(PATH_CACHE, 'mistica-icons');

const GIT_MISTICA_ICONS_MAIN_BRANCH = 'production';
const GIT_MISTICA_ICONS = 'git@github.com:Telefonica/mistica-icons.git';

const checkoutMisticaIcons = () => {
    mkdirp.sync(PATH_CACHE);

    if (!fs.existsSync(PATH_MISTICA_ICONS_REPO)) {
        execSync(`git clone ${GIT_MISTICA_ICONS} ${PATH_MISTICA_ICONS_REPO}`, {
            cwd: PATH_CACHE,
            stdio: 'inherit',
        });
    }

    execSync(`git checkout ${GIT_MISTICA_ICONS_MAIN_BRANCH}`, {
        cwd: PATH_MISTICA_ICONS_REPO,
        stdio: 'inherit',
    });

    execSync(`git pull`, {stdio: 'inherit'});
};

const getSvgIconFilenames = () => {
    const basePath = join(PATH_MISTICA_ICONS_REPO, 'icons');
    const paths = fs.readdirSync(basePath);
    const result = [];
    for (const path of paths) {
        const filenames = fs
            .readdirSync(join(basePath, path))
            .filter((f) => f.endsWith('.svg'))
            .map((f) => join(basePath, path, f));

        result.push(...filenames);
    }
    return result;
};

const main = async () => {
    checkoutMisticaIcons();
    const svgFilenames = getSvgIconFilenames();
    console.log(svgFilenames[0]);

    const svgCode = `
    <svg xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">
      <rect x="10" y="10" height="100" width="100"
        style="stroke:#ff0000; fill: #0000ff"/>
    </svg>
    `;

    const result = svgr.sync(
        svgCode,
        {
            ref: false,
            titleProp: false,
            typescript: true,
            svgProps: {foo: 'string'},
            template: require('./template'),
            plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
        },
        {componentName: 'LALA'}
    );

    console.log(result);
};

main();
