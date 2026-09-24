/**
 * Creates node_modules/@telefonica/mistica as a link to the root of the repository.
 *
 * The root package is the published library, and Yarn does not link a workspace to itself. Without
 * this link, nothing inside the repository can reach the package by its own name. That matters since
 * issue 1643, because the built icons of @telefonica/mistica-icons import
 * @telefonica/mistica/icon-runtime, and Node resolves that name in node_modules:
 *
 * - the global setup of the SSR tests renders the pages with plain Node requires;
 * - the size stats app of scripts/size-stats builds the library as a consumer would.
 *
 * Storybook, Playroom, Jest and tsconfig keep their own aliases, because they must read the
 * TypeScript sources instead of the build.
 *
 * The "prepare" script calls this file, so the link comes back after every yarn install.
 */
const fs = require('fs');
const path = require('path');

const SCOPE_DIR = path.join(__dirname, '..', 'node_modules', '@telefonica');
const LINK_PATH = path.join(SCOPE_DIR, 'mistica');
// relative to the parent directory of the link: node_modules/@telefonica/../.. is the repository
const LINK_TARGET = '../..';

if (!fs.existsSync(SCOPE_DIR)) {
    fs.mkdirSync(SCOPE_DIR, {recursive: true});
}

const currentTarget = fs.existsSync(LINK_PATH) ? fs.readlinkSync(LINK_PATH) : null;

if (currentTarget === LINK_TARGET) {
    process.exit(0);
}

if (currentTarget !== null) {
    fs.unlinkSync(LINK_PATH);
}

fs.symlinkSync(LINK_TARGET, LINK_PATH, 'dir');
console.log(`Linked ${LINK_PATH} to the root of the repository`);
