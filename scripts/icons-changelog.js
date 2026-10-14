/**
 * This is a semantic release plugin that writes the changelog of @telefonica/mistica-icons.
 *
 * Both packages share one version and one release, so the root CHANGELOG.md describes every change.
 * A reader of the icons package does not need the component entries, so this plugin keeps the icon
 * commits only. A release with no icon commit writes nothing, and the README of the package explains
 * that a version with no entry carries no icon change.
 *
 * @semantic-release/changelog cannot do this: it writes the shared nextRelease.notes, so a second
 * instance would only duplicate the root file.
 */
const fs = require('fs').promises;
const path = require('path');
const {execSync} = require('child_process');
const {generateNotes} = require('@semantic-release/release-notes-generator');

const CHANGELOG_PATH = path.join(__dirname, '..', 'packages', 'mistica-icons', 'CHANGELOG.md');
const PACKAGE_PATH = 'packages/mistica-icons/';

/**
 * A commit of the semantic release context carries no file list, so git answers instead.
 */
const touchesIconsPackage = (hash, cwd) => {
    const changedFiles = execSync(`git diff-tree --no-commit-id --name-only -r ${hash}`, {
        cwd,
        encoding: 'utf8',
    });
    return changedFiles.split('\n').some((file) => file.startsWith(PACKAGE_PATH));
};

const readChangelog = async () => {
    try {
        return (await fs.readFile(CHANGELOG_PATH, 'utf8')).trim();
    } catch (error) {
        if (error.code === 'ENOENT') {
            return '';
        }
        throw error;
    }
};

const prepare = async (pluginConfig, context) => {
    const {commits, cwd, logger} = context;

    const iconCommits = commits.filter((commit) => touchesIconsPackage(commit.hash, cwd));

    if (iconCommits.length === 0) {
        logger.log('No commit touched %s, so its changelog stays unchanged', PACKAGE_PATH);
        return;
    }

    logger.log('Found %d icon commits for %s', iconCommits.length, CHANGELOG_PATH);

    const notes = await generateNotes({preset: 'angular'}, {...context, commits: iconCommits});
    const currentContent = await readChangelog();

    await fs.writeFile(
        CHANGELOG_PATH,
        `${notes.trim()}\n${currentContent ? `\n${currentContent}\n` : ''}`,
        'utf8'
    );
};

module.exports = {prepare};
