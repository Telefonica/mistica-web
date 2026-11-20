import {test as base, expect} from '@playwright/test';

import type {ConsoleMessage} from '@playwright/test';

export const test = base.extend<{applicationErrors: void}>({
    applicationErrors: [
        async ({page}, use) => {
            const errors: Array<string> = [];
            const onError = (error: Error) => errors.push(error.stack ?? error.message);
            const onConsole = (message: ConsoleMessage) => {
                if (['error', 'warning'].includes(message.type()) && message.args().length > 0) {
                    errors.push(message.text());
                }
            };
            page.on('pageerror', onError);
            page.on('console', onConsole);
            await use();
            page.off('pageerror', onError);
            page.off('console', onConsole);
            expect(errors, 'Component tests must not log warnings or errors').toEqual([]);
        },
        {auto: true},
    ],
});

export {expect};
