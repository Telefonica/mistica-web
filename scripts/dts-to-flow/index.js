const {execSync} = require('child_process');
const {join, relative, dirname} = require('path');
const {promisify} = require('util');
const glob = promisify(require('glob'));
const {writeFileSync, readFileSync, readdirSync} = require('fs');
const rimraf = require('rimraf');
const {beautify} = require('flowgen');
const cpx = require('cpx');

const PATH_ROOT = join(__dirname, '..', '..');
const PATH_DIST = join(PATH_ROOT, 'dist');
const PATH_TRANSFORMS = join(__dirname, 'transforms');
const PATH_EXTRA_TYPES = join(PATH_DIST, '__types__.js.flow');

const fixFlowDefinition = (flowFilename) => {
    let src = readFileSync(flowFilename, 'utf8');

    // fixes flow annotation to make flow lint rule happy
    if (!/\/\/ @flow/.test(src)) {
        src = '// @flow\n' + src.replace(/\s*\*\s*@flow/g, '');
    }

    // `declare export var PRIMARY: any; // "#0B2739"` => `declare export var PRIMARY: "#0B2739"`
    src = src.replace(/declare export var (\w+): any; \/\/ "([^"]+)"/g, 'declare export var $1: "$2";');

    // `declare export var PRIMARY: any; // 123` => `declare export var PRIMARY: 123;`
    src = src.replace(/declare export var (\w+): any; \/\/ (\d+)/g, 'declare export var $1: $2;');

    // `import React from "react";` => `import * as React from "react";`
    src = src.replace(/import React from "react";/g, 'import * as React from "react";');

    // `React.ReactNode` => `React.Node`
    src = src.replace(/React.(React)(Node|Element)/g, 'React.$2');

    // `React.RefObject` => `React.Ref`
    src = src.replace(/React.RefObject/g, 'React.Ref');

    // `React.FC` => `React.ComponentType`
    src = src.replace(/React.(FC|ComponentClass|FunctionComponent)/g, 'React.ComponentType');

    // `React.MouseEvent` => `React.SyntheticMouseEvent`
    src = src.replace(/React.(Mouse)Event/g, 'Synthetic$1Event');

    // This patch isn't really needed. Flow marks the import as an error but seems to correctly use imported type
    // `import { Locale }` => `import { type Locale}`
    const types = [
        'Locale',
        'Location',
        'RegionCode',
        'ScreenSizeContextType',
        'Skin',
        'Theme',
        'TrackingEvent',
    ];
    src = src.replace(new RegExp(`(import {.*?)(${types.join('|')})([\\s,].*?})`, 'gm'), '$1type $2$3');

    // `Omit<T, K>` => `Pick<T, Exclude<$Keys<T>, K>>`
    src = src.replace(/Omit<(\w+), ([^>]+)>/g, 'Pick<$1, Exclude<$$Keys<$1>, $2>>');

    // `Pick<P, Exclude<$Keys<P>, "foo">>` => `$Diff<P, {foo: *}>`
    // `Pick<P, Exclude<$Keys<P>, "foo" | "bar">` => `$Diff<P, {foo: *, bar: *}>`
    src = src.replace(/Pick<(\w+), Exclude<\$Keys<(\w+)>, "(\w+)">>/g, '$$Diff<$1, {"$3": *}>');
    src = src.replace(
        /Pick<(\w+), Exclude<\$Keys<(\w+)>, "(\w+)" \| "(\w+)">>/g,
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
            `yarn jscodeshift --transform=${transformPath} --extensions=flow --parser=flow --silent ${PATH_DIST}`,
            {stdio: 'inherit'}
        );
    });
};

const main = async () => {
    process.chdir(PATH_ROOT);

    rimraf.sync('flow-defs');

    if (process.argv.includes('--nobuild')) {
        rimraf.sync('dist/**/*.js.flow');
    } else {
        rimraf.sync('dist');

        // typescript build
        execSync('yarn build-ts', {
            stdio: 'inherit',
        });
    }

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

    cpx.copySync('./dist/**/*.js.flow', 'flow-defs');

    // check
    execSync('yarn flow', {
        stdio: 'inherit',
    });
};

main();
