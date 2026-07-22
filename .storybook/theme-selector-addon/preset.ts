import {join} from 'path';

export const managerEntries = (entry: Array<string> = []): Array<string> => {
    return [...entry, join(import.meta.dirname, './manager.tsx')];
};
