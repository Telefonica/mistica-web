/**
 * In mistica 8.0.0 we renamed all the <Text> components. This codemod helps you upgrade your codebase if you
 * were using Text components from previous mistica versions.
 *
 * To apply this codemod you need to install jscodeshift: https://github.com/facebook/jscodeshift
 *
 * Then just run:
 *
 * jscodeshift -t texts-codemod.js <your codebase dir>
 *
 * Note that you may need to change the parser if you dont use tsx. See available parser options here:
 * https://github.com/facebook/jscodeshift#parser
 */

export default function transformer(file, api) {
    const j = api.jscodeshift;

    const renameMap = {
        Text8: 'Text1',
        Text7: 'Text2',
        Text6: 'Text3',
        Text5: 'Text4',
        Text4: 'Text5',
        Text3: 'Text6',
        Text2: 'Text7',
        Text1: 'Text8',
    };

    const parsedSource = j(file.source);
    Object.entries(renameMap).forEach(([oldName, newName]) => {
        parsedSource.find(j.JSXIdentifier, {name: oldName}).forEach((path) => {
            path.node.name = newName + 'New';
        });
        parsedSource.find(j.ImportSpecifier, {imported: {name: oldName}}).forEach((path) => {
            path.node.imported.name = newName + 'New';
        });
    });
    Object.entries(renameMap).forEach(([, newName]) => {
        parsedSource.find(j.JSXIdentifier, {name: newName + 'New'}).forEach((path) => {
            path.node.name = newName;
        });
        parsedSource.find(j.ImportSpecifier, {imported: {name: newName + 'New'}}).forEach((path) => {
            path.node.imported.name = newName;
        });
    });
    return parsedSource.toSource();
}

export const parser = 'tsx';
