// @ts-check

// https://github.com/facebook/create-react-app/blob/66bf7dfc43350249e2f09d138a20840dae8a0a4a/packages/react-scripts/config/webpack.config.js#L436

const fs = require('fs');
const mkdirp = require('mkdirp');
const {join} = require('path');
const {execSync} = require('child_process');
const svgr = require('@svgr/core').default;
const prettier = require('prettier');

const PATH_REPO_ROOT = join(__dirname, '..', '..');
const PATH_CACHE = join(PATH_REPO_ROOT, 'node_modules', '.cache');
const PATH_MISTICA_ICONS_REPO = join(PATH_CACHE, 'mistica-icons');

const GIT_MISTICA_ICONS_MAIN_BRANCH = 'production';
const GIT_MISTICA_ICONS = 'git@github.com:Telefonica/mistica-icons.git';

const checkoutMisticaIconsRepo = () => {
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

const createIconComponentSource = async (svgSource, componentName) => {
    const generated = svgr.sync(
        svgSource,
        {
            ref: false,
            titleProp: false,
            typescript: true,
            // svgProps: {foo: 'string'},
            template: require('./template'),
            plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
        },
        {componentName}
    );

    // get icon size, needed to set the viewBox
    const svgSize = generated.match(/(width|height)={(\d+)}/)[2];

    const js = generated
        // set svg props
        .replace(/<svg .*?>/, `<svg width={size} height={size} viewBox="0 0 ${svgSize} ${svgSize}">`)
        // set fill color
        .replace(/fill="#\d+"/g, 'fill={fillColor}')
        // add space before type definition
        .replace(/^type /gm, '\ntype ');

    return prettier.format(js, {
        ...(await prettier.resolveConfig('.')),
        parser: 'babel-ts',
    });
};

const main = async () => {
    checkoutMisticaIconsRepo();
    const svgFilenames = getSvgIconFilenames();
    console.log(svgFilenames[0]);

    const svgCode = `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.018 18.531h-1.062c0-.411.327-1.072.49-1.072.164 0 .572.577.572 1.072zm-3.345-2.885c0 .33-.244.577-.49.577-1.387.247-3.345.824-4.895 2.062a.975.975 0 01-1.142 0c-1.47-1.235-3.508-1.812-4.895-2.062-.327-.08-.49-.33-.49-.577v-3.543l5.304 2.474a1.2 1.2 0 001.062 0l5.463-2.558.083 3.627zM3.068 9.63c0-.246.08-.412.327-.496l8.078-3.708c.164-.081.244-.081.408 0l8.077 3.708c.097.05.08.082.08.082h-8.485c-.244 0-.407.165-.407.411 0 .247.163.412.407.412h8.322l-8.078 3.711c-.163.081-.244.081-.407 0l-8.078-3.708a.45.45 0 01-.244-.412zm17.87 7.09v-6.678c.013-.518.05-1.373-.652-1.647l-8.08-3.708c-.409-.166-.736-.166-1.143-.082l-8.078 3.79c-.491.165-.735.658-.735 1.235 0 .577.327.989.735 1.235l1.96.908v3.873c0 .743.491 1.32 1.143 1.485 1.306.246 3.183.742 4.487 1.896.327.247.651.412 1.062.412.407 0 .734-.165 1.062-.412 1.386-1.073 3.183-1.647 4.486-1.896a1.51 1.51 0 001.143-1.485v-3.954l1.714-.743v5.77c-.652.247-.98 1.235-.98 1.812 0 .247.081.496.245.659.244.246.571.246.898.246h.491c.244 0 .48-.059.735-.246.186-.138.255-.236.286-.659.036-.607-.208-1.4-.78-1.812z" fill="#313235" fill-rule="nonzero"/></svg>`;

    const source = await createIconComponentSource(svgCode, 'Component');
    console.log(source);
};

main();
