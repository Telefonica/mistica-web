import {test} from '../test-utils/playwright';
import {openSSRPage} from '../test-utils';

import type {Device} from '../test-utils';

for (const testCase of ['TABLET', 'MOBILE_IOS'] as Array<Device>) {
    const device = testCase;
    test(`ssr form on tablet ${testCase}`, async () => {
        await openSSRPage({name: 'form', device});
    });
}
