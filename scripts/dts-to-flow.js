const {join} = require('path');
const {promisify} = require('util');
const glob = promisify(require('glob'));
const {readFileSync, writeFileSync} = require('fs');

const PATH_ROOT = join(__dirname, '..');
const PATH_DIST = join(PATH_ROOT, 'dist');

const convertToFlow = (dtsFilename) => {
    console.log('read:', dtsFilename);
    const flowFilename = dtsFilename.replace(/\.d\.ts$/, '.js.flow');
    const dtsSource = readFileSync(dtsFilename, 'utf-8');
    let flowSource = dtsSource;

    flowSource = '// @flow\n' + flowSource;
    flowSource = flowSource
        .replace(/\bundefined\b/gm, 'void')
        .replace(/\bReact\.ReactNode\b/gm, 'React.Node')
        .replace(/\bReact\.ReactElement\b/gm, 'React.Element')
        // export const isIos: () => boolean;
        .replace(
            /\bexport declare const (\w+): \((.*?)\) => ([^;]+);/gm,
            'declare export function $1($2): $3;'
        );

    console.log('write:', flowFilename);
    writeFileSync(flowFilename, flowSource);
};

const main = async () => {
    const dtsFilenames = await glob(join(PATH_DIST, '**/*.d.ts'));
    dtsFilenames.forEach(convertToFlow);
};

main();
