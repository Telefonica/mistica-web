#!/usr/bin/env node
/**
 * Generates registry/<ComponentName>.json for each exported component and registry/index.json.
 *
 * Sources:
 *   - src/index.tsx        → component names + source files
 *   - react-docgen-typescript → prop types
 *   - playroom/snippets.tsx → Playroom code snippet per component
 *
 * Output:
 *   - registry/<ComponentName>.json  (one per component)
 *   - registry/index.json            (compact list for list_components lookups)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC_INDEX = path.join(ROOT, 'src/index.tsx');
const SNIPPETS_FILE = path.join(ROOT, 'playroom/snippets.tsx');
const REGISTRY_DIR = path.join(ROOT, 'registry');

// ---------------------------------------------------------------------------
// 1. Parse src/index.tsx — collect component exports and their source files
// ---------------------------------------------------------------------------

function parseIndexExports() {
    const src = fs.readFileSync(SRC_INDEX, 'utf8');
    const exports = new Map(); // ComponentName → absolute path to source .tsx

    // Match: export {Foo, Bar} from './some-file'
    // Match: export {default as Baz} from './some-file'
    const namedExportRe = /^export\s*\{([^}]+)\}\s*from\s*'([^']+)'/gm;
    let m;

    while ((m = namedExportRe.exec(src)) !== null) {
        const names = m[1];
        const importPath = m[2];

        // Skip non-src imports (css, skin-contract, etc.)
        if (!importPath.startsWith('./') || importPath.endsWith('.css')) continue;

        const absPath = path.resolve(ROOT, 'src', importPath.replace(/^\.\//, '') + '.tsx');
        if (!fs.existsSync(absPath)) continue;

        names.split(',').forEach((raw) => {
            const part = raw.trim();
            // Handle: default as Foo
            const asMatch = part.match(/default\s+as\s+(\w+)/);
            if (asMatch) {
                const name = asMatch[1];
                if (isComponent(name)) exports.set(name, absPath);
                return;
            }
            // Handle: Foo or Foo as Bar
            const nameMatch = part.match(/(\w+)(?:\s+as\s+(\w+))?/);
            if (nameMatch) {
                const name = nameMatch[2] || nameMatch[1];
                // Skip @deprecated re-exports that include a comment on the same line
                const lineForName = findExportLine(src, name);
                if (lineForName && lineForName.includes('@deprecated')) return;
                if (isComponent(name)) exports.set(name, absPath);
            }
        });
    }

    return exports;
}

function findExportLine(src, name) {
    const lines = src.split('\n');
    return lines.find((l) => l.includes(name)) || '';
}

function isComponent(name) {
    if (!/^[A-Z]/.test(name)) return false;
    // Skip ALL_CAPS constants (skin names, etc.)
    if (/^[A-Z][A-Z0-9_]+$/.test(name)) return false;
    // Skip icons — ~2000 files following Icon{Name}{Regular|Filled|Light} and Icon{Num}G patterns
    if (/^Icon[A-Z0-9]/.test(name)) return false;
    // Skip known non-components
    const exclude = new Set([
        'ThemeContext',
        'TopDistanceContext',
        'OverscrollColorProvider',
        'Portal',
        'CardActionSpinner',
        'CardActionIconButton',
        'FocusTrap',
        'MaybeDismissable',
    ]);
    return !exclude.has(name);
}

// ---------------------------------------------------------------------------
// 2. Parse playroom/snippets.tsx — extract name → code snippet
// ---------------------------------------------------------------------------

function parseSnippets() {
    const src = fs.readFileSync(SNIPPETS_FILE, 'utf8');
    const snippets = new Map(); // name → code string

    // State machine: scan line by line, track current snippet name,
    // accumulate code when inside a template literal.
    let currentName = null;
    let inTemplateLiteral = false;
    let codeLines = [];

    // arrayMode = true when name came from ['Name', code] array format (no 'code:' prefix)
    let arrayMode = false;

    for (const line of src.split('\n')) {
        // --- Name detection (three formats) ---
        // Format A: name: 'Foo' or name: "Foo" (also handles inline {name: 'Foo', code: ...})
        const nameMatchA = line.match(/\bname\s*:\s*['"]([^'"]+)['"]/);
        // Format B: ['Foo', code] — inline array entry, code follows on same line
        const nameMatchB = !nameMatchA && line.match(/^\s*\[\s*['"]([A-Z][^'"]+)['"]\s*,/);
        // Format C: standalone 'Foo', line inside a multi-line [ ... ] array
        const nameMatchC = !nameMatchA && !nameMatchB && line.match(/^\s*'([A-Z][^']+)',\s*$/);

        if (nameMatchA || nameMatchB || nameMatchC) {
            const match = nameMatchA || nameMatchB || nameMatchC;
            currentName = match[1];
            inTemplateLiteral = false;
            codeLines = [];
            arrayMode = !!(nameMatchB || nameMatchC);
        }

        if (currentName && !snippets.has(currentName)) {
            if (!inTemplateLiteral) {
                if (arrayMode) {
                    // Format B inline: ['Foo', '<code />'] or ['Foo', `<code />`]
                    const inlineStr = line.match(/^\s*\[[^\]]*,\s*'([^']*)'\s*\]/);
                    const inlineTick = line.match(/^\s*\[[^\]]*,\s*`([^`]*)`\s*\]/);
                    if (inlineStr) {
                        snippets.set(currentName, inlineStr[1].trim());
                        currentName = null;
                        arrayMode = false;
                        continue;
                    }
                    if (inlineTick) {
                        snippets.set(currentName, inlineTick[1].trim());
                        currentName = null;
                        arrayMode = false;
                        continue;
                    }
                    // Format C or multi-line B: watch for next bare string or backtick start
                    const bareStr = line.match(/^\s*'([^']+)'\s*,?\s*$/);
                    if (bareStr && bareStr[1] !== currentName) {
                        snippets.set(currentName, bareStr[1].trim());
                        currentName = null;
                        arrayMode = false;
                        continue;
                    }
                    if (line.trim().startsWith('`')) {
                        inTemplateLiteral = true;
                        const afterBacktick = line.replace(/^\s*`/, '');
                        codeLines = [afterBacktick];
                    }
                } else {
                    // Format A object: code: `...` on one line
                    const oneLineBacktick = line.match(/code\s*:\s*`([^`]*)`/);
                    if (oneLineBacktick) {
                        snippets.set(currentName, oneLineBacktick[1].trim());
                        currentName = null;
                        continue;
                    }
                    // Format A object: code: '...' single quoted on one line
                    const oneLineSingle = line.match(/code\s*:\s*'([^']*)'/);
                    if (oneLineSingle) {
                        snippets.set(currentName, oneLineSingle[1].trim());
                        currentName = null;
                        continue;
                    }
                    // Format A object: start of multi-line template literal: code: `
                    if (/code\s*:\s*`/.test(line)) {
                        inTemplateLiteral = true;
                        const afterBacktick = line.replace(/.*code\s*:\s*`/, '');
                        codeLines = [afterBacktick];
                    }
                }
            } else {
                // Inside template literal — look for closing backtick
                if (line.includes('`')) {
                    const before = line.substring(0, line.indexOf('`'));
                    codeLines.push(before);
                    snippets.set(currentName, codeLines.join('\n').trim());
                    inTemplateLiteral = false;
                    currentName = null;
                    arrayMode = false;
                    codeLines = [];
                } else {
                    codeLines.push(line);
                }
            }
        }
    }

    return snippets;
}

// ---------------------------------------------------------------------------
// 3. Extract props via react-docgen-typescript
// ---------------------------------------------------------------------------

let parser;
function getParser() {
    if (!parser) {
        const rdt = require('react-docgen-typescript');
        parser = rdt.withCustomConfig(path.join(ROOT, 'tsconfig.json'), {
            shouldExtractLiteralValuesFromEnum: true,
            shouldRemoveUndefinedFromOptional: true,
            savePropValueAsString: true,
            propFilter: (prop) => {
                // Filter out HTML/aria props that pollute the output
                if (prop.parent) {
                    const from = prop.parent.fileName || '';
                    if (from.includes('node_modules')) return false;
                }
                return !['className', 'style', 'id', 'fake'].includes(prop.name);
            },
        });
    }
    return parser;
}

function parsePropsForFile(filePath) {
    try {
        const results = getParser().parse(filePath);
        const map = new Map(); // displayName → {description, props[]}
        for (const result of results) {
            const name = result.displayName;
            if (!isComponent(name)) continue;
            const props = Object.entries(result.props)
                .map(([propName, info]) => ({
                    name: propName,
                    type: info.type?.name ?? 'unknown',
                    required: info.required,
                    default: info.defaultValue?.value ?? undefined,
                    description: info.description || undefined,
                }))
                .filter((p) => p.type !== 'unknown' || p.description);
            map.set(name, {description: result.description || '', props});
        }
        return map;
    } catch {
        return new Map();
    }
}

// ---------------------------------------------------------------------------
// 4. Build + write registry files
// ---------------------------------------------------------------------------

function buildRegistry() {
    console.log('Parsing src/index.tsx exports…');
    const exportMap = parseIndexExports();
    console.log(`Found ${exportMap.size} component exports.`);

    console.log('Parsing playroom/snippets.tsx…');
    const snippets = parseSnippets();
    console.log(`Found ${snippets.size} snippets.`);

    // Group components by source file to avoid parsing the same file repeatedly
    const byFile = new Map(); // filePath → [componentName, ...]
    for (const [name, filePath] of exportMap) {
        if (!byFile.has(filePath)) byFile.set(filePath, []);
        byFile.get(filePath).push(name);
    }

    // Ensure output directory exists
    fs.mkdirSync(REGISTRY_DIR, {recursive: true});

    const index = []; // entries for index.json
    let written = 0;

    for (const [filePath, names] of byFile) {
        const propsMap = parsePropsForFile(filePath);

        for (const name of names) {
            const docInfo = propsMap.get(name) ?? {description: '', props: []};
            // Exact match first; then snippet whose name starts with component name (e.g. 'Avatar with...');
            // then component name starts with snippet name (e.g. AccordionItem → 'Accordion').
            const snippet =
                snippets.get(name) ??
                [...snippets.entries()].find(([k]) => k.startsWith(name))?.[1] ??
                [...snippets.entries()].find(([k]) => name.startsWith(k))?.[1] ??
                null;

            const entry = {
                name,
                import: `import {${name}} from '@telefonica/mistica'`,
                description: docInfo.description,
                props: docInfo.props,
                playroomSnippet: snippet,
            };

            fs.writeFileSync(path.join(REGISTRY_DIR, `${name}.json`), JSON.stringify(entry, null, 2) + '\n');
            written++;

            index.push({name, description: docInfo.description || ''});
        }
    }

    // Sort index alphabetically
    index.sort((a, b) => a.name.localeCompare(b.name));
    fs.writeFileSync(path.join(REGISTRY_DIR, 'index.json'), JSON.stringify(index, null, 2) + '\n');

    console.log(`Done. Wrote ${written} component files + index.json → registry/`);
}

buildRegistry();
