const {execSync} = require('child_process');
const {join, relative, dirname} = require('path');
const {promisify} = require('util');
const glob = promisify(require('glob'));
const {writeFileSync, readFileSync, readdirSync, existsSync} = require('fs');
const rimraf = require('rimraf');
const {beautify} = require('flowgen');
const cpx = require('cpx');
const isCI = require('is-ci');

const PATH_ROOT = join(__dirname, '..', '..');
const PATH_DIST = join(PATH_ROOT, 'dist');
const PATH_TRANSFORMS = join(__dirname, 'transforms');
const PATH_OVERRIDES = join(__dirname, 'overrides');
const PATH_EXTRA_TYPES = join(PATH_DIST, '__types__.js.flow');

const fixFlowDefinition = (flowFilename) => {
    let src = readFileSync(flowFilename, 'utf8');

    // fixes flow annotation to make flow lint rule happy
    if (!/\/\/ @flow/.test(src)) {
        src = '// @flow\n' + src.replace(/\s*\*\s*@flow/g, '');
    }

    // removes Flowgen comment: https://regex101.com/r/YmTkLI/2/
    // that comment has the Flowgen version number, we don't want to update all files when Flowgen version changes
    src = src.replace(/\/\*\*[\s\n]*\*\sFlowtype definitions(.*\n)*?\s\*\//m, '');

    // `declare export var PRIMARY: any; // "#0B2739"` => `declare export var PRIMARY: "#0B2739"`
    src = src.replace(/declare export var (\w+): any; \/\/ "([^"]+)"/g, 'declare export var $1: "$2";');

    // `declare export var PRIMARY: any; // 123` => `declare export var PRIMARY: 123;`
    src = src.replace(/declare export var (\w+): any; \/\/ (\d+)/g, 'declare export var $1: $2;');

    // `import React from "react";` => `import * as React from "react";`
    src = src.replace(/import React from "react";/g, 'import * as React from "react";');

    // `React.ReactNode` => `React.Node`
    src = src.replace(/React.(React)(Node|Element)/g, 'React.$2');

    // `React.Element<>` => `React.Element<any>`
    src = src.replace(/React\.Element<>/g, 'React.Element<any>');

    // `React.Element<P, T>` => `React.Element<T>`
    src = src.replace(/React\.Element<([\w\s]+),\s?([\w\s]+)>/g, 'React.Element<$2>');

    // flowgen replaces `Partial<T>` to `$Rest<T, {}>` which is wrong, this rule fixes that
    // `$Rest<T, {}>` => `$Shape<T>`
    src = src.replace(/\$Rest<(\w+),\s*{}>/g, '$Shape<$1>');

    // `React.RefObject` => `React.Ref`
    src = src.replace(/React.RefObject/g, 'React.Ref');

    // `React.SyntheticEvent<>` => `SyntheticEvent<any>`
    src = src.replace(/React.SyntheticEvent<>/g, 'SyntheticEvent<any>');

    // `React.Ref<HTMLDivElement>` => `React.Ref<'div'>`
    src = src.replace(/React\.Ref<HTMLDivElement>/g, `React.Ref<'div'>`);
    src = src.replace(
        /React\.Ref<\s*HTMLButtonElement \| HTMLAnchorElement \| HTMLDivElement\s*>/gm,
        `React.Ref<'button' | 'a' | 'div'>`
    );

    // `React.FC` => `React.ComponentType`
    src = src.replace(/React.(FC|ComponentClass|FunctionComponent)/g, 'React.ComponentType');

    // `React.ComponentType<>` => `React.ComponentType<{}>`
    src = src.replace(/React.ComponentType<>/g, 'React.ComponentType<{}>');

    // `React.ForwardRefExoticComponent` => `React.Component`
    src = src.replace(/React\.ForwardRefExoticComponent/g, 'React.Component');

    // `& React.RefAttributes<any>` => ``
    src = src.replace(/&\s*React\.RefAttributes<any>/gm, '');

    // `((instance: T | null) => void) | React.Ref<T> => React.Ref<T>`
    src = src.replace(/\(\(instance: T \| null\) => void\) \| React\.Ref<T>/gm, 'React.Ref<T>');

    // `React.MouseEvent` => `React.SyntheticMouseEvent`
    const eventMap = {
        Mouse: 'Mouse',
        Focus: 'Focus',
        Keyboard: 'Keyboard',
        Change: '',
        Form: '',
    };
    src = src.replace(
        /React.(Mouse|Change|Focus|Keyboard|Form)Event/g,
        (_, $1) => `Synthetic${eventMap[$1]}Event`
    );

    // `$PropertyType<$Exports<'./button'>, 'ButtonProps'>` => `ButtonProps` + `import type {ButtonProps} from './button';`
    const imports = new Set();
    let importsSrc = '';
    src = src.replace(/\$PropertyType<\$Exports<"([./\w]+)">,\s*"(\w+)">/gm, (_, $1, $2) => {
        const key = $1 + '~' + $2;
        if (!imports.has(key)) {
            importsSrc += `\nimport type {${$2}} from "${$1}";`;
            imports.add(key);
        }
        return $2;
    });
    src += importsSrc;

    // `Omit<T, K>` => `Pick<T, Exclude<$Keys<T>, K>>`
    src = src.replace(/Omit<\s*([^,]+),\s*([^>]+)\s*>/gm, 'Pick<$1, Exclude<$$Keys<$1>, $2>>');

    // `Pick<P, Exclude<$Keys<P>, "foo">>` => `$Diff<P, {foo: *}>`
    src = src.replace(/Pick<([^,]+), Exclude<\$Keys<(\w+)>, "(\w+)">>/g, '$$Diff<$1, {"$3": *}>');
    // `Pick<P, Exclude<$Keys<P>, "foo" | "bar">` => `$Diff<P, {foo: *, bar: *}>`
    src = src.replace(
        /Pick<\s*([^,]+),\s*Exclude<\s*\$Keys<([^,]+)>,\s*"(\w+)"\s*\|\s*"(\w+)"\s*>\s*>/gm,
        '$$Diff<$1, {"$3": *, "$4": *}>'
    );

    // `React.CSSProperties` => `CssStyle` + import
    if (/React\.CSSProperties/.test(src)) {
        src = src.replace(/React\.CSSProperties/g, 'CssStyle');
        // add import
        const relativePath = relative(dirname(join(PATH_ROOT, flowFilename)), PATH_EXTRA_TYPES);
        const pathImport = relativePath.startsWith('.') ? relativePath : `./` + relativePath;
        src += `\nimport {type CssStyle} from "${pathImport}";\n`;
    }

    // `React.InputHTMLAttributes<HTMLInputElement>` => `any`
    src = src.replace(/React\.InputHTMLAttributes<HTMLInputElement>/g, 'any');

    // `Moment.Moment` => `Moment`
    src = src.replace(/Moment.Moment/g, 'Moment');

    // File is written two times, one before applying beautify to be able to check problems if beautify fails
    writeFileSync(flowFilename, src);
    writeFileSync(flowFilename, beautify(src));
};

const applyJscodeshift = () => {
    const transforms = readdirSync(PATH_TRANSFORMS).filter((transform) => transform.endsWith('.js'));

    transforms.forEach((transform) => {
        console.log('Apply codemod:', transform);
        const transformPath = join(PATH_TRANSFORMS, transform);
        execSync(
            `yarn jscodeshift -c 1 --transform=${transformPath} --extensions=flow --parser=flow --silent ${PATH_DIST}`,
            {stdio: 'inherit'}
        );
    });
};

const applyOverrides = () => {
    cpx.copySync(join(PATH_OVERRIDES, 'jss.js.flow'), join(PATH_DIST));
};

const hasFlowDefChanges = () => {
    if (!existsSync(join(PATH_ROOT, '.git'))) {
        // Skip this check if not a git repository.
        // This can happen when building from a downloaded zip from github
        return false;
    }

    const output = String(execSync('git status --porcelain'));
    if (output) {
        const lines = output
            .split('\n')
            .map((l) => l.trim())
            .filter(Boolean);

        const changedFiles = lines.map((l) => l.split(/\s+/)[1]);

        if (changedFiles.some((f) => f.startsWith('flow-defs/'))) {
            return true;
        }
    }
    return false;
};

const main = async () => {
    process.chdir(PATH_ROOT);

    // clean
    rimraf.sync('flow-defs');
    rimraf.sync('dist/**/*.js.flow');

    // generate .js.flow files
    cpx.copySync(join(__dirname, '__types__.js.flow'), PATH_DIST);
    execSync('yarn flowgen --no-inexact --interface-records ./dist', {
        stdio: 'inherit',
    });

    //  patch
    const flowFilenames = await glob('./dist/**/*.js.flow');
    flowFilenames.forEach(fixFlowDefinition);

    // codemods
    applyJscodeshift();

    // overrides
    applyOverrides();

    cpx.copySync('./dist/**/*.js.flow', 'flow-defs');

    if (isCI && hasFlowDefChanges()) {
        console.log();
        console.error('Please, commit the generated Flow definitions before merging your PR.');
        console.error('Run yarn build and commit the generated files in flow-defs/ folder');
        console.log();
        process.exit(1);
    }
};

main();
