#!/usr/bin/env node
/**
 * Scores an AI output directory against the mistica-web quality rubric.
 * Usage: node scripts/score-ai-output.js ai-test/results/baseline
 */

const fs = require('fs');
const path = require('path');

const dir = process.argv[2];
if (!dir) {
    console.error('Usage: node scripts/score-ai-output.js <results-dir>');
    process.exit(1);
}

function read(file) {
    const p = path.join(dir, file);
    return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
}

const out01 = read('01.txt');
const out02 = read('02.txt');
const out03 = read('03.txt');
const out04 = read('04.txt');

// Extract code blocks tagged with a filename or language from an output string.
// Returns all code block contents joined.
function codeBlocks(text, filter) {
    const blocks = [];
    const re = /```[\w.\-/]*\n([\s\S]*?)```/g;
    let m;
    while ((m = re.exec(text)) !== null) {
        blocks.push(m[1]);
    }
    if (filter) {
        // Find blocks preceded by a filename hint in the surrounding text
        const filtered = [];
        const blockRe = /```[\w.\-/]*\n([\s\S]*?)```/g;
        let bm;
        // Reset
        blockRe.lastIndex = 0;
        while ((bm = blockRe.exec(text)) !== null) {
            const preceding = text.slice(Math.max(0, bm.index - 300), bm.index);
            if (filter(preceding, bm[1])) {
                filtered.push(bm[1]);
            }
        }
        return filtered.join('\n');
    }
    return blocks.join('\n');
}

function all(text) {
    return codeBlocks(text);
}

// Helpers
function has(text, pattern) {
    return typeof pattern === 'string' ? text.includes(pattern) : pattern.test(text);
}

function hasNot(text, pattern) {
    return !has(text, pattern);
}

// Block extractors by heuristic: look for filename mention near the block
function tsxBlock(text) {
    return codeBlocks(text, (pre, _) => /ribbon\.tsx|component\.tsx|\.tsx/.test(pre) && !/css\.ts/.test(pre));
}

function cssBlock(text) {
    return codeBlocks(text, (pre, _) => /\.css\.ts/.test(pre));
}

function storyBlock(text) {
    return codeBlocks(text, (pre, _) => /story/.test(pre));
}

function testBlock(text) {
    return codeBlocks(text, (pre, _) => /test/.test(pre));
}

function playroomBlock(text) {
    return codeBlocks(text, (pre, _) => /playroom|snippet/.test(pre));
}

// ─── Rules ───────────────────────────────────────────────────────────────────

const rules = [
    // Prompt 01
    {
        id: 'R01',
        prompt: '01',
        label: "'use client' directive in tsx",
        check: () => has(all(out01), "'use client'"),
    },
    {
        id: 'R02',
        prompt: '01',
        label: 'React hooks namespaced (no bare useState/useEffect/useRef)',
        check: () => {
            const code = all(out01);
            // Allow React.useState but not bare useState(
            return !/(?<!React\.)(useState|useEffect|useRef)\s*\(/.test(code);
        },
    },
    {
        id: 'R03',
        prompt: '01',
        label: "No '@vanilla-extract/css' in tsx block",
        check: () => hasNot(tsxBlock(out01) || all(out01), "from '@vanilla-extract/css'"),
    },
    {
        id: 'R04',
        prompt: '01',
        label: 'No sprinkles.css import in tsx block',
        check: () => hasNot(tsxBlock(out01) || all(out01), 'sprinkles.css'),
    },
    {
        id: 'R05',
        prompt: '01',
        label: 'No hardcoded colors in tsx/css blocks',
        check: () => {
            const code = tsxBlock(out01) + cssBlock(out01);
            return !/#[0-9a-fA-F]{3,6}\b/.test(code) && !/rgb\(/.test(code);
        },
    },
    {
        id: 'R06',
        prompt: '01',
        label: 'Story uses StoryComponent<Args>',
        check: () => has(storyBlock(out01) || all(out01), 'StoryComponent<Args>'),
    },
    {
        id: 'R07',
        prompt: '01',
        label: 'Story sets .storyName',
        check: () => has(storyBlock(out01) || all(out01), '.storyName ='),
    },
    {
        id: 'R08',
        prompt: '01',
        label: 'Story sets .args',
        check: () => has(storyBlock(out01) || all(out01), '.args ='),
    },
    {
        id: 'R09',
        prompt: '01',
        label: 'Test uses ThemeContextProvider + makeTheme',
        check: () => {
            const code = testBlock(out01) || all(out01);
            return has(code, 'ThemeContextProvider') && has(code, 'makeTheme');
        },
    },
    {
        id: 'R10',
        prompt: '01',
        label: 'Test uses semantic queries (getByRole/getByLabelText)',
        check: () => has(testBlock(out01) || all(out01), /getByRole|getByLabelText/),
    },
    {
        id: 'R11',
        prompt: '01',
        label: 'Component exported from src/index.tsx',
        check: () => has(all(out01), /Ribbon|export.*Ribbon/),
    },
    {
        id: 'R12',
        prompt: '01',
        label: 'All 4 file types produced (tsx + css.ts + story + test)',
        check: () => {
            const blocks = (out01.match(/```[\s\S]*?```/g) || []).length;
            return (
                /ribbon\.tsx/.test(out01) &&
                /ribbon\.css\.ts/.test(out01) &&
                /ribbon-story|story/.test(out01) &&
                /ribbon-test|test/.test(out01) &&
                blocks >= 4
            );
        },
    },

    // Prompt 02
    {
        id: 'R13',
        prompt: '02',
        label: 'Story argTypes updated with outlined prop',
        check: () => has(storyBlock(out02) || all(out02), 'outlined'),
    },
    {
        id: 'R14',
        prompt: '02',
        label: 'Story args updated with outlined prop',
        check: () => {
            const code = storyBlock(out02) || all(out02);
            return /outlined/.test(code) && /args/.test(code);
        },
    },
    {
        id: 'R15',
        prompt: '02',
        label: 'Playroom snippet updated with outlined',
        check: () => has(playroomBlock(out02) || all(out02), 'outlined'),
    },

    // Prompt 03
    {
        id: 'R16',
        prompt: '03',
        label: 'No hardcoded color values',
        check: () => {
            const code = all(out03);
            return !/#[0-9a-fA-F]{3,6}\b/.test(code) && !/rgb\(/.test(code);
        },
    },
    {
        id: 'R17',
        prompt: '03',
        label: 'Uses skinVars for token access',
        check: () => has(all(out03), 'skinVars'),
    },
    {
        id: 'R18',
        prompt: '03',
        label: 'Layout via Mistica primitives (Stack/Box/Inline/ResponsiveLayout)',
        check: () => has(all(out03), /Stack|Box|Inline|ResponsiveLayout/),
    },
    {
        id: 'R19',
        prompt: '03',
        label: 'Text via Mistica text components (Text1-10/Title1-4)',
        check: () => has(all(out03), /Text[1-9]|Text10|Title[1-4]/),
    },
    {
        id: 'R20',
        prompt: '03',
        label: 'ThemeContextProvider present',
        check: () => has(all(out03), 'ThemeContextProvider'),
    },

    // Prompt 04 — Complex Screen / Netflix Front Page
    {
        id: 'R21',
        prompt: '04',
        label: "'use client' directive present",
        check: () => has(all(out04), "'use client'"),
    },
    {
        id: 'R22',
        prompt: '04',
        label: 'React hooks namespaced (no bare useState/useEffect/useRef)',
        check: () => !/(?<!React\.)(useState|useEffect|useRef)\s*\(/.test(all(out04)),
    },
    {
        id: 'R23',
        prompt: '04',
        label: 'Uses MainNavigationBar for top navigation',
        check: () => has(all(out04), 'MainNavigationBar'),
    },
    {
        id: 'R24',
        prompt: '04',
        label: 'Uses CoverHero, Hero, or Slideshow for featured banner',
        check: () => has(all(out04), /CoverHero|<Hero[\s>]|<Slideshow[\s>]/),
    },
    {
        id: 'R25',
        prompt: '04',
        label: 'Uses Carousel for horizontal content rows',
        check: () => has(all(out04), 'Carousel'),
    },
    {
        id: 'R26',
        prompt: '04',
        label: 'Uses CoverCard or MediaCard for content tiles',
        check: () => has(all(out04), /CoverCard|MediaCard/),
    },
    {
        id: 'R27',
        prompt: '04',
        label: 'No hardcoded colors (no hex, no rgb)',
        check: () => {
            const code = all(out04);
            return !/#[0-9a-fA-F]{3,6}\b/.test(code) && !/rgb\(/.test(code);
        },
    },
    {
        id: 'R28',
        prompt: '04',
        label: 'Uses skinVars for color tokens',
        check: () => has(all(out04), 'skinVars'),
    },
    {
        id: 'R29',
        prompt: '04',
        label: 'Uses Mistica text components (Text1-10 / Title1-4)',
        check: () => has(all(out04), /Text[1-9]|Text10|Title[1-4]/),
    },
    {
        id: 'R30',
        prompt: '04',
        label: 'ThemeContextProvider wraps the component',
        check: () => has(all(out04), 'ThemeContextProvider'),
    },
];

// ─── Run & report ─────────────────────────────────────────────────────────────

const results = rules.map((r) => {
    let pass = false;
    try {
        pass = r.check();
    } catch (_) {
        pass = false;
    }
    return {...r, pass};
});

const total = results.length;
const passed = results.filter((r) => r.pass).length;

console.log('\n╔══════════════════════════════════════════════════════════════╗');
console.log(
    `║  Mistica AI Quality Score: ${passed}/${total} (${Math.round((passed / total) * 100)}%)`.padEnd(63) +
        '║'
);
console.log('╚══════════════════════════════════════════════════════════════╝\n');

const prompts = ['01', '02', '03', '04'];
const labels = {
    '01': 'Prompt 01 — New Component',
    '02': 'Prompt 02 — Add Prop',
    '03': 'Prompt 03 — Consumer Screen',
    '04': 'Prompt 04 — Netflix Front Page',
};

for (const p of prompts) {
    const group = results.filter((r) => r.prompt === p);
    const gPassed = group.filter((r) => r.pass).length;
    console.log(`  ${labels[p]}: ${gPassed}/${group.length}`);
    for (const r of group) {
        const icon = r.pass ? '✓' : '✗';
        console.log(`    ${icon} [${r.id}] ${r.label}`);
    }
    console.log('');
}

// Write machine-readable JSON alongside
const jsonPath = path.join(dir, 'score.json');
fs.writeFileSync(
    jsonPath,
    JSON.stringify(
        {
            score: `${passed}/${total}`,
            percent: Math.round((passed / total) * 100),
            rules: results.map(({id, prompt, label, pass}) => ({id, prompt, label, pass})),
        },
        null,
        2
    )
);
console.log(`JSON saved → ${jsonPath}\n`);
