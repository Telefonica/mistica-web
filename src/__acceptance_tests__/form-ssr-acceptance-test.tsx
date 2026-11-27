import {test} from '../test-utils/playwright';
import {openSSRPage} from '../test-utils';

for (const device of ['TABLET', 'MOBILE_IOS'] as const) {
    test(`ssr form on tablet ${device}`, async () => {
        await openSSRPage({name: 'form', device});
    });
}
