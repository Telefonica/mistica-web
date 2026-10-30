/**
 * The build of @telefonica/mistica-icons runs from the root package, inside "yarn compile".
 * This guard makes that implicit order visible, so a wrong order cannot publish an empty package.
 */
const fs = require('fs');
const path = require('path');

const PACKAGE_ROOT = path.join(__dirname, '..', 'packages', 'mistica-icons');

const countIcons = (dir, extension) =>
    fs.readdirSync(dir).filter((name) => name.startsWith('icon-') && name.endsWith(extension)).length;

const sources = path.join(PACKAGE_ROOT, 'src', 'generated');
const dist = path.join(PACKAGE_ROOT, 'dist-es');

if (!fs.existsSync(dist)) {
    console.error(`\nCannot pack @telefonica/mistica-icons: ${dist} does not exist.`);
    console.error('Run "yarn build" in the root of the repository first.\n');
    process.exit(1);
}

const sourceCount = countIcons(sources, '.tsx');
const iconCount = countIcons(dist, '.js');

if (iconCount < sourceCount) {
    console.error(
        `\nCannot pack @telefonica/mistica-icons: ${dist} holds ${iconCount} icons, and the sources hold ${sourceCount}.`
    );
    console.error('Run "yarn build" in the root of the repository again.\n');
    process.exit(1);
}
