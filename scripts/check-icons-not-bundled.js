/**
 * Guard for issue 1643.
 *
 * The icons left this package because a Module Federation "shared" module keeps every export, so a
 * barrel of 2225 icons reached the bundle of the host. One import of the icons barrel inside
 * src/index.tsx would silently bring back about 16 MB, and nothing else would fail.
 */
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..');
const DIST_ES = path.join(REPO_ROOT, 'dist-es');
const GENERATED = path.join(DIST_ES, 'generated');
// the package weighs about 2.2 MB after the split, and it weighed 18.4 MB before it
const MAX_SIZE_MB = 5;

const directorySize = (dir) =>
    fs.readdirSync(dir, {withFileTypes: true}).reduce((total, entry) => {
        const entryPath = path.join(dir, entry.name);
        return total + (entry.isDirectory() ? directorySize(entryPath) : fs.statSync(entryPath).size);
    }, 0);

const fail = (message) => {
    console.error(`\n${message}\n`);
    console.error('The icons belong to @telefonica/mistica-icons. Import each one by its own path,');
    console.error('and never re-export the icons barrel from src/index.tsx.\n');
    process.exit(1);
};

if (fs.existsSync(GENERATED)) {
    fail(`${GENERATED} exists, so generated icons reached the build of this package.`);
}

const sizeMb = directorySize(DIST_ES) / 1048576;

if (sizeMb > MAX_SIZE_MB) {
    fail(`dist-es weighs ${sizeMb.toFixed(2)} MB, and the limit is ${MAX_SIZE_MB} MB.`);
}

console.log(`dist-es weighs ${sizeMb.toFixed(2)} MB, under the ${MAX_SIZE_MB} MB limit.`);
