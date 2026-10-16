import assert from 'node:assert/strict';
import {test} from 'node:test';
import {execFileSync} from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import {buildRadius} from './css-generator.ts';

import type {RadiusDescription} from './token-types.ts';

for (const [value, expected] of [
    ['0', '0px'],
    ['16', '16px'],
    ['2.5', '2.5px'],
    ['.5', '.5px'],
    ['24px', '24px'],
    ['50%', '50%'],
    ['circle', '50%'],
]) {
    test(`preserves uniform radius ${value}`, () => {
        assert.equal(buildRadius({value}), expected);
    });
}

const corners = {
    bottomLeft: {value: '16', type: 'borderRadius'},
    topRight: {value: '8px', type: 'borderRadius'},
    topLeft: {value: '4', type: 'borderRadius'},
    bottomRight: {value: '50%', type: 'borderRadius'},
} as const;

test('exports corners in CSS order regardless of their order in the input', () => {
    assert.equal(buildRadius(corners), '4px 8px 50% 16px');
});

for (const value of ['', 'invalid', '4rem', '-4', '4px extra', '4 8', 'NaN', 4, null]) {
    test(`rejects invalid radius value ${JSON.stringify(value)}`, () => {
        assert.throws(() => buildRadius({value} as RadiusDescription), /Unknown radius format/);
        assert.throws(
            () => buildRadius({...corners, topLeft: {value}} as RadiusDescription),
            /Invalid radius corner topLeft/
        );
    });
}

for (const [corner, expected] of [
    ['topLeft', '0px 8px 50% 16px'],
    ['topRight', '4px 0px 50% 16px'],
    ['bottomRight', '4px 8px 0px 16px'],
    ['bottomLeft', '4px 8px 50% 0px'],
] as const) {
    test(`defaults omitted ${corner} to zero`, () => {
        const incomplete: Partial<typeof corners> = {...corners};
        delete incomplete[corner];
        assert.equal(buildRadius(incomplete), expected);
    });
}

test('supports a subset of corners', () => {
    assert.equal(buildRadius({topLeft: {value: '4'}, bottomRight: {value: '24'}}), '4px 0px 24px 0px');
    assert.equal(buildRadius({bottomLeft: {value: '16'}}), '0px 0px 0px 16px');
});

test('rejects definitions without a uniform value or recognized corners', () => {
    assert.throws(() => buildRadius({}), /Expected at least one radius corner/);
    assert.throws(
        () => buildRadius({topLef: {value: '4'}} as RadiusDescription),
        /Expected at least one radius corner/
    );
});

test('rejects explicitly invalid corners instead of defaulting them to zero', () => {
    for (const topLeft of [undefined, null, {}]) {
        assert.throws(() => buildRadius({topLeft} as RadiusDescription), /Invalid radius corner topLeft/);
    }
});

test('rejects mixed uniform and per-corner definitions', () => {
    assert.throws(() => buildRadius({...corners, value: '4'}), /cannot mix/);
});

test('generates TypeScript and CSS for uniform and per-corner tokens in both skin families', (context) => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'mistica-radius-'));
    context.after(() => fs.rmSync(root, {recursive: true, force: true}));
    const packageFolder = path.join(root, 'packages/generate-design-tokens');
    fs.mkdirSync(packageFolder, {recursive: true});
    for (const file of ['index.ts', 'css-generator.ts', 'token-types.ts', 'package.json']) {
        fs.copyFileSync(path.join(import.meta.dirname, file), path.join(packageFolder, file));
    }
    fs.symlinkSync(path.resolve(import.meta.dirname, '../../node_modules'), path.join(root, 'node_modules'));
    fs.mkdirSync(path.join(root, 'src/skins/types'), {recursive: true});
    const tokensFolder = path.join(root, 'tokens');
    fs.mkdirSync(path.join(tokensFolder, 'community'), {recursive: true});
    const tokens = {
        global: {palette: {}},
        light: {},
        dark: {},
        text: {},
        themeVariant: {successFeedback: {value: 'brand'}},
        spacing: {responsiveLayoutMargin: {value: {mobile: 16, desktop: 24}}},
        radius: {
            container: {value: '16'},
            bubble: corners,
            partialBubble: {topLeft: {value: '4'}, bottomRight: {value: '24'}},
        },
    };
    for (const skin of ['movistar', 'community/cyber']) {
        fs.writeFileSync(path.join(tokensFolder, `${skin}.json`), JSON.stringify(tokens));
    }
    execFileSync(process.execPath, [path.join(packageFolder, 'index.ts'), tokensFolder], {stdio: 'pipe'});
    for (const file of ['src/skins/movistar.tsx', 'src/community/skins/cyber-skin.tsx']) {
        const source = fs.readFileSync(path.join(root, file), 'utf8');
        assert.match(source, /container: '16px'/);
        assert.match(source, /bubble: '4px 8px 50% 16px'/);
        assert.match(source, /partialBubble: '4px 0px 24px 0px'/);
    }
    for (const file of ['css/movistar.css', 'css/community/cyber.css']) {
        const source = fs.readFileSync(path.join(root, file), 'utf8');
        assert.match(source, /--mistica-border-radius-container: 16px;/);
        assert.match(source, /--mistica-border-radius-bubble: 4px 8px 50% 16px;/);
        assert.match(source, /--mistica-border-radius-partialBubble: 4px 0px 24px 0px;/);
    }
});
