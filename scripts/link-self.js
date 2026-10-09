/**
 * Creates node_modules/@telefonica/mistica as a link to the root of the repository.
 *
 * The root package is the published library, and Yarn does not link a workspace to itself. Without
 * this link, nothing inside the repository can reach the package by its own name. That matters since
 * issue https://github.com/Telefonica/mistica-web/issues/1643, because the built icons of
 * @telefonica/mistica-icons import @telefonica/mistica, and Node resolves that name in node_modules.
 *
 * The global setup of the SSR tests needs the link, because it renders the pages of the build with
 * plain Node requires, where no alias applies. Storybook, Playroom, Jest, tsconfig and the size
 * stats app of scripts/size-stats keep their own aliases, so they reach the package without it.
 *
 * The "test-ssr" script calls this file first. The "prepare" script also calls it, but Yarn 3 runs
 * "postinstall" only, so an install alone does not create the link.
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

// lstat, and not existsSync, because a broken link exists for unlink and not for existsSync
const currentStats = fs.lstatSync(LINK_PATH, {throwIfNoEntry: false});
const currentTarget = currentStats?.isSymbolicLink() ? fs.readlinkSync(LINK_PATH) : null;

if (currentTarget === LINK_TARGET) {
    process.exit(0);
}

if (currentStats?.isSymbolicLink()) {
    fs.unlinkSync(LINK_PATH);
}

fs.symlinkSync(LINK_TARGET, LINK_PATH, 'dir');
console.log(`Linked ${LINK_PATH} to the root of the repository`);
