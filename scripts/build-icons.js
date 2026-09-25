/**
 * Builds @telefonica/mistica-icons from packages/mistica-icons/src/generated.
 *
 * The icons read the theme of @telefonica/mistica at run time, and that module stays external, so
 * this build needs no built root package. See packages/mistica-icons/vite.config.mjs.
 *
 * The declarations come from a template, because every icon shares one signature. A tsc run would
 * follow the import into the root package, type check files outside its rootDir and fail, and it
 * would add minutes for no gain.
 */
const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

const execSync = childProcess.execSync;

const REPO_ROOT = path.join(__dirname, '..');
// the icons workspace does not depend on swc, so "yarn swc" does not resolve inside it
const SWC = path.join(REPO_ROOT, 'node_modules', '.bin', 'swc');
const PACKAGE_ROOT = path.join(__dirname, '..', 'packages', 'mistica-icons');
const DIST_ES = path.join(PACKAGE_ROOT, 'dist-es');
const DIST = path.join(PACKAGE_ROOT, 'dist');
const MISTICA = '@telefonica/mistica';

const run = (command, cwd) => {
    execSync(command, {stdio: 'inherit', cwd});
};

/** icon-star-regular => IconStarRegular */
const pascalCase = (name) =>
    name
        .split(/[^a-zA-Z0-9]+/)
        .filter(Boolean)
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join('');

const iconDeclaration = (componentName) =>
    [
        `import type {IconProps} from '${MISTICA}';`,
        `declare const ${componentName}: (props: IconProps) => JSX.Element;`,
        `export default ${componentName};`,
        '',
    ].join('\n');

const KEYWORDS_DECLARATION = [
    'export declare const iconKeywords: {[key: string]: Array<string>};',
    'export declare const iconCategories: {[key: string]: Array<string>};',
    '',
].join('\n');

const writeDeclarations = () => {
    const files = fs.readdirSync(DIST_ES).filter((name) => name.endsWith('.js'));

    for (const file of files) {
        const moduleName = file.replace(/\.js$/, '');
        const declaration =
            moduleName === 'icons-keywords' ? KEYWORDS_DECLARATION : iconDeclaration(pascalCase(moduleName));
        fs.writeFileSync(path.join(DIST_ES, `${moduleName}.d.ts`), declaration, 'utf8');
    }

    return files.length;
};

const buildIcons = () => {
    fs.rmSync(DIST_ES, {recursive: true, force: true});
    fs.rmSync(DIST, {recursive: true, force: true});

    run(`yarn vite build --config packages/mistica-icons/vite.config.mjs`);

    // the published package has no entry point, so the barrel of the repository leaves the output
    fs.rmSync(path.join(DIST_ES, 'index.js'), {force: true});

    // transpile to es5 (see .swcrc targets and package.json browserslist), as in scripts/compile.js.
    // swc mirrors the path of its input, so both commands run inside the package folder.
    run(`${SWC} dist-es --out-dir dist-es`, PACKAGE_ROOT);
    run(`${SWC} dist-es --out-dir dist -C module.type=commonjs`, PACKAGE_ROOT);

    // the declarations come last, so that swc never reads a .d.ts file
    const count = writeDeclarations();
    console.log(`Wrote ${count} declarations for @telefonica/mistica-icons`);
};

if (require.main === module) {
    buildIcons();
}

module.exports = buildIcons;
