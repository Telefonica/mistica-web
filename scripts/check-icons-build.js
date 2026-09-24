/**
 * The build of @telefonica/mistica-icons runs from the root package, inside "yarn compile".
 * This guard makes that implicit order visible, so a wrong order cannot publish an empty package.
 */
const fs = require('fs');
const path = require('path');

const PACKAGE_ROOT = path.join(__dirname, '..', 'packages', 'mistica-icons');
const MIN_ICON_COUNT = 2000;

const countIcons = (dir) =>
    fs.readdirSync(dir).filter((name) => name.startsWith('icon-') && name.endsWith('.js')).length;

const dist = path.join(PACKAGE_ROOT, 'dist-es');

if (!fs.existsSync(dist)) {
    console.error(`\nCannot pack @telefonica/mistica-icons: ${dist} does not exist.`);
    console.error('Run "yarn build" in the root of the repository first.\n');
    process.exit(1);
}

const iconCount = countIcons(dist);

if (iconCount < MIN_ICON_COUNT) {
    console.error(
        `\nCannot pack @telefonica/mistica-icons: ${dist} holds ${iconCount} icons, and the minimum is ${MIN_ICON_COUNT}.`
    );
    console.error('Run "yarn build" in the root of the repository again.\n');
    process.exit(1);
}
