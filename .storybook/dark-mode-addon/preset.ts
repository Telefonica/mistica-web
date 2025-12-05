import {join, dirname} from 'path';
import {fileURLToPath} from 'url';

// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(fileURLToPath(import.meta.url));

export const managerEntries = (entry: Array<string> = []): Array<string> => {
    return [...entry, join(__dirname, './manager.tsx')];
};
