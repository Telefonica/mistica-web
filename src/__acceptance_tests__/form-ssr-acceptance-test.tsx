import {openSSRPage} from '../test-utils';

import type {Device} from '../test-utils';

test.each(['TABLET', 'MOBILE_IOS'] as Array<Device>)('ssr button on tablet %s', async (device) => {
    await openSSRPage({name: 'form', device});
});
